export default function SupercomputerPage() {
  return (
    <main
      style={{
        width: "100%",
        minHeight: "100vh",
        padding: "24px",
        background: "#050505",
      }}
    >
      <iframe
        src="https://novaframe-ruddy.vercel.app/"
        width="100%"
        height="900"
        style={{
          border: 0,
          borderRadius: "16px",
          background: "#000",
        }}
        allow="camera; microphone; clipboard-read; clipboard-write; fullscreen"
      />
    </main>
  );
}
