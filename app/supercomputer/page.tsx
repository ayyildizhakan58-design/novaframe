"use client";

import { useState, type CSSProperties } from "react";
import LumenTopNav from "@/components/layout/LumenTopNav";

const cards = [
  { title: "Image Generation", desc: "Create campaign-ready images from a simple prompt.", icon: "IMG", badge: "Try", type: "image", gradient: "linear-gradient(135deg, #ff4da6, #7c1fff)" },
  { title: "Video Generation", desc: "Turn ideas into cinematic short videos and ads.", icon: "VID", badge: "Soon", type: "video", gradient: "linear-gradient(135deg, #4da3ff, #71ff00)" },
  { title: "Product Studio", desc: "Generate product shots, UGC concepts, and brand visuals.", icon: "PRD", badge: "New", type: "product", gradient: "linear-gradient(135deg, #ffe66d, #ff4da6)" },
  { title: "Creative Apps", desc: "Explore reusable tools for ads, creators, and workflows.", icon: "APP", badge: "Open", type: "apps", gradient: "linear-gradient(135deg, #71ff00, #00d4ff)" },
];

const menu = ["New task", "Search", "Marketplace"];
const suggestions = ["Create a luxury perfume ad", "Generate a cinematic product shot", "Make a 10 second video concept", "Build a viral TikTok hook"];

type GenerationResult = {
  text?: string;
  imageUrl?: string;
  videoUrl?: string;
  raw?: unknown;
};

