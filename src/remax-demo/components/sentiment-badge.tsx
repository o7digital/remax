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

export function SentimentBadge({ sentiment }: { sentiment: RemaxSentimentLabel }) {
  return <span className={getSentimentClassName(sentiment)}>{sentiment}</span>;
}
