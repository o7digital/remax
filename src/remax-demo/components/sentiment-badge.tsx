import { translateSentiment, type RemaxLanguage } from "@/remax-demo/i18n";
import type { RemaxSentimentLabel } from "@/remax-demo/types";

function getSentimentClassName(sentiment: RemaxSentimentLabel) {
  switch (sentiment) {
    case "positivo":
      return "remax-sentiment-badge remax-sentiment-positive";
    case "neutro":
      return "remax-sentiment-badge remax-sentiment-neutral";
    default:
      return "remax-sentiment-badge remax-sentiment-risk";
  }
}

export function SentimentBadge({
  sentiment,
  language = "es"
}: {
  sentiment: RemaxSentimentLabel;
  language?: RemaxLanguage;
}) {
  return <span className={getSentimentClassName(sentiment)}>{translateSentiment(language, sentiment)}</span>;
}