export default function SupercomputerPage() {
  const [prompt, setPrompt] = useState("");
  const [mode, setMode] = useState("image");
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [loading, setLoading] = useState(false);

  async function runPrompt(selectedMode = mode) {
    const cleanPrompt = prompt.trim();
    if (!cleanPrompt) {
      setResult({ text: "Write a prompt first, then choose Image, Video, Product, or Apps." });
      return;
    }

    setLoading(true);
    setMode(selectedMode);
    setResult(null);

    try {
      if (selectedMode === "image" || selectedMode === "product") {
        const response = await fetch("/api/fal/image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: cleanPrompt, model: "fal-ai/flux/dev" }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data?.error || "FAL image generation failed.");
        const imageUrl = data?.imageUrl || data?.media?.url;
        setResult({
          text: imageUrl ? "Image generated successfully." : "FAL responded, but no image URL was found.",
          imageUrl,
          raw: data,
        });
        return;
      }

      setResult({ text: `${selectedMode} mode is ready. Next step: connect this mode to its own API endpoint.\n\nPrompt: ${cleanPrompt}` });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Generation failed.";
      setResult({ text: message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={styles.page}>
      <LumenTopNav />
      <div style={styles.shell}>
        <aside style={styles.sidebar}>
          <div style={styles.brandRow}><div style={styles.logo}>L</div><strong>Supercomputer</strong></div>
          <nav style={styles.nav}>{menu.map((item, index) => <button key={item} style={styles.navItem} onClick={() => index === 0 && setPrompt("")}><span style={styles.navIcon}>{index === 0 ? "+" : index === 1 ? "S" : "M"}</span>{item}{item === "Marketplace" && <span style={styles.newBadge}>NEW</span>}</button>)}</nav>
          <div style={styles.taskTitle}>Tasks</div>
          <div style={styles.emptyTask}><div style={styles.emptyIcon}>+</div><b>No tasks yet</b><span>Create one to get started</span></div>
          <div style={styles.priceBox}><span>Pricing</span><b>30% OFF</b></div>
        </aside>

        <section style={styles.content}>
          <header style={styles.topbar}><button style={styles.roundButton}>Menu</button><button style={styles.shortcut}>Shortcuts</button></header>

          <section style={styles.hero}>
            <div style={styles.dotPattern} />
            <div style={styles.heroLogo}>L</div>
            <h1 style={styles.title}>SUPERCOMPUTER FOR CREATIVE WORK</h1>
            <p style={styles.subtitle}>Turn a simple chat into production-ready content at scale.</p>

            <div style={styles.promptBox}>
              <input style={styles.promptInput} value={prompt} onChange={(e) => setPrompt(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") runPrompt(); }} placeholder="Make a talking head video from a product idea..." />
              <div style={styles.promptBottom}>
                <button style={styles.plusButton}>+</button>
                <div style={styles.modelBadge}>Lumenfield Creative 3.5 Flash</div>
                <select style={styles.modeSelect} value={mode} onChange={(e) => setMode(e.target.value)}><option value="image">Image</option><option value="video">Video</option><option value="product">Product</option><option value="apps">Apps</option></select>
                <button style={styles.askButton} onClick={() => runPrompt()} disabled={loading}>{loading ? "..." : "Ask"}</button>
              </div>
            </div>

            <div style={styles.suggestions}>{suggestions.map((s) => <button key={s} style={styles.suggestion} onClick={() => setPrompt(s)}>{s}</button>)}</div>
          </section>

          {result && <section style={styles.resultBox}>{result.imageUrl && <img src={result.imageUrl} alt="Generated result" style={styles.resultImage} />}{result.videoUrl && <video src={result.videoUrl} controls style={styles.resultImage} />}{result.text && <pre style={styles.resultText}>{result.text}</pre>}</section>}

          <section style={styles.sectionHead}><div><h2 style={styles.h2}>What can the Supercomputer do?</h2><p style={styles.muted}>Videos, ads, product shots, avatars, music videos, and more.</p></div><button style={styles.browse}>Browse more</button></section>
          <section style={styles.grid}>{cards.map((card) => <article key={card.title} style={styles.card}><div style={{ ...styles.thumb, background: card.gradient }}><span style={styles.thumbIcon}>{card.icon}</span></div><div style={styles.cardFooter}><div style={styles.cardIcon}>{card.icon}</div><div><h3 style={styles.cardTitle}>{card.title}</h3><p style={styles.cardDesc}>{card.desc}</p></div><button style={styles.tryButton} onClick={() => runPrompt(card.type)}>{card.badge}</button></div></article>)}</section>
        </section>
      </div>
    </main>
  );
}

const styles: Record<string, CSSProperties> = {
  page: { minHeight: "100vh", background: "#101012", color: "#fff", fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" },
  shell: { minHeight: "calc(100vh - 58px)", display: "grid", gridTemplateColumns: "190px 1fr" },
  sidebar: { minHeight: "calc(100vh - 58px)", background: "#151518", borderRight: "1px solid #25252a", padding: "12px 10px", position: "sticky", top: 58 },
  brandRow: { display: "flex", alignItems: "center", gap: 10, marginBottom: 20, padding: "8px 6px" },
  logo: { width: 30, height: 30, borderRadius: 9, display: "grid", placeItems: "center", color: "#101010", fontWeight: 950, background: "linear-gradient(135deg, #d7ff1f, #71ff00)", boxShadow: "0 0 20px rgba(215,255,31,.35)" },
  nav: { display: "grid", gap: 6 },
  navItem: { minHeight: 38, display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 10, color: "#f2f2f2", background: "transparent", border: 0, textAlign: "left", fontSize: 14, fontWeight: 800, cursor: "pointer" },
  navIcon: { color: "#aaa", width: 18 },
  newBadge: { marginLeft: "auto", fontSize: 10, fontWeight: 900, color: "#111", background: "#d7ff1f", borderRadius: 999, padding: "2px 6px" },
  taskTitle: { color: "#8c8c91", fontSize: 13, margin: "24px 10px 8px" },
  emptyTask: { height: 210, display: "grid", placeItems: "center", alignContent: "center", gap: 8, color: "#fff", textAlign: "center" },
  emptyIcon: { width: 58, height: 58, borderRadius: 16, display: "grid", placeItems: "center", color: "#111", background: "#d7ff1f", fontWeight: 900 },
  priceBox: { position: "absolute", left: 12, right: 12, bottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", borderRadius: 12, background: "#1f2315", color: "#d7ff1f", fontSize: 13 },
  content: { padding: "12px 16px 60px" },
  topbar: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  roundButton: { borderRadius: 999, border: "1px solid #333", background: "#222", color: "#ccc", padding: "8px 12px" },
  shortcut: { border: 0, background: "#222", color: "#ddd", borderRadius: 999, padding: "9px 14px", fontWeight: 800 },
  hero: { minHeight: 690, borderRadius: 28, padding: "130px 24px 30px", textAlign: "center", overflow: "hidden", position: "relative", background: "radial-gradient(circle at 50% 92%, rgba(215,255,31,1), rgba(151,190,8,.9) 31%, rgba(33,38,22,.96) 61%, #171719 100%)", border: "1px solid #2b2b2b" },
  dotPattern: { position: "absolute", inset: 0, opacity: .16, backgroundImage: "radial-gradient(rgba(255,255,255,.55) 1px, transparent 1px)", backgroundSize: "12px 12px" },
  heroLogo: { position: "relative", width: 82, height: 82, borderRadius: 22, display: "grid", placeItems: "center", margin: "0 auto 28px", color: "#101010", fontSize: 40, fontWeight: 950, background: "linear-gradient(135deg, #edff85, #bfff00)", boxShadow: "0 0 35px rgba(215,255,31,.45), inset 0 0 0 4px rgba(0,0,0,.2)" },
  title: { position: "relative", fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1, margin: 0, letterSpacing: "-.05em" },
  subtitle: { position: "relative", color: "rgba(255,255,255,.62)", fontWeight: 800, marginTop: 14 },
  promptBox: { position: "relative", width: "min(850px, 94%)", minHeight: 108, margin: "36px auto 16px", display: "grid", gap: 10, padding: "18px 20px 14px", borderRadius: 26, background: "#1d1d1c", border: "2px solid rgba(255,255,255,.16)", boxShadow: "0 22px 80px rgba(0,0,0,.5)" },
  promptInput: { width: "100%", border: 0, outline: 0, background: "transparent", color: "#fff", fontSize: 16, fontWeight: 700 },
  promptBottom: { display: "flex", alignItems: "center", gap: 10 },
  plusButton: { width: 34, height: 34, borderRadius: 999, border: 0, background: "#303030", color: "#fff", fontSize: 22 },
  modelBadge: { fontSize: 13, color: "#fff", fontWeight: 900, whiteSpace: "nowrap" },
  modeSelect: { marginLeft: "auto", border: 0, background: "#272727", color: "#fff", borderRadius: 999, padding: "9px 10px", fontWeight: 900 },
  askButton: { minWidth: 56, height: 42, borderRadius: 999, border: 0, background: "#d7ff1f", color: "#111", fontWeight: 950, fontSize: 14, cursor: "pointer" },
  suggestions: { position: "relative", width: "min(880px, 94%)", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" },
  suggestion: { border: "1px solid rgba(255,255,255,.14)", background: "rgba(0,0,0,.25)", color: "#fff", borderRadius: 999, padding: "8px 12px", fontWeight: 800 },
  resultBox: { width: "min(1020px, 100%)", margin: "18px auto", padding: 18, borderRadius: 18, background: "#1d1d20", color: "#d7ff1f", border: "1px solid #28282d" },
  resultText: { margin: 0, whiteSpace: "pre-wrap", color: "#d7ff1f" },
  resultImage: { display: "block", width: "100%", maxHeight: 640, objectFit: "contain", borderRadius: 16, marginBottom: 14 },
  sectionHead: { width: "min(1020px, 100%)", margin: "34px auto 20px", display: "flex", justifyContent: "space-between", alignItems: "end" },
  h2: { margin: 0, fontSize: 24 },
  muted: { color: "#9c9ca3", margin: "8px 0 0" },
  browse: { border: 0, background: "#222", color: "#ddd", borderRadius: 999, padding: "10px 14px", fontWeight: 900 },
  grid: { width: "min(1020px, 100%)", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 18 },
  card: { background: "#1b1b1f", border: "1px solid #2a2a30", borderRadius: 20, overflow: "hidden" },
  thumb: { height: 170, display: "grid", placeItems: "center" },
  thumbIcon: { fontSize: 28, fontWeight: 950, color: "rgba(255,255,255,.9)" },
  cardFooter: { display: "grid", gridTemplateColumns: "42px 1fr auto", alignItems: "center", gap: 12, padding: 14 },
  cardIcon: { width: 38, height: 38, borderRadius: 12, display: "grid", placeItems: "center", background: "rgba(255,255,255,.07)", fontSize: 12, fontWeight: 950 },
  cardTitle: { margin: 0, fontSize: 15 },
  cardDesc: { margin: "4px 0 0", color: "#9c9ca3", fontSize: 12, lineHeight: 1.35 },
  tryButton: { border: 0, borderRadius: 999, background: "#d7ff1f", color: "#111", padding: "8px 11px", fontWeight: 950, cursor: "pointer" },
};
