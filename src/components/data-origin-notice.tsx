export function DataOriginNotice({
  title = "Datos ficticios",
  description
}: {
  title?: string;
  description: string;
}) {
  return (
    <div className="security-banner">
      <strong>{title}</strong>
      <span>{description}</span>
    </div>
  );
}
