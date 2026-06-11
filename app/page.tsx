"use client";

import { useMemo, useState } from "react";

type Locale = "en" | "de" | "fr";

const copy = {
  en: {
    launch: "Launch studio",
    login: "Sign in",
    prompt: "A cinematic product reveal with controlled camera motion",
    generate: "Generate",
    checkout: "Checkout",
    credits: "Credits",
    heroTitle: "One creative command center for image, video, audio and ads.",
    heroText:
      "Lumenfield unifies premium AI models, guided studios, plugins, payments and a shared asset library in one production workspace.",
  },
  de: {
    launch: "Studio starten",
    login: "Anmelden",
    prompt: "Eine filmische Produktpraesentation mit kontrollierter Kamerabewegung",
    generate: "Generieren",
    checkout: "Zur Kasse",
    credits: "Credits",
    heroTitle: "Eine Kreativzentrale fuer Bild, Video, Audio und Werbung.",
    heroText:
      "Lumenfield verbindet Premium-KI-Modelle, gefuehrte Studios, Plugins, Zahlungen und eine gemeinsame Asset-Bibliothek.",
  },
  fr: {
    launch: "Ouvrir le studio",
    login: "Connexion",
    prompt: "Une revelation produit cinematographique avec mouvement camera controle",
    generate: "Generer",
    checkout: "Paiement",
    credits: "Credits",
    heroTitle: "Un centre creatif pour image, video, audio et publicite.",
    heroText:
      "Lumenfield rassemble modeles IA premium, studios guides, plugins, paiements et bibliotheque de contenus dans un espace de production.",
  },
} satisfies Record<Locale, Record<string, string>>;

const navigation = [
  "Explore",
  "Image",
  "Video",
  "Audio",
  "Supercomputer",
  "MCP & CLI",
  "Collab",
  "Plugins",
  "Marketing Studio",
  "Cinema Studio",
  "AI Influencer",
  "Canvas",
  "Apps",
];

const imageTools = [
  ["Create Image", "Generate AI images"],
  ["Cinematic Cameras", "Image generation with camera controls"],
  ["Moodboard", "Turn references into a focused board"],
  ["Soul ID Character", "Create reusable characters"],
  ["AI Influencer", "Create and manage virtual talent"],
  ["Photodump", "Generate aesthetic image sets"],
  ["Relight", "Control position, color and brightness"],
  ["Inpaint", "Select an area and describe the change"],
  ["Image Upscale", "Enhance image quality"],
  ["Face Swap", "Create realistic face swaps"],
  ["Character Swap", "Replace characters consistently"],
  ["Draw to Edit", "Turn sketch marks into edits"],
  ["Fashion Factory", "Create fashion sets"],
];

const videoTools = [
  ["Create Video", "Generate AI videos"],
  ["Cinema Studio", "Cinematic video with an AI director"],
  ["Mixed Media", "Combine image, video and references"],
  ["Edit Video", "Edit scenes, shots and elements"],
  ["Click to Ad", "Turn product URLs into video ads"],
  ["Sora 2 Trends", "Turn ideas into viral formats"],
  ["Lipsync Studio", "Create talking clips"],
  ["Draw to Video", "Sketch turns into cinema"],
  ["UGC Factory", "Build creator-style videos"],
  ["Video Upscale", "Enhance video quality"],
  ["Vibe Motion", "Professional motion graphics"],
  ["Recast Studio", "Swap characters in videos"],
];

const modelGroups = [
  {
    title: "Image models",
    items: ["GPT Image 2", "Recraft V4.1", "Nano Banana Pro", "Seedream 5.0", "FLUX.2", "Topaz"],
  },
  {
    title: "Video models",
    items: ["Seedance 2.0", "Kling 3.0", "Sora 2", "Google Veo 3.1", "Wan 2.7", "Minimax Hailuo"],
  },
  {
    title: "Audio models",
    items: ["ElevenLabs", "Voice Lab", "Music Studio", "Sound FX", "Lipsync", "Narration"],
  },
];

const appCategories = [
  "Professional",
  "Enhance & Style",
  "Face & Identity",
  "Video Editing",
  "Ads & Products",
  "Games & Characters",
  "Trending Templates",
];

const integrations = [
  "OpenAI",
  "Runway",
  "Kling",
  "Google Veo",
  "ElevenLabs",
  "Replicate",
  "fal.ai",
  "Stability",
  "Recraft",
  "DaVinci Resolve",
  "Premiere Pro",
  "After Effects",
];

export default function Home() {
  const [locale, setLocale] = useState<Locale>("en");
  const [activeNav, setActiveNav] = useState("Explore");
  const [activeCategory, setActiveCategory] = useState("Professional");
  const t = copy[locale];

  const activeTools = useMemo(() => {
    if (activeNav === "Video" || activeNav === "Cinema Studio") return videoTools;
    if (activeNav === "Apps") {
      return [
        ["Virality Predictor", "Score hooks before publishing"],
        ["Expand Image", "Extend any image beyond its edges"],
        ["Skin Enhancer", "Natural realistic skin texture"],
        ["Outfit Swap", "Try on any outfit"],
        ["Background Remover", "Clean alpha output"],
        ["Billboard Ad", "Turn a photo into a billboard takeover"],
      ];
    }
    return imageTools;
  }, [activeNav]);

  return (
    <main className="min-h-screen bg-[#09090b] text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#09090b]/92 backdrop-blur">
        <div className="mx-auto flex max-w-[1440px] items-center gap-4 px-4 py-3">
          <a className="flex shrink-0 items-center gap-3" href="#studio">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-[#f4f1e8] text-base font-black text-[#09090b]">
              LF
            </span>
            <span className="text-xl font-semibold tracking-tight">Lumenfield</span>
          </a>

          <nav className="hidden flex-1 items-center gap-1 overflow-x-auto lg:flex">
            {navigation.map((item) => (
              <button
                className={`nav-pill ${activeNav === item ? "nav-pill-active" : ""}`}
                key={item}
                onClick={() => setActiveNav(item)}
              >
                {item}
                {["Supercomputer", "MCP & CLI", "Plugins"].includes(item) ? (
                  <span className="ml-1 rounded bg-[#c9ff5d] px-1.5 py-0.5 text-[10px] font-bold text-[#10130b]">
                    New
                  </span>
                ) : null}
              </button>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <div className="language-switch" aria-label="Language selector">
              {(["en", "de", "fr"] as Locale[]).map((item) => (
                <button
                  className={locale === item ? "language-active" : ""}
                  key={item}
                  onClick={() => setLocale(item)}
                >
                  {item.toUpperCase()}
                </button>
              ))}
            </div>
            <a className="hidden rounded-md border border-white/15 px-3 py-2 text-sm text-white/80 sm:block" href="#auth">
              {t.login}
            </a>
            <a className="rounded-md bg-[#f4f1e8] px-4 py-2 text-sm font-semibold text-[#09090b]" href="#studio">
              {t.launch}
            </a>
          </div>
        </div>
      </header>

      <section className="surface-grid border-b border-white/10">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-4 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:py-14">
          <div className="flex min-h-[560px] flex-col justify-between">
            <div>
              <div className="mb-5 flex flex-wrap gap-2">
                {["Multi-model studio", "Stripe credits", "Google + SMS auth", "EN DE FR"].map((item) => (
                  <span className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 text-xs text-white/70" key={item}>
                    {item}
                  </span>
                ))}
              </div>
              <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight text-white md:text-7xl">
                {t.heroTitle}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">{t.heroText}</p>
            </div>

            <div className="mt-10 grid gap-3 md:grid-cols-3">
              {[
                ["1", "Brief", "Prompt, URL, image, video or product feed"],
                ["2", "Route", "Best model and workflow selected"],
                ["3", "Deliver", "Assets stored in Library with credits tracked"],
              ].map(([step, title, body]) => (
                <div className="metric-panel" key={title}>
                  <span>{step}</span>
                  <strong>{title}</strong>
                  <p>{body}</p>
                </div>
              ))}
            </div>
          </div>

          <section className="workbench" id="studio">
            <div className="workbench-head">
              <div>
                <p>Supercomputer</p>
                <h2>{activeNav}</h2>
              </div>
              <span>{t.credits}: 2,480</span>
            </div>
            <div className="prompt-box">
              <textarea defaultValue={t.prompt} />
              <div className="prompt-actions">
                <select aria-label="Model">
                  <option>Auto select model</option>
                  <option>GPT Image 2</option>
                  <option>Kling 3.0</option>
                  <option>Google Veo 3.1</option>
                  <option>ElevenLabs</option>
                </select>
                <button>{t.generate}</button>
              </div>
            </div>
            <div className="studio-grid">
              {activeTools.slice(0, 6).map(([name, desc]) => (
                <button className="tool-tile" key={name}>
                  <span />
                  <strong>{name}</strong>
                  <small>{desc}</small>
                </button>
              ))}
            </div>
            <div className="job-row">
              <div>
                <strong>Current job</strong>
                <p>Marketing Studio is preparing a 9:16 product ad and 4 stills.</p>
              </div>
              <span>68%</span>
            </div>
          </section>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-10">
        <div className="section-head">
          <div>
            <p>Explore</p>
            <h2>Production tools</h2>
          </div>
          <a href="#payments">Pricing and credits</a>
        </div>

        <div className="tool-columns">
          <div className="tool-column">
            <h3>Image</h3>
            {imageTools.map(([name, desc]) => (
              <button className="list-tool" key={name}>
                <strong>{name}</strong>
                <span>{desc}</span>
              </button>
            ))}
          </div>
          <div className="tool-column">
            <h3>Video</h3>
            {videoTools.map(([name, desc]) => (
              <button className="list-tool" key={name}>
                <strong>{name}</strong>
                <span>{desc}</span>
              </button>
            ))}
          </div>
          <div className="tool-column">
            <h3>Models</h3>
            {modelGroups.map((group) => (
              <div className="model-group" key={group.title}>
                <strong>{group.title}</strong>
                <div>
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025]">
        <div className="mx-auto max-w-[1440px] px-4 py-10">
          <div className="section-head">
            <div>
              <p>Apps</p>
              <h2>One-click workflows</h2>
            </div>
            <div className="category-row">
              {appCategories.map((category) => (
                <button
                  className={activeCategory === category ? "category-active" : ""}
                  key={category}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="app-grid">
            {[
              "Virality Predictor",
              "Similarity Score",
              "Expand Image",
              "Angles 2.0",
              "Relight",
              "Outfit Swap",
              "Video Background Remover",
              "Click to Ad",
            ].map((app, index) => (
              <article className="app-card" key={app}>
                <div className="app-preview">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div>
                  <p>{activeCategory}</p>
                  <h3>{app}</h3>
                  <button>Run</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1440px] gap-4 px-4 py-10 lg:grid-cols-[1fr_1fr]">
        <div className="system-panel" id="auth">
          <p>Access</p>
          <h2>Google sign-in, SMS OTP and secure checkout</h2>
          <div className="flow-list">
            {["Google OAuth or phone OTP", "Account and workspace created", "Stripe checkout opens", "Credits added by webhook"].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
        <div className="system-panel" id="payments">
          <p>Payments</p>
          <h2>Credit card plans for creators, teams and studios</h2>
          <div className="pricing-row">
            {["Starter 1,000", "Pro 5,000", "Studio 25,000"].map((plan) => (
              <button key={plan}>{plan}</button>
            ))}
          </div>
          <a className="checkout-link" href="#studio">
            {t.checkout}
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 pb-12">
        <div className="section-head">
          <div>
            <p>Integrations</p>
            <h2>Provider and plugin layer</h2>
          </div>
        </div>
        <div className="integration-grid">
          {integrations.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 px-4 py-6 text-center text-sm text-white/45">
        Lumenfield AI Studio. Original platform architecture inspired by modern creative AI workflows.
      </footer>
    </main>
  );
}
