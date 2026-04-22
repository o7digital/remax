export interface IaSearchResult {
  id: string;
  title: string;
  link: string;
  googleLink: string;
  snippet: string;
  source: string;
  position: number;
}

const DEFAULT_TARGET_DOMAINS = ["inmueble24.com", "easyaviso.com", "metroscubicos.com", "propiedades.com"];

function normalizeDomains(value: string) {
  const normalized = value
    .split(",")
    .map((part) => part.trim().toLowerCase())
    .filter(Boolean)
    .map((domain) => domain.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, ""));

  return Array.from(new Set(normalized));
}

function extractAreaHints(keywords: string) {
  const matches = Array.from(keywords.matchAll(/(\d[\d,.]*)\s*(?:m2|m²)\b/gi));
  const values = matches
    .map((match) => match[1] ?? "")
    .map((raw) => raw.replace(/[.,\s]/g, ""))
    .filter(Boolean);

  return Array.from(new Set(values));
}

function buildAreaClause(areaHints: string[]) {
  if (areaHints.length === 0) {
    return "";
  }

  const tokens = areaHints.flatMap((value) => {
    const withCommas = Number.isFinite(Number(value)) ? Number(value).toLocaleString("en-US") : value;
    return [`"${value}m2"`, `"${value} m2"`, `"${value} m²"`, `"${withCommas} m2"`];
  });

  return `(${Array.from(new Set(tokens)).join(" OR ")})`;
}

function buildGoogleQuery(keywords: string, domains: string[], forceDomain?: string) {
  const areaClause = buildAreaClause(extractAreaHints(keywords));
  const hasIndustrialIntent = /\b(bodega|industrial|nave|warehouse)\b/i.test(keywords);
  const hasSaleIntent = /\b(venta|en venta|vender)\b/i.test(keywords);
  const intentClauses = [
    hasIndustrialIntent ? `(bodega industrial OR nave industrial OR warehouse industrial)` : "",
    hasSaleIntent ? `("en venta" OR venta)` : "",
    areaClause,
    `-renta -alquiler -arrendamiento`
  ].filter(Boolean);

  const searchDomains = forceDomain ? [forceDomain] : domains;
  const scope =
    searchDomains.length > 0 ? `(${searchDomains.map((domain) => `site:${domain}`).join(" OR ")})` : "";

  return [keywords, ...intentClauses, scope].filter(Boolean).join(" ");
}

function buildDisplayQuery(keywords: string, domains: string[]) {
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

function buildFallbackResults(keywords: string, domains: string[], ultraWide = false): IaSearchResult[] {
  if (ultraWide) {
    const broadQuery = buildGoogleQuery(keywords, []);
    const link = buildGoogleSearchLink(broadQuery);

    return [
      {
        id: "fallback-google-ultra-wide",
        title: "Busqueda web ultra amplia en Google",
        link,
        googleLink: link,
        snippet: `Resultado generado sin API configurada. Ejecuta esta busqueda amplia para descubrir anuncios relevantes: ${keywords}`,
        source: "google.com",
        position: 1
      }
    ];
  }

  const searchScopes = domains.length > 0 ? domains : DEFAULT_TARGET_DOMAINS;

  return searchScopes.map((domain, index) => {
    const scopedQuery = buildGoogleQuery(keywords, searchScopes, domain);
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
  wide?: boolean;
}): Promise<{ query: string; results: IaSearchResult[]; provider: string }> {
  const keywords = args.keywords.trim();
  const domains = normalizeDomains(args.domains);
  const searchDomains = args.wide ? [] : domains;
  const query = buildDisplayQuery(keywords, searchDomains);
  const advancedQuery = buildGoogleQuery(keywords, searchDomains);

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
      results: buildFallbackResults(keywords, searchDomains, args.wide),
      provider: "fallback"
    };
  }

  const url = new URL("https://serpapi.com/search.json");
  url.searchParams.set("engine", "google");
  url.searchParams.set("q", advancedQuery);
  url.searchParams.set("hl", args.locale ?? "es");
  url.searchParams.set("api_key", serpApiKey);

  const response = await fetch(url.toString(), { cache: "no-store" });

  if (!response.ok) {
    return {
      query,
      results: buildFallbackResults(keywords, searchDomains, args.wide),
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
