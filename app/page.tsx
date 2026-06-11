'use client';

import { useState } from "react";

const IMG = {
  cowboy: "https://images.pexels.com/photos/2531546/pexels-photo-2531546.jpeg?auto=compress&cs=tinysrgb&w=800",
  city: "https://images.pexels.com/photos/315938/pexels-photo-315938.jpeg?auto=compress&cs=tinysrgb&w=800",
  cyberpunk: "https://images.pexels.com/photos/3779662/pexels-photo-3779662.jpeg?auto=compress&cs=tinysrgb&w=800",
  soul: "https://images.pexels.com/photos/3214958/pexels-photo-3214958.jpeg?auto=compress&cs=tinysrgb&w=800",
  ai: "https://images.pexels.com/photos/2748242/pexels-photo-2748242.jpeg?auto=compress&cs=tinysrgb&w=800",
  marketing: "https://images.pexels.com/photos/3727469/pexels-photo-3727469.jpeg?auto=compress&cs=tinysrgb&w=800",
};

const C = {
  bg0: "#07090d", bg1: "#0a0d12",
  s0: "#121419", s1: "#171a20", s2: "#1c1f26",
  border0: "rgba(255,255,255,0.06)", border1: "rgba(255,255,255,0.10)",
  muted: "#9ca3af",
  lime: "#ccff00", pink: "#ff1f8f", blue: "#2563eb",
};

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const AppleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);

const MicrosoftIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path fill="#F25022" d="M11.4 11.4H1V1h10.4v10.4z"/>
    <path fill="#7FBA00" d="M23 11.4H12.6V1H23v10.4z"/>
    <path fill="#00A4EF" d="M11.4 23H1V12.6h10.4V23z"/>
    <path fill="#FFB900" d="M23 23H12.6V12.6H23V23z"/>
  </svg>
);

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

function Navbar({ page, setPage }: any) {
  const navItems: any[] = [
    { label: "Explore", id: "generate" },
    { label: "Image" }, { label: "Video" }, { label: "Audio" },
    { label: "Supercomputer", badge: "New" },
    { label: "MCP & CLI", badge: "New" },
    { label: "Collab" },
    { label: "Plugins", badge: "New" },
    { label: "Marketing Studio", id: "marketing" },
    { label: "Cinema Studio", id: "generate" },
    { label: "AI Influencer", id: "influencer" },
    { label: "Canvas", id: "canvas" },
    { label: "Apps" },
  ];
  return (
    <div style={{ position: "sticky", top: 0, zIndex: 200, background: "rgba(10,13,18,0.92)", backdropFilter: "blur(14px)", borderBottom: `0.5px solid ${C.border0}`, display: "flex", alignItems: "center", height: 48, padding: "0 16px" }}>
      <div onClick={() => setPage("generate")} style={{ fontWeight: 800, fontSize: 15, color: C.lime, marginRight: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ fontSize: 18 }}>◈</span> NovaFrame
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 1, flex: 1, overflow: "hidden" }}>
        {navItems.map((n, i) => (
          <div key={i} onClick={() => n.id && setPage(n.id)} style={{ fontSize: 12, color: page === n.id ? "#fff" : C.muted, padding: "4px 8px", borderRadius: 5, cursor: "pointer", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 4 }}>
            {n.label}
            {n.badge && <span style={{ fontSize: 8, fontWeight: 700, background: "rgba(204,255,0,0.15)", color: C.lime, padding: "1px 5px", borderRadius: 3 }}>{n.badge}</span>}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ fontSize: 11, background: "rgba(255,31,143,0.15)", color: C.pink, padding: "3px 8px", borderRadius: 4, fontWeight: 700 }}>30% OFF</div>
        <div onClick={() => setPage("login")} style={{ fontSize: 12, color: C.muted, padding: "5px 12px", borderRadius: 6, border: `0.5px solid ${C.border1}`, cursor: "pointer" }}>Log in</div>
        <div onClick={() => setPage("login")} style={{ fontSize: 12, color: "#000", background: C.lime, padding: "5px 14px", borderRadius: 6, fontWeight: 700, cursor: "pointer" }}>Sign up</div>
      </div>
    </div>
  );
}

