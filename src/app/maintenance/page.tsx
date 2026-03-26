export const metadata = {
  title: "Maintenance",
  description: "Site temporairement indisponible."
};

export default function MaintenancePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "24px",
        background:
          "radial-gradient(circle at top left, rgba(215, 67, 63, 0.14), transparent 24%), radial-gradient(circle at bottom right, rgba(95, 136, 195, 0.14), transparent 28%), linear-gradient(180deg, #07101a 0%, #0b1522 100%)",
        color: "#f4f7fb"
      }}
    >
      <section
        style={{
          width: "min(100%, 640px)",
          padding: "32px",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          borderRadius: "24px",
          background: "rgba(12, 19, 31, 0.84)",
          boxShadow: "0 24px 80px rgba(0, 0, 0, 0.28)"
        }}
      >
        <p
          style={{
            margin: 0,
            color: "#7fb2ff",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.16em",
            textTransform: "uppercase"
          }}
        >
          Maintenance
        </p>
        <h1
          style={{
            margin: "14px 0 12px",
            fontSize: "clamp(34px, 6vw, 52px)",
            lineHeight: 0.94,
            letterSpacing: "-0.05em"
          }}
        >
          Le site est temporairement indisponible
        </h1>
        <p
          style={{
            margin: 0,
            color: "rgba(244, 247, 251, 0.76)",
            fontSize: "18px",
            lineHeight: 1.7
          }}
        >
          Une maintenance est en cours. L&apos;acces est suspendu pour le moment. Reprise prevue demain.
        </p>
      </section>
    </main>
  );
}
