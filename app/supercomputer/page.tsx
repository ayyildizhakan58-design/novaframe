const cards = [
  {
    title: "Image Generation",
    desc: "Create campaign-ready images from a simple prompt.",
    icon: "▧",
    badge: "Try",
    gradient: "linear-gradient(135deg, #ff4da6, #7c1fff)",
  },
  {
    title: "Video Generation",
    desc: "Turn ideas into cinematic short videos and ads.",
    icon: "▯",
    badge: "Try",
    gradient: "linear-gradient(135deg, #4da3ff, #71ff00)",
  },
  {
    title: "Product Studio",
    desc: "Generate product shots, UGC concepts, and brand visuals.",
    icon: "◈",
    badge: "New",
    gradient: "linear-gradient(135deg, #ffe66d, #ff4da6)",
  },
  {
    title: "Creative Apps",
    desc: "Explore reusable tools for ads, creators, and workflows.",
    icon: "⌘",
    badge: "Open",
    gradient: "linear-gradient(135deg, #71ff00, #00d4ff)",
  },
];

const menu = ["New task", "Games", "Search", "My office", "Marketplace", "Files", "Memory"];
const tasks = ["Ad campaign", "Product video", "Avatar", "Music video", "Storyboard"];

export default function SupercomputerPage() {
  return (
    <main style={styles.shell}>
      <aside style={styles.sidebar}>
        <div style={styles.brandRow}>
          <div style={styles.logo}>L</div>
          <strong>Lumenfield</strong>
        </div>

        <nav style={styles.nav}>
          {menu.map((item, index) => (
            <a key={item} style={styles.navItem} href="#">
              <span style={styles.navIcon}>{index === 0 ? "+" : "◌"}</span>
              {item}
              {item === "Games" && <span style={styles.newBadge}>NEW</span>}
            </a>
          ))}
        </nav>

        <div style={styles.taskTitle}>Tasks</div>
        <div style={styles.taskList}>
          {tasks.map((task) => (
            <div key={task} style={styles.taskItem}>{task}</div>
          ))}
        </div>

        <div style={styles.priceBox}>
          <span>Pricing</span>
          <b>30% OFF</b>
        </div>
      </aside>

      <section style={styles.content}>
        <header style={styles.topbar}>
          <button style={styles.roundButton}>□</button>
          <div style={styles.topActions}>
            <button style={styles.upgrade}>Upgrade</button>
            <button style={styles.shortcut}>⌘ Shortcuts</button>
          </div>
        </header>

        <section style={styles.hero}>
          <div style={styles.heroLogo}>L</div>
          <h1 style={styles.title}>SUPERCOMPUTER FOR CREATIVE WORK</h1>
          <p style={styles.subtitle}>Turn a simple idea into production-ready content at scale.</p>

          <div style={styles.promptBox}>
            <button style={styles.plusButton}>+</button>
            <div style={styles.modelBadge}>◆ Lumenfield Creative 3.5</div>
            <div style={styles.promptSpacer} />
            <button style={styles.askButton}>Ask</button>
            <button style={styles.sendButton}>↑</button>
          </div>

          <div style={styles.heroFooter}>
            <div style={styles.peopleCluster}>
              <span style={styles.avatar}>AI</span>
              <span style={styles.avatar}>AD</span>
              <span style={styles.avatar}>3D</span>
            </div>
            <div>
              <strong>Make games with Lumenfield</strong> <span style={styles.inlineNew}>NEW</span>
              <p style={styles.heroMiniText}>Generate art, sounds, characters, and creative systems.</p>
            </div>
            <button style={styles.createGame}>Create game</button>
          </div>
        </section>

        <section style={styles.sectionHead}>
          <div>
            <h2 style={styles.h2}>What can the Supercomputer do?</h2>
            <p style={styles.muted}>Videos, ads, product shots, avatars, music videos, and more.</p>
          </div>
          <button style={styles.browse}>Browse more</button>
        </section>

        <section style={styles.grid}>
          {cards.map((card) => (
            <article key={card.title} style={styles.card}>
              <div style={{ ...styles.thumb, background: card.gradient }}>
                <span style={styles.thumbIcon}>{card.icon}</span>
              </div>
              <div style={styles.cardFooter}>
                <div style={styles.cardIcon}>{card.icon}</div>
                <div>
                  <h3 style={styles.cardTitle}>{card.title}</h3>
                  <p style={styles.cardDesc}>{card.desc}</p>
                </div>
                <button style={styles.tryButton}>{card.badge}</button>
              </div>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  shell: {
    minHeight: "100vh",
    display: "grid",
    gridTemplateColumns: "220px 1fr",
    background: "#111113",
    color: "#fff",
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
  },
  sidebar: {
    minHeight: "100vh",
    background: "#151518",
    borderRight: "1px solid #25252a",
    padding: "16px 12px",
    position: "sticky",
    top: 0,
  },
  brandRow: { display: "flex", alignItems: "center", gap: 10, marginBottom: 22 },
  logo: {
    width: 28,
    height: 28,
    borderRadius: 9,
    display: "grid",
    placeItems: "center",
    color: "#111",
    fontWeight: 900,
    background: "linear-gradient(135deg, #d7ff1f, #71ff00)",
    boxShadow: "0 0 20px rgba(215,255,31,.35)",
  },
  nav: { display: "grid", gap: 6 },
  navItem: {
    minHeight: 34,
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "8px 10px",
    borderRadius: 10,
    color: "#f2f2f2",
    textDecoration: "none",
    fontSize: 14,
  },
  navIcon: { color: "#999" },
  newBadge: {
    marginLeft: "auto",
    fontSize: 10,
    fontWeight: 800,
    color: "#111",
    background: "#d7ff1f",
    borderRadius: 999,
    padding: "2px 6px",
  },
  taskTitle: { color: "#8c8c91", fontSize: 13, margin: "22px 10px 8px" },
  taskList: { display: "grid", gap: 6 },
  taskItem: { padding: "8px 10px", color: "#aaa", fontSize: 13, borderRadius: 8 },
  priceBox: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 16,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 12px",
    borderRadius: 12,
    background: "#1f2315",
    color: "#d7ff1f",
    fontSize: 13,
  },
  content: { padding: "12px 16px 60px" },
  topbar: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  roundButton: {
    width: 32,
    height: 32,
    borderRadius: 999,
    border: "1px solid #333",
    background: "#222",
    color: "#ccc",
  },
  topActions: { display: "flex", gap: 8 },
  upgrade: {
    border: 0,
    background: "#d7ff1f",
    color: "#111",
    borderRadius: 999,
    padding: "9px 18px",
    fontWeight: 800,
  },
  shortcut: {
    border: 0,
    background: "#222",
    color: "#ddd",
    borderRadius: 999,
    padding: "9px 14px",
    fontWeight: 700,
  },
  hero: {
    minHeight: 560,
    borderRadius: 28,
    padding: "90px 24px 0",
    textAlign: "center",
    overflow: "hidden",
    background:
      "radial-gradient(circle at 50% 95%, rgba(215,255,31,.95), rgba(120,150,0,.75) 34%, rgba(26,28,20,.95) 70%, #181818 100%)",
    border: "1px solid #2b2b2b",
  },
  heroLogo: {
    width: 78,
    height: 78,
    borderRadius: 22,
    display: "grid",
    placeItems: "center",
    margin: "0 auto 24px",
    color: "#101010",
    fontSize: 38,
    fontWeight: 950,
    background: "linear-gradient(135deg, #edff85, #bfff00)",
    boxShadow: "0 0 35px rgba(215,255,31,.45), inset 0 0 0 4px rgba(0,0,0,.2)",
  },
  title: { fontSize: "clamp(30px, 4vw, 48px)", lineHeight: 1, margin: 0, letterSpacing: "-.04em" },
  subtitle: { color: "rgba(255,255,255,.62)", fontWeight: 700, marginTop: 14 },
  promptBox: {
    width: "min(760px, 94%)",
    minHeight: 92,
    margin: "34px auto 80px",
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "0 16px",
    borderRadius: 24,
    background: "#1d1d1c",
    border: "2px solid rgba(255,255,255,.16)",
    boxShadow: "0 22px 80px rgba(0,0,0,.45)",
  },
  plusButton: { width: 34, height: 34, borderRadius: 999, border: 0, background: "#303030", color: "#fff", fontSize: 22 },
  modelBadge: { fontSize: 13, color: "#fff", fontWeight: 800 },
  promptSpacer: { flex: 1 },
  askButton: { border: 0, background: "transparent", color: "#fff", fontWeight: 800 },
  sendButton: { width: 38, height: 38, borderRadius: 999, border: 0, background: "#d7ff1f", color: "#111", fontWeight: 900, fontSize: 20 },
  heroFooter: {
    width: "min(700px, 95%)",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 22,
    color: "#161616",
    textAlign: "left",
  },
  peopleCluster: { display: "flex" },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 16,
    display: "grid",
    placeItems: "center",
    background: "#191919",
    color: "#d7ff1f",
    border: "2px solid #b6df16",
    marginLeft: -8,
    fontWeight: 900,
  },
  inlineNew: { background: "#d7ff1f", color: "#111", fontSize: 12, fontWeight: 900, padding: "1px 5px" },
  heroMiniText: { margin: "6px 0 0", color: "rgba(0,0,0,.58)", fontWeight: 700 },
  createGame: { border: 0, borderRadius: 999, background: "#111", color: "#fff", padding: "10px 16px", fontWeight: 900 },
  sectionHead: {
    width: "min(1020px, 100%)",
    margin: "34px auto 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "end",
  },
  h2: { margin: 0, fontSize: 24 },
  muted: { color: "#8d8d91", margin: "6px 0 0", fontWeight: 700 },
  browse: { border: 0, borderRadius: 999, background: "#242426", color: "#fff", padding: "10px 16px", fontWeight: 800 },
  grid: {
    width: "min(1020px, 100%)",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 18,
  },
  card: { background: "#1d1d20", border: "1px solid #28282d", borderRadius: 24, padding: 18, overflow: "hidden" },
  thumb: { minHeight: 230, borderRadius: 18, display: "grid", placeItems: "center" },
  thumbIcon: { fontSize: 76, color: "rgba(0,0,0,.58)", fontWeight: 900 },
  cardFooter: { display: "flex", alignItems: "center", gap: 12, marginTop: 14 },
  cardIcon: { width: 42, height: 42, borderRadius: 12, display: "grid", placeItems: "center", background: "#2d65ff", fontWeight: 900 },
  cardTitle: { margin: 0, fontSize: 18 },
  cardDesc: { margin: "4px 0 0", color: "#888", fontSize: 13, fontWeight: 700 },
  tryButton: { marginLeft: "auto", border: 0, background: "#d7ff1f", color: "#111", borderRadius: 999, padding: "9px 13px", fontWeight: 900 },
};