function PageGenerate({ setPage }: any) {
  const [mode, setMode] = useState("Video");
  const [loading, setLoading] = useState(false);
  const [loadMsg, setLoadMsg] = useState("");
  const [generated, setGenerated] = useState(false);
  const msgs = ["Analyzing scene...", "Selecting model...", "Rendering...", "Finalizing..."];

  const generate = () => {
    setGenerated(false); setLoading(true);
    let i = 0; setLoadMsg(msgs[0]);
    const iv = setInterval(() => { i++; if (i < msgs.length) setLoadMsg(msgs[i]); else { clearInterval(iv); setLoading(false); setGenerated(true); } }, 900);
  };

  return (
    <div style={{ display: "flex", minHeight: "calc(100vh - 48px)", background: C.bg0 }}>
      <div style={{ width: 210, background: C.s0, borderRight: `0.5px solid ${C.border0}`, padding: "14px 10px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", marginBottom: 16 }}>
          <span style={{ color: C.lime, fontSize: 16 }}>◈</span>
          <span style={{ fontSize: 13, fontWeight: 700 }}>Cinema Studio</span>
        </div>
        {["Home", "My Elements", "Favorites", "Community"].map(m => (
          <div key={m} style={{ fontSize: 12, color: C.muted, padding: "7px 10px", cursor: "pointer" }}>{m}</div>
        ))}
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 20px", backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "40px 40px" }}>

        {!generated && !loading && (
          <div style={{ display: "flex", alignItems: "flex-end", gap: 12, marginBottom: 36 }}>
            {[{ w: 130, h: 90, img: IMG.city, rot: -5 }, { w: 180, h: 120, img: IMG.cowboy, rot: 0 }, { w: 130, h: 90, img: IMG.cyberpunk, rot: 5 }].map((c, i) => (
              <div key={i} style={{ width: c.w, height: c.h, backgroundImage: `url(${c.img})`, backgroundSize: "cover", backgroundPosition: "center", borderRadius: 10, transform: `rotate(${c.rot}deg)`, boxShadow: "0 8px 24px rgba(0,0,0,0.5)" }} />
            ))}
          </div>
        )}

        {loading && (
          <div style={{ marginBottom: 36, textAlign: "center" }}>
            <div style={{ width: 60, height: 60, border: `3px solid rgba(204,255,0,0.2)`, borderTop: `3px solid ${C.lime}`, borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
            <div style={{ color: C.lime, fontSize: 13, fontWeight: 600 }}>{loadMsg}</div>
          </div>
        )}

        {generated && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 30, width: "100%", maxWidth: 700 }}>
            {[{name: "NIGHT CITY", img: IMG.city}, {name: "COWBOY", img: IMG.cowboy}, {name: "CYBERPUNK", img: IMG.cyberpunk}, {name: "MYSTICAL", img: IMG.soul}].map(p => (
              <div key={p.name} style={{ backgroundImage: `url(${p.img})`, backgroundSize: "cover", backgroundPosition: "center", borderRadius: 10, aspectRatio: "1/1", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(0,0,0,0.9), transparent)", padding: "20px 10px 8px" }}>
                  <div style={{ fontSize: 9, fontWeight: 800, color: "#fff", textAlign: "center" }}>{p.name}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 38, fontWeight: 900, letterSpacing: -2, textTransform: "uppercase", color: "#fff" }}>CREATE YOUR FIRST PROJECT.</div>
          <div style={{ fontSize: 38, fontWeight: 900, letterSpacing: -2, textTransform: "uppercase", color: C.lime }}>GENERATE THE IMPOSSIBLE.</div>
        </div>

        <div style={{ width: "100%", maxWidth: 740, background: C.s1, border: `0.5px solid ${C.border1}`, borderRadius: 14, display: "flex", overflow: "hidden" }}>
          <div style={{ display: "flex", flexDirection: "column", padding: 4 }}>
            {["Image", "Video"].map(m => (
              <div key={m} onClick={() => setMode(m)} style={{ fontSize: 11, fontWeight: 600, padding: "8px 14px", borderRadius: 8, cursor: "pointer", color: mode === m ? "#000" : C.muted, background: mode === m ? C.lime : "transparent", margin: 2 }}>{m}</div>
            ))}
          </div>
          <div style={{ flex: 1, padding: "12px 14px" }}>
            <input placeholder="Describe your scene..." style={{ background: "transparent", border: "none", outline: "none", color: "#fff", fontSize: 14, width: "100%", marginBottom: 10 }} />
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {["+", "@", "Cinema 3.5", "Auto", "1080p", "8s"].map(ch => (
                <div key={ch} style={{ fontSize: 10, color: C.muted, background: "rgba(255,255,255,0.06)", borderRadius: 6, padding: "3px 8px" }}>{ch}</div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "12px 16px", gap: 4 }}>
            <button onClick={generate} style={{ background: C.lime, color: "#000", fontWeight: 800, fontSize: 14, padding: "12px 24px", borderRadius: 10, border: "none", cursor: "pointer", boxShadow: `0 0 20px rgba(204,255,0,0.3)` }}>GENERATE</button>
            <div style={{ fontSize: 10, color: C.muted }}>✦ 9680</div>
          </div>
        </div>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

function PageMarketing() {
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [loadMsg, setLoadMsg] = useState("");

  const msgs = ["Analyzing product...", "Selecting format...", "Rendering ads...", "Finalizing..."];
  const generate = () => {
    setGenerated(false); setLoading(true);
    let i = 0; setLoadMsg(msgs[0]);
    const iv = setInterval(() => { i++; if (i < msgs.length) setLoadMsg(msgs[i]); else { clearInterval(iv); setLoading(false); setGenerated(true); } }, 900);
  };

  return (
    <div style={{ display: "flex", minHeight: "calc(100vh - 48px)", background: C.bg0 }}>
      <div style={{ width: 200, background: C.s0, borderRight: `0.5px solid ${C.border0}`, padding: "14px 10px", flexShrink: 0 }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: C.pink, marginBottom: 16 }}>MARKETING STUDIO</div>
        {["+ New project", "🔍 Search"].map(m => (
          <div key={m} style={{ fontSize: 12, color: C.muted, padding: "7px 10px", cursor: "pointer" }}>{m}</div>
        ))}
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px", backgroundImage: "radial-gradient(ellipse at 50% 0%, rgba(255,31,143,0.15) 0%, transparent 70%)" }}>
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1.5, color: C.pink, marginBottom: 16 }}>MARKETING STUDIO</div>
        <div style={{ fontSize: 40, fontWeight: 900, letterSpacing: -2, textTransform: "uppercase", textAlign: "center", marginBottom: 32 }}>
          <div>TURN ANY PRODUCT</div>
          <div style={{ color: C.pink }}>INTO A VIDEO AD</div>
        </div>

        {loading && (
          <div style={{ marginBottom: 28, textAlign: "center" }}>
            <div style={{ width: 50, height: 50, border: `3px solid rgba(255,31,143,0.2)`, borderTop: `3px solid ${C.pink}`, borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 12px" }} />
            <div style={{ color: C.pink, fontSize: 13, fontWeight: 600 }}>{loadMsg}</div>
          </div>
        )}

        {generated && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 24, width: "100%", maxWidth: 600 }}>
            {[{name: "UGC", img: IMG.marketing}, {name: "DEMO", img: IMG.cyberpunk}, {name: "STORY", img: IMG.city}].map(v => (
              <div key={v.name} style={{ backgroundImage: `url(${v.img})`, backgroundSize: "cover", borderRadius: 10, aspectRatio: "9/16", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(255,31,143,0.6), transparent)", padding: "30px 10px 10px" }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#fff", textAlign: "center" }}>{v.name}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ width: "100%", maxWidth: 760, background: "rgba(255,31,143,0.05)", border: `0.5px solid rgba(255,31,143,0.2)`, borderRadius: 14, padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <input placeholder="Describe what happens in the ad..." style={{ background: "transparent", border: "none", outline: "none", color: "#fff", fontSize: 13, flex: 1 }} />
          <button onClick={generate} style={{ background: C.pink, color: "#fff", fontWeight: 800, fontSize: 13, padding: "11px 20px", borderRadius: 10, border: "none", cursor: "pointer", boxShadow: `0 0 18px rgba(255,31,143,0.35)` }}>GENERATE ✦ 4840</button>
        </div>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

function PageInfluencer() {
  const [selected, setSelected] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [loadMsg, setLoadMsg] = useState("");

  const sel = (k: string, v: any) => setSelected((s: any) => ({ ...s, [k]: v }));

  const msgs = ["Designing identity...", "Building face...", "Applying style...", "Rendering..."];
  const generate = () => {
    setGenerated(false); setLoading(true);
    let i = 0; setLoadMsg(msgs[0]);
    const iv = setInterval(() => { i++; if (i < msgs.length) setLoadMsg(msgs[i]); else { clearInterval(iv); setLoading(false); setGenerated(true); } }, 900);
  };

  return (
    <div style={{ display: "flex", minHeight: "calc(100vh - 48px)", background: C.bg0 }}>
      <div style={{ width: 180, background: C.s0, borderRight: `0.5px solid ${C.border0}`, padding: 10, flexShrink: 0 }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: C.muted, padding: "4px 6px", marginBottom: 10 }}>AI INFLUENCER STUDIO</div>
        <div style={{ background: C.s1, border: `1px dashed ${C.border1}`, borderRadius: 10, padding: "30px 10px", cursor: "pointer", textAlign: "center" }}>
          <div style={{ fontSize: 24, color: C.muted, marginBottom: 4 }}>+</div>
          <div style={{ fontSize: 11, color: C.muted }}>Create new</div>
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 20 }}>
        <div style={{ width: 300, height: 420, background: "rgba(255,255,255,0.03)", border: `0.5px solid ${C.border1}`, borderRadius: 20, overflow: "hidden", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {loading ? (
            <div style={{ textAlign: "center" }}>
              <div style={{ width: 50, height: 50, border: `3px solid rgba(204,255,0,0.2)`, borderTop: `3px solid ${C.lime}`, borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
              <div style={{ color: C.lime, fontSize: 13, fontWeight: 600 }}>{loadMsg}</div>
            </div>
          ) : generated ? (
            <>
              <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${IMG.ai})`, backgroundSize: "cover", backgroundPosition: "center" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(0,0,0,0.9), transparent)", padding: "40px 20px 20px", textAlign: "center" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.lime }}>AI INFLUENCER</div>
              </div>
            </>
          ) : (
            <div style={{ textAlign: "center", padding: 20 }}>
              <div style={{ fontSize: 40, color: C.muted, marginBottom: 12 }}>🧬</div>
              <div style={{ fontSize: 13, color: C.muted }}>Your AI influencer lives here.</div>
            </div>
          )}
        </div>
        <button onClick={generate} style={{ marginTop: 16, background: "rgba(255,255,255,0.07)", border: `0.5px solid ${C.border1}`, color: "#fff", fontSize: 13, fontWeight: 600, padding: "10px 32px", borderRadius: 10, cursor: "pointer" }}>Generate Influencer ✦ 2</button>
      </div>

      <div style={{ width: 320, background: C.s0, borderLeft: `0.5px solid ${C.border0}`, padding: 12 }}>
        <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 12 }}>Builder</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6 }}>
          {["Human", "Alien", "Elf", "Reptile", "Beetle", "Mantis"].map(it => (
            <div key={it} onClick={() => sel("type", it)} style={{ background: selected.type === it ? "rgba(204,255,0,0.08)" : "rgba(255,255,255,0.04)", border: `0.5px solid ${selected.type === it ? C.lime : C.border0}`, borderRadius: 8, cursor: "pointer", textAlign: "center", overflow: "hidden" }}>
              <div style={{ height: 50, backgroundImage: `url(${IMG.ai})`, backgroundSize: "cover" }} />
              <div style={{ padding: "6px 4px", fontSize: 11, color: selected.type === it ? C.lime : C.muted }}>{it}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

function PageCanvas() {
  const templates = [
    { name: "Long Video", img: IMG.city },
    { name: "Seedance 2.0", img: IMG.cyberpunk },
    { name: "Extend Video", img: IMG.cowboy },
    { name: "Storyboard", img: IMG.soul },
    { name: "Product Board", img: IMG.marketing },
    { name: "Scene Builder", img: IMG.ai }
  ];

  return (
    <div style={{ minHeight: "calc(100vh - 48px)", background: "#070b18", backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "32px 32px", padding: "40px 20px" }}>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1.5, color: "#2563eb", marginBottom: 12 }}>NOVAFRAME CANVAS</div>
        <div style={{ fontSize: 40, fontWeight: 900, letterSpacing: -2, textTransform: "uppercase" }}>
          <div>GENERATE STUNNING</div>
          <div style={{ color: "#2563eb" }}>MEDIA WITH AI CANVAS</div>
        </div>
      </div>

      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>Templates</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
          {templates.map(t => (
            <div key={t.name} style={{ background: C.s1, borderRadius: 10, overflow: "hidden", cursor: "pointer" }}>
              <div style={{ height: 100, backgroundImage: `url(${t.img})`, backgroundSize: "cover", backgroundPosition: "center" }} />
              <div style={{ padding: "8px 10px" }}>
                <div style={{ fontSize: 12, fontWeight: 600 }}>{t.name}</div>
                <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>Canvas template</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PageLibrary({ setPage }: any) {
  return (
    <div style={{ minHeight: "calc(100vh - 48px)", background: C.bg0, padding: 24 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 60 }}>
        <span style={{ fontSize: 20 }}>📁</span>
        <span style={{ fontSize: 18, fontWeight: 700 }}>Library</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 60 }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>📗</div>
        <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Your creations will appear here.</div>
        <div style={{ fontSize: 13, color: C.muted, marginBottom: 24 }}>Let&apos;s make magic</div>
        <button onClick={() => setPage("generate")} style={{ background: C.lime, color: "#000", fontWeight: 800, fontSize: 13, padding: "10px 28px", borderRadius: 10, border: "none", cursor: "pointer" }}>Generate</button>
      </div>
    </div>
  );
}

function PageLogin({ setPage }: any) {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Nano Banana Pro", "Kling 3.0", "NovaFrame Soul", "Cinematic App"];
  const showcase = [
    { title: "NANO BANANA PRO", tag: "4K Resolution", sub: "Multi-character composition with stunning detail", img: IMG.cyberpunk },
    { title: "KLING 3.0", tag: "With Audio", sub: "Best price on market for the best video model", img: IMG.city },
    { title: "NOVAFRAME SOUL", tag: "Identity", sub: "Build consistent AI characters for your brand", img: IMG.soul },
    { title: "CINEMATIC APP", tag: "Mobile", sub: "Create on the go with our mobile app", img: IMG.cowboy },
  ];
  const sc = showcase[activeTab];

  return (
    <div style={{ minHeight: "calc(100vh - 48px)", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
      <div style={{ background: C.bg0, display: "flex", alignItems: "center", justifyContent: "center", padding: 40 }}>
        <div style={{ width: "100%", maxWidth: 380 }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
            <div style={{ width: 48, height: 48, background: C.lime, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 24px rgba(204,255,0,0.4)` }}>
              <span style={{ fontSize: 26, color: "#000", fontWeight: 900 }}>◈</span>
            </div>
          </div>

          <div style={{ fontSize: 26, fontWeight: 800, textAlign: "center", marginBottom: 6, color: "#fff" }}>Welcome to NovaFrame</div>
          <div style={{ fontSize: 14, color: C.muted, textAlign: "center", marginBottom: 28 }}>Sign in and continue creating</div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <button style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, padding: "13px 16px", background: C.s1, border: `0.5px solid ${C.border1}`, borderRadius: 12, color: "#fff", fontSize: 14, fontWeight: 500, cursor: "pointer", width: "100%", fontFamily: "inherit" }}>
              <GoogleIcon />Continue with Google
            </button>
            <button style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, padding: "13px 16px", background: C.s1, border: `0.5px solid ${C.border1}`, borderRadius: 12, color: "#fff", fontSize: 14, fontWeight: 500, cursor: "pointer", width: "100%", fontFamily: "inherit" }}>
              <AppleIcon />Continue with Apple
            </button>
            <button style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, padding: "13px 16px", background: C.s1, border: `0.5px solid ${C.border1}`, borderRadius: 12, color: "#fff", fontSize: 14, fontWeight: 500, cursor: "pointer", width: "100%", fontFamily: "inherit" }}>
              <MicrosoftIcon />Continue with Microsoft
            </button>
            <div style={{ textAlign: "center", color: C.muted, fontSize: 13, margin: "4px 0" }}>OR</div>
            <button style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, padding: "13px 16px", background: C.s1, border: `0.5px solid ${C.border1}`, borderRadius: 12, color: "#fff", fontSize: 14, fontWeight: 500, cursor: "pointer", width: "100%", fontFamily: "inherit" }}>
              <MailIcon />Continue with Email
            </button>
          </div>

          <div style={{ textAlign: "center", marginTop: 24, fontSize: 12, color: C.muted }}>☁ SSO available on <span style={{ textDecoration: "underline", cursor: "pointer" }}>Scale and Enterprise plans</span></div>

          <div onClick={() => setPage("generate")} style={{ textAlign: "center", marginTop: 24, fontSize: 13, color: C.lime, cursor: "pointer" }}>← Back to NovaFrame</div>
        </div>
      </div>

      <div style={{ position: "relative", overflow: "hidden", backgroundImage: `url(${sc.img})`, backgroundSize: "cover", backgroundPosition: "center", display: "flex", flexDirection: "column", padding: 24 }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(7,9,13,0.3) 0%, rgba(7,9,13,0.9) 100%)" }} />
        <div style={{ flex: 1, display: "flex", alignItems: "flex-end", justifyContent: "center", position: "relative", zIndex: 2 }}>
          <div style={{ textAlign: "center", width: "100%", maxWidth: 380, paddingBottom: 30 }}>
            <div style={{ fontSize: 11, background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)", padding: "4px 14px", borderRadius: 20, display: "inline-block", marginBottom: 14, color: "#fff", fontWeight: 600 }}>{sc.tag}</div>
            <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: -1.5, marginBottom: 10, color: "#fff", textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>{sc.title}</div>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", lineHeight: 1.5, textShadow: "0 1px 10px rgba(0,0,0,0.5)" }}>{sc.sub}</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, position: "relative", zIndex: 2 }}>
          {tabs.map((t, i) => (
            <div key={t} onClick={() => setActiveTab(i)} style={{ flex: 1, textAlign: "center", fontSize: 10, fontWeight: 600, color: activeTab === i ? "#fff" : "rgba(255,255,255,0.5)", paddingBottom: 6, borderBottom: `2px solid ${activeTab === i ? "#fff" : "transparent"}`, cursor: "pointer" }}>{t}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [page, setPage] = useState("generate");

  const pages: any = {
    generate: <PageGenerate setPage={setPage} />,
    marketing: <PageMarketing />,
    influencer: <PageInfluencer />,
    canvas: <PageCanvas />,
    library: <PageLibrary setPage={setPage} />,
    login: <PageLogin setPage={setPage} />
  };

  return (
    <div style={{ background: C.bg0, minHeight: "100vh", color: "#fff", fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif" }}>
      <Navbar page={page} setPage={setPage} />
      <div style={{ display: "flex", gap: 2, padding: "6px 16px", borderBottom: `0.5px solid ${C.border0}`, background: C.bg1 }}>
        {[["generate", "🎬 Cinema"], ["marketing", "📢 Marketing"], ["influencer", "🤖 Influencer"], ["canvas", "🎨 Canvas"], ["library", "📁 Library"], ["login", "🔐 Login"]].map(([id, label]) => (
          <div key={id} onClick={() => setPage(id)} style={{ fontSize: 11, fontWeight: 600, padding: "5px 14px", borderRadius: 6, cursor: "pointer", background: page === id ? "rgba(255,255,255,0.08)" : "transparent", color: page === id ? "#fff" : C.muted }}>{label}</div>
        ))}
      </div>
      {pages[page]}
    </div>
  );
}