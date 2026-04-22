export interface IaSearchResult {
  id: string;
  title: string;
  link: string;
  googleLink: string;
  snippet: string;
  source: string;
  position: number;
}

function normalizeDomains(value: string) {
  return value
    .split(",")
    .map((part) => part.trim().toLowerCase())
    .filter(Boolean)
    .map((domain) => domain.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, ""));
}

function buildGoogleQuery(keywords: string, domains: string[]) {
  if (domains.length === 0) {
    return keywords;
  }

  const scope = domains.map((domain) => `site:${domain}`).join(" OR ");
  return `${keywords} (${scope})`;
}

function sourceFromLink(link: string) {
  try {
    const url = new URL(link);
    return url.hostname.replace(/^www\./, "");
  } catch {
    return "unknown";
  }
}

function buildGoogleSearchLink(value: string) {
  return `https://www.google.com/search?q=${encodeURIComponent(value)}`;
}

function buildFallbackResults(keywords: string, domains: string[]): IaSearchResult[] {
  const searchScopes = domains.length > 0 ? domains : ["inmueble24.com", "easybroker.com"];

  return searchScopes.map((domain, index) => {
    const scopedQuery = `${keywords} site:${domain}`;
    const link = buildGoogleSearchLink(scopedQuery);

    return {
      id: `fallback-${domain}-${index}`,
      title: `Busqueda web en ${domain}`,
      link,
      googleLink: link,
      snippet: `Resultado generado sin API configurada. Ejecuta esta busqueda para revisar propiedades, chats o anuncios relacionados con: ${keywords}`,
      source: domain,
      position: index + 1
    };
  });
}

export async function runIaSearch(args: {
  keywords: string;
  domains: string;
  locale?: string;
}): Promise<{ query: string; results: IaSearchResult[]; provider: string }> {
  const keywords = args.keywords.trim();
  const domains = normalizeDomains(args.domains);
  const query = buildGoogleQuery(keywords, domains);

  if (!keywords) {
    return {
      query,
      results: [],
      provider: "none"
    };
  }

  const serpApiKey = process.env.SERPAPI_KEY;

  if (!serpApiKey) {
    return {
      query,
      results: buildFallbackResults(keywords, domains),
      provider: "fallback"
    };
  }

  const url = new URL("https://serpapi.com/search.json");
  url.searchParams.set("engine", "google");
  url.searchParams.set("q", query);
  url.searchParams.set("hl", args.locale ?? "es");
  url.searchParams.set("api_key", serpApiKey);

  const response = await fetch(url.toString(), { cache: "no-store" });

  if (!response.ok) {
    return {
      query,
      results: buildFallbackResults(keywords, domains),
      provider: "fallback"
    };
  }

  const payload = (await response.json()) as {
    organic_results?: Array<{
      position?: number;
      title?: string;
      link?: string;
      snippet?: string;
    }>;
  };

  const results = (payload.organic_results ?? [])
    .filter((entry) => Boolean(entry.link && entry.title))
    .slice(0, 20)
    .map<IaSearchResult>((entry, index) => {
      const link = entry.link ?? "";
      const title = entry.title ?? "Sin titulo";
      const source = sourceFromLink(link);
      const googleQuery = `${keywords} site:${source} ${title}`;

      return {
        id: `${entry.position ?? index + 1}-${link}`,
        title,
        link,
        googleLink: buildGoogleSearchLink(googleQuery),
        snippet: entry.snippet ?? "Sin descripcion",
        source,
        position: entry.position ?? index + 1
      };
    });

  return {
    query,
    results,
    provider: "serpapi"
  };
}
