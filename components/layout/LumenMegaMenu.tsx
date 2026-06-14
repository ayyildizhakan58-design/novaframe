"use client";

import type { CSSProperties } from "react";
import { exploreProducts, imageFeatures, imageModels, trendingTools, videoFeatures, videoModels, type LumenFeature, type LumenModel } from "@/lib/lumen/modelCatalog";

type LumenMegaMenuProps = {
  kind: "explore" | "image" | "video";
};

function Badge({ value }: { value?: string }) {
  if (!value) return null;
  return <span style={value === "TRENDING" ? styles.hotBadge : styles.badge}>{value}</span>;
}

function FeatureRow({ item }: { item: LumenFeature }) {
  return (
    <div style={styles.row}>
      <div style={styles.icon}>{item.icon}<Badge value={item.badge} /></div>
      <div><strong style={styles.rowTitle}>{item.title}</strong><p style={styles.rowDesc}>{item.desc}</p></div>
    </div>
  );
}

function ModelRow({ item }: { item: LumenModel }) {
  return (
    <div style={styles.row}>
      <div style={styles.icon}>{item.icon}<Badge value={item.badge} /></div>
      <div><strong style={styles.rowTitle}>{item.name}</strong><p style={styles.rowDesc}>{item.desc}</p></div>
    </div>
  );
}

export default function LumenMegaMenu({ kind }: LumenMegaMenuProps) {
  if (kind === "explore") {
    return (
      <div style={styles.explorePanel}>
        <div style={styles.search}>⌕ Search</div>
        <div style={styles.tabs}><b>All</b><span>✧ Models</span><span>Products</span><span>Characters</span><span>Community</span><span>Apps ↗</span></div>
        <p style={styles.sectionLabel}>Popular products</p>
        <div style={styles.productGrid}>{exploreProducts.map((item) => <div key={item.title} style={styles.productCard}><div><small>{item.badge}</small><h3>{item.title} ↗</h3><p>{item.desc}</p></div></div>)}</div>
        <p style={styles.sectionLabel}>Trending</p>
        <div style={styles.trendingGrid}>{trendingTools.map((item) => <FeatureRow key={item.title} item={item} />)}</div>
      </div>
    );
  }

  const features = kind === "image" ? imageFeatures : videoFeatures;
  const models = kind === "image" ? imageModels : videoModels;

  return (
    <div style={styles.panel}>
      <div>
        <p style={styles.sectionLabel}>Features</p>
        {features.map((item) => <FeatureRow key={item.title} item={item} />)}
      </div>
      <div>
        <p style={styles.sectionLabel}>Models</p>
        {models.map((item) => <ModelRow key={item.name} item={item} />)}
      </div>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  panel: { position: "absolute", top: 42, left: 0, zIndex: 40, width: 820, maxHeight: "calc(100vh - 70px)", overflow: "auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 26, padding: 22, borderRadius: 24, background: "#1b1d1f", border: "1px solid rgba(255,255,255,.08)", boxShadow: "0 24px 90px rgba(0,0,0,.55)" },
  explorePanel: { position: "absolute", top: 42, left: 0, zIndex: 40, width: 760, padding: 18, borderRadius: 24, background: "#282421", border: "1px solid rgba(255,255,255,.09)", boxShadow: "0 24px 90px rgba(0,0,0,.55)" },
  search: { height: 58, display: "flex", alignItems: "center", padding: "0 18px", borderRadius: 20, background: "rgba(255,255,255,.07)", color: "rgba(255,255,255,.45)", fontSize: 18, marginBottom: 12 },
  tabs: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 },
  sectionLabel: { margin: "0 0 12px", color: "rgba(255,255,255,.42)", fontSize: 14 },
  row: { display: "grid", gridTemplateColumns: "50px 1fr", alignItems: "center", gap: 12, minHeight: 64, marginBottom: 10 },
  icon: { position: "relative", width: 50, height: 50, borderRadius: 14, background: "rgba(255,255,255,.06)", color: "#fff", display: "grid", placeItems: "center", fontWeight: 950 },
  rowTitle: { display: "block", color: "#fff", fontSize: 15, marginBottom: 4 },
  rowDesc: { margin: 0, color: "rgba(255,255,255,.45)", fontSize: 13, lineHeight: 1.35 },
  badge: { position: "absolute", top: -8, right: -10, background: "#d7ff1f", color: "#111", borderRadius: 6, padding: "2px 6px", fontSize: 10, fontWeight: 950 },
  hotBadge: { position: "absolute", top: -8, right: -14, background: "#ff2c91", color: "#fff", borderRadius: 6, padding: "2px 6px", fontSize: 10, fontWeight: 950 },
  productGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 20 },
  productCard: { minHeight: 106, display: "flex", alignItems: "end", padding: 14, borderRadius: 14, background: "linear-gradient(135deg, rgba(215,255,31,.16), rgba(255,44,145,.18))", border: "1px solid rgba(255,255,255,.08)" },
  trendingGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: 18 },
};
