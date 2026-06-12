"use client";

import { useState } from "react";

type PageId =
  | "explore"
  | "assets"
  | "image"
  | "video"
  | "audio"
  | "supercomputer"
  | "mcp"
  | "collab"
  | "plugins"
  | "marketing"
  | "cinema"
  | "influencer"
  | "canvas"
  | "apps"
  | "library"
  | "pricing";

type Badge = "NEW" | "TOP" | "EXCLUSIVE" | "TRENDING" | "PRO";

type Item = {
  badge?: Badge;
  category?: string;
  desc: string;
  icon: string;
  id?: string;
  title: string;
};

type DetailPage = {
  category: string;
  desc: string;
  icon: string;
  title: string;
};

const navItems: { id: PageId; label: string; badge?: Badge }[] = [
  { id: "explore", label: "Explore" },
  { id: "image", label: "Image" },
  { id: "video", label: "Video" },
  { id: "audio", label: "Audio" },
  { id: "supercomputer", label: "Supercomputer", badge: "NEW" },
  { id: "mcp", label: "MCP & CLI", badge: "NEW" },
  { id: "collab", label: "Collab" },
  { id: "plugins", label: "Plugins", badge: "NEW" },
  { id: "marketing", label: "Marketing Studio" },
  { id: "cinema", label: "Cinema Studio" },
  { id: "influencer", label: "AI Influencer" },
  { id: "canvas", label: "Canvas" },
  { id: "apps", label: "Apps" },
];

const futureApiRoutes = [
  "/api/image",
  "/api/video",
  "/api/audio",
  "/api/marketing",
  "/api/influencer",
  "/api/stripe",
  "/api/user/credits",
] as const;

const futureEnvVars = [
  "OPENAI_API_KEY",
  "REPLICATE_API_TOKEN",
  "FAL_KEY",
  "ELEVENLABS_API_KEY",
  "RUNWAY_API_KEY",
  "KLING_API_KEY",
  "STRIPE_SECRET_KEY",
  "NEXT_PUBLIC_SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
] as const;

const futureTables = [
  "users",
  "projects",
  "generations",
  "assets",
  "credits",
  "payments",
  "subscriptions",
  "teams",
  "api_keys",
] as const;

const imageFeatures: Item[] = [
  { icon: "□", title: "Create Image", desc: "Generate AI images" },
  { badge: "TOP", icon: "▣", title: "Cinematic Cameras", desc: "Image generation with camera controls" },
  { badge: "NEW", icon: "⌘", title: "Canvas", desc: "Visual ideation meets repeatable AI workflows." },
  { icon: "〰", title: "Moodboard", desc: "Turn your references into a focused moodboard" },
  { icon: "◌", title: "Soul ID Character", desc: "Create unique character" },
  { icon: "✦", title: "AI Influencer", desc: "Create and manage your AI influencer" },
  { badge: "NEW", icon: "▧", title: "Photodump", desc: "Generate your aesthetic" },
  { icon: "☼", title: "Relight", desc: "Adjust lighting position, color, and brightness" },
  { icon: "✐", title: "Inpaint", desc: "Select an area, describe the change" },
  { icon: "↗", title: "Image Upscale", desc: "Enhance image quality" },
  { icon: "▢", title: "Face Swap", desc: "Create realistic face swaps" },
  { icon: "◇", title: "Character Swap", desc: "Create realistic character swaps" },
  { icon: "✎", title: "Draw To Edit", desc: "From sketch to picture" },
  { icon: "▤", title: "Fashion Factory", desc: "Create fashion sets" },
];

const imageModels: Item[] = [
  { badge: "TOP", icon: "N", title: "Nova Soul 2.0", desc: "Next generation ultra-realistic fashion visuals" },
  { icon: "N", title: "Nova Soul Cinema", desc: "Cinematic film-grade aesthetic" },
  { icon: "▱", title: "Nova Popcorn", desc: "Storyboard, edit, create" },
  { badge: "NEW", icon: "G", title: "GPT Image 2", desc: "4K images with near-perfect text rendering" },
  { badge: "NEW", icon: "R", title: "Recraft V4.1", desc: "Photorealistic and expressive image generation" },
  { icon: "B", title: "Nano Banana 2", desc: "Pro quality at Flash speed" },
  { badge: "TOP", icon: "B", title: "Nano Banana Pro", desc: "Best 4K image model ever" },
  { icon: "S", title: "Seedream 5.0 Lite", desc: "Intelligent visual reasoning" },
  { icon: "G", title: "GPT Image 1.5", desc: "True-color precision rendering" },
  { icon: "X", title: "Grok Imagine", desc: "Versatile image styles by xAI" },
  { icon: "F", title: "Flux 2", desc: "Speed-optimized detail" },
  { icon: "V", title: "Reve", desc: "Advanced image editing model" },
  { icon: "Z", title: "Z-Image", desc: "Instant lifelike portraits" },
  { icon: "T", title: "Topaz", desc: "High-resolution upscaler" },
];

const videoFeatures: Item[] = [
  { icon: "▭", title: "Create Video", desc: "Generate AI videos" },
  { badge: "TOP", icon: "▥", title: "Cinema Studio", desc: "Cinematic video with AI director" },
  { badge: "NEW", icon: "⌘", title: "Canvas", desc: "Visual ideation meets repeatable AI workflows." },
  { icon: "▧", title: "Mixed Media", desc: "Create mixed media projects" },
  { icon: "▹", title: "Edit Video", desc: "Edit scenes, shots, elements" },
  { icon: "△", title: "Click To Ad", desc: "Turn product URLs into video ads" },
  { icon: "◎", title: "Trends Studio", desc: "Turn ideas into viral videos" },
  { icon: "◉", title: "Lipsync Studio", desc: "Create talking clips" },
  { icon: "✎", title: "Draw To Video", desc: "Sketch turns into a cinema" },
  { icon: "〽", title: "Sketch To Video", desc: "From sketch to video with Sora 2" },
  { icon: "▣", title: "UGC Factory", desc: "Build UGC video with avatar" },
  { icon: "↗", title: "Video Upscale", desc: "Enhance video quality" },
  { icon: "✶", title: "Animate", desc: "Video smart replacement" },
  { icon: "▭", title: "Vibe Motion", desc: "Create professional motion graphics" },
  { icon: "♧", title: "Recast Studio", desc: "Swap characters in videos" },
];

const videoModels: Item[] = [
  { badge: "TOP", icon: "▥", title: "Seedance 2.0", desc: "Most advanced video model" },
  { badge: "TOP", icon: "○", title: "Kling 3.0", desc: "Cinematic videos with audio" },
  { icon: "○", title: "Kling Motion Control", desc: "Transfer motion from video to image" },
  { icon: "○", title: "Kling O1 Edit", desc: "Advanced video editing" },
  { icon: "S", title: "Sora 2", desc: "OpenAI's most advanced video model" },
  { icon: "G", title: "Google Veo 3.1 Lite", desc: "Fast video generation by Google" },
  { icon: "G", title: "Google Veo 3.1", desc: "Advanced AI video with sound" },
  { icon: "H", title: "HappyHorse", desc: "Fast ranked video and audio model" },
  { badge: "NEW", icon: "X", title: "Grok Imagine Video", desc: "Cinematic videos with synchronized audio" },
  { icon: "W", title: "Wan 2.7", desc: "AI video generation with first and end frame control" },
  { icon: "M", title: "Minimax Hailuo 2.3", desc: "Fastest high-dynamic video" },
  { icon: "▥", title: "Seedance 1.5 Pro", desc: "Pro-grade audio-visual sync" },
  { icon: "N", title: "Nova DOP", desc: "VFX and camera control" },
];

const apps = [
  ["Professional", "Virality Predictor", "Forecast social performance before launch.", "PRO"],
  ["Professional", "Similarity Score", "Compare visual references against generations.", "NEW"],
  ["Professional", "Expand Image", "Extend frames beyond their original boundary.", "TRENDING"],
  ["Professional", "Angles 2.0", "Generate alternate camera angles.", "NEW"],
  ["Professional", "Shots", "Build a complete shot deck from one idea.", "PRO"],
  ["Enhance & Style", "Skin Enhancer", "Refine portraits with natural texture.", "PRO"],
  ["Enhance & Style", "AI Stylist", "Create looks, outfits, and editorial direction.", "TRENDING"],
  ["Enhance & Style", "Relight", "Move and recolor lighting for any scene.", "NEW"],
  ["Enhance & Style", "Outfit Swap", "Change wardrobe while preserving identity.", "PRO"],
  ["Enhance & Style", "Style Snap", "Capture and reuse a visual style.", "NEW"],
  ["Face & Identity", "Face Swap", "Create realistic identity-safe swaps.", "PRO"],
  ["Face & Identity", "Headshot Generator", "Produce professional headshots.", "TRENDING"],
  ["Face & Identity", "Character Swap 2.0", "Replace characters across shots.", "NEW"],
  ["Face & Identity", "Recast", "Rebuild scenes with a new performer.", "PRO"],
  ["Face & Identity", "Video Face Swap", "Apply identity transfer to clips.", "PRO"],
  ["Video Editing", "ClipCut", "Cut long clips into social-ready edits.", "NEW"],
  ["Video Editing", "Urban Cuts", "Fast street-style transitions.", "TRENDING"],
  ["Video Editing", "Video Background Remover", "Remove video backgrounds.", "PRO"],
  ["Video Editing", "Breakdown", "Analyze scenes into editable beats.", "NEW"],
  ["Video Editing", "Japanese Show", "Stylized show template generation.", "TRENDING"],
  ["Ads & Products", "Click to Ad", "Turn a URL into an ad package.", "TRENDING"],
  ["Ads & Products", "Billboard Ad", "Place products into outdoor media.", "NEW"],
  ["Ads & Products", "Bullet Time Scene", "Create rotating hero shots.", "PRO"],
  ["Ads & Products", "Truck Ad", "Turn products into mobile campaigns.", "NEW"],
  ["Ads & Products", "Bullet Time White", "Clean studio product motion.", "PRO"],
  ["Games & Characters", "Game Dump", "Generate game worlds and assets.", "NEW"],
  ["Games & Characters", "Nano Strike", "Build fast action game concepts.", "TRENDING"],
  ["Games & Characters", "Nano Theft", "Create open-world mockups.", "PRO"],
  ["Games & Characters", "Simlife", "Prototype simulation worlds.", "NEW"],
  ["Games & Characters", "Plushies", "Turn characters into plush concepts.", "TRENDING"],
  ["Extras", "AI Meme Generator", "Make responsive meme formats.", "TRENDING"],
  ["Extras", "Background Remover", "Clean cutouts for commerce.", "NEW"],
  ["Extras", "Micro-Beasts", "Generate tiny fantasy creatures.", "PRO"],
  ["Extras", "Signboard", "Create realistic signs and posters.", "NEW"],
  ["Extras", "Paint App", "Sketch, fill, and iterate.", "PRO"],
] as const;

const appCategories = [
  "All",
  "Professional",
  "Enhance & Style",
  "Face & Identity",
  "Video Editing",
  "Ads & Products",
  "Games & Characters",
  "Extras",
  "Trending Templates",
];

const connectorSections = [
  {
    title: "Featured Connectors",
    items: ["ChatGPT", "Claude", "Gemini", "Cursor", "VS Code Agent", "OpenCode", "DeepSeek", "Grok"],
  },
  {
    title: "Creative Connectors",
    items: ["Adobe Premiere Pro", "Adobe After Effects", "DaVinci Resolve", "Figma", "Canva", "Photoshop"],
  },
  {
    title: "Productivity Connectors",
    items: ["Google Drive", "Gmail", "Notion", "Slack", "Dropbox", "Google Calendar"],
  },
  {
    title: "Marketing Connectors",
    items: ["Meta Ads", "TikTok Ads", "Google Ads", "Shopify", "WooCommerce", "Klaviyo"],
  },
  {
    title: "Developer Connectors",
    items: ["GitHub", "GitLab", "Vercel", "Supabase", "Cloudflare", "Docker"],
  },
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function NovaFrameAI() {
  const [activePage, setActivePage] = useState<PageId>("explore");
  const [activeMega, setActiveMega] = useState<"image" | "video" | null>(null);
  const [detail, setDetail] = useState<DetailPage | null>(null);
  const [userOpen, setUserOpen] = useState(false);
  const [loadingKey, setLoadingKey] = useState<string | null>(null);
  const [generated, setGenerated] = useState<string[]>([]);

  const openPage = (page: PageId) => {
    setDetail(null);
    setActivePage(page);
    setActiveMega(page === "image" || page === "video" ? page : null);
  };

  const openDetail = (item: Item, category: string) => {
    setDetail({ category, desc: item.desc, icon: item.icon, title: item.title });
    setActiveMega(null);
    if (typeof window !== "undefined") {
      const base = category.toLowerCase().includes("video") ? "video" : category.toLowerCase().includes("image") ? "image" : "tool";
      window.history.replaceState(null, "", `#/${base}/${slugify(item.title)}`);
    }
  };

  const simulateGenerate = (key: string, label = "NovaFrame generation") => {
    setLoadingKey(key);
    window.setTimeout(() => {
      setGenerated((prev) => [`${label} ready ${prev.length + 1}`, ...prev].slice(0, 6));
      setLoadingKey(null);
    }, 850);
  };

  return (
    <main className="nf-shell">
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <TopNav
        activeMega={activeMega}
        activePage={activePage}
        onAssets={() => openPage("assets")}
        onLogo={() => openPage("explore")}
        onOpenPage={openPage}
        onToggleMega={(next) => setActiveMega((current) => (current === next ? null : next))}
        onToggleUser={() => setUserOpen((open) => !open)}
        userOpen={userOpen}
      />
      {activeMega ? (
        <MegaMenu
          kind={activeMega}
          onDetail={openDetail}
          onOpenPage={openPage}
          onClose={() => setActiveMega(null)}
        />
      ) : null}
      {userOpen ? <AccountMenu onOpenPage={openPage} /> : null}
      <section className="nf-page">
        {detail ? (
          <DetailScreen detail={detail} loadingKey={loadingKey} onGenerate={simulateGenerate} results={generated} />
        ) : (
          <PageRouter
            activePage={activePage}
            loadingKey={loadingKey}
            onDetail={openDetail}
            onGenerate={simulateGenerate}
            onOpenPage={openPage}
            results={generated}
          />
        )}
      </section>
    </main>
  );
}

function TopNav({
  activeMega,
  activePage,
  onAssets,
  onLogo,
  onOpenPage,
  onToggleMega,
  onToggleUser,
  userOpen,
}: {
  activeMega: "image" | "video" | null;
  activePage: PageId;
  onAssets: () => void;
  onLogo: () => void;
  onOpenPage: (page: PageId) => void;
  onToggleMega: (page: "image" | "video") => void;
  onToggleUser: () => void;
  userOpen: boolean;
}) {
  return (
    <header className="topbar">
      <button className="brand" onClick={onLogo} type="button">
        <span className="brand-mark">N</span>
        <span>NovaFrame AI</span>
      </button>
      <nav className="nav-scroll">
        {navItems.map((item) => {
          const active = activePage === item.id || activeMega === item.id;
          return (
            <button
              className={`nav-item ${active ? "active" : ""}`}
              key={item.id}
              onClick={() => {
                if (item.id === "image" || item.id === "video") {
                  onToggleMega(item.id);
                  return;
                }
                onOpenPage(item.id);
              }}
              type="button"
            >
              <span>{item.label}</span>
              {item.badge ? <span className={`badge ${item.badge.toLowerCase()}`}>{item.badge}</span> : null}
            </button>
          );
        })}
      </nav>
      <div className="top-actions">
        <button className="search-pill" onClick={() => onOpenPage("assets")} type="button">
          <span>⌕</span>
          <span>Search</span>
          <kbd>Ctrl K</kbd>
        </button>
        <button className="upgrade" onClick={() => onOpenPage("pricing")} type="button">
          Upgrade <span>30% OFF</span>
        </button>
        <button className="asset-btn" onClick={onAssets} type="button">
          ▰ Assets
        </button>
        <button className="ghost-btn" onClick={() => onOpenPage("library")} type="button">
          Library
        </button>
        <button className="login-btn" onClick={() => onOpenPage("pricing")} type="button">
          Sign up
        </button>
        <button className={`avatar ${userOpen ? "open" : ""}`} onClick={onToggleUser} type="button">
          A
        </button>
      </div>
    </header>
  );
}

function MegaMenu({
  kind,
  onClose,
  onDetail,
  onOpenPage,
}: {
  kind: "image" | "video";
  onClose: () => void;
  onDetail: (item: Item, category: string) => void;
  onOpenPage: (page: PageId) => void;
}) {
  const features = kind === "image" ? imageFeatures : videoFeatures;
  const models = kind === "image" ? imageModels : videoModels;
  return (
    <section className="mega-wrap">
      <div className="mega-panel">
        <div className="mega-head">
          <span>{kind === "image" ? "Image Studio" : "Video Studio"}</span>
          <button onClick={onClose} type="button">Close</button>
        </div>
        <div className="mega-cols">
          <div>
            <p className="tiny">Features</p>
            {features.map((item) => (
              <MegaRow
                item={item}
                key={item.title}
                onClick={() => {
                  onDetail(item, `${kind} tool`);
                  onOpenPage(kind);
                }}
              />
            ))}
          </div>
          <div>
            <p className="tiny">Models</p>
            {models.map((item) => (
              <MegaRow item={item} key={item.title} onClick={() => onDetail(item, `${kind} model`)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MegaRow({ item, onClick }: { item: Item; onClick: () => void }) {
  return (
    <button className="mega-row" onClick={onClick} type="button">
      <span className="iconbox">{item.icon}</span>
      <span>
        <strong>{item.title}</strong>
        <small>{item.desc}</small>
      </span>
      {item.badge ? <em className={`badge ${item.badge.toLowerCase()}`}>{item.badge}</em> : null}
    </button>
  );
}

function PageRouter({
  activePage,
  loadingKey,
  onDetail,
  onGenerate,
  onOpenPage,
  results,
}: {
  activePage: PageId;
  loadingKey: string | null;
  onDetail: (item: Item, category: string) => void;
  onGenerate: (key: string, label?: string) => void;
  onOpenPage: (page: PageId) => void;
  results: string[];
}) {
  switch (activePage) {
    case "assets":
      return <AssetsHub onDetail={onDetail} onOpenPage={onOpenPage} />;
    case "image":
      return <StudioPage kind="image" items={imageFeatures} models={imageModels} onDetail={onDetail} onGenerate={onGenerate} />;
    case "video":
      return <StudioPage kind="video" items={videoFeatures} models={videoModels} onDetail={onDetail} onGenerate={onGenerate} />;
    case "audio":
      return <AudioStudio loadingKey={loadingKey} onDetail={onDetail} onGenerate={onGenerate} results={results} />;
    case "supercomputer":
      return <SupercomputerPage loadingKey={loadingKey} onGenerate={onGenerate} />;
    case "mcp":
      return <McpCliPage onDetail={onDetail} />;
    case "collab":
      return <CollabPage />;
    case "plugins":
      return <PluginsPage loadingKey={loadingKey} onGenerate={onGenerate} />;
    case "marketing":
      return <MarketingStudio loadingKey={loadingKey} onGenerate={onGenerate} results={results} />;
    case "cinema":
      return <CinemaStudio loadingKey={loadingKey} onGenerate={onGenerate} results={results} />;
    case "influencer":
      return <InfluencerStudio loadingKey={loadingKey} onGenerate={onGenerate} results={results} />;
    case "canvas":
      return <CanvasPage />;
    case "apps":
      return <AppsPage onDetail={onDetail} />;
    case "library":
      return <LibraryPage onOpenPage={onOpenPage} />;
    case "pricing":
      return <PricingPage />;
    case "explore":
    default:
      return <ExploreHub onDetail={onDetail} onOpenPage={onOpenPage} />;
  }
}

function ExploreHub({
  onDetail,
  onOpenPage,
}: {
  onDetail: (item: Item, category: string) => void;
  onOpenPage: (page: PageId) => void;
}) {
  const productCards: Item[] = [
    { badge: "NEW", icon: "G", title: "Nano Banana Pro", desc: "Generate high quality visuals", category: "Image" },
    { icon: "▥", title: "Seedance 2.0", desc: "Create videos in seconds", category: "Video" },
    { badge: "TRENDING", icon: "▱", title: "Marketing Studio", desc: "Launch campaigns from one prompt" },
    { badge: "NEW", icon: "✳", title: "MCP & CLI", desc: "Turn AI into a creative engine" },
    { badge: "NEW", icon: "⌘", title: "NovaFrame Canvas", desc: "Generate media on one canvas" },
    { icon: "▥", title: "Cinema Studio 3.5", desc: "Create cinematic scenes" },
  ];
  return (
    <div className="hub page-pad fade-in">
      <section className="featured-strip">
        {[
          ["NovaFrame Games", "Build interactive AI games using NovaFrame MCP.", "hero-game"],
          ["NovaFrame Plugin for DaVinci Resolve", "Generate footage directly inside DaVinci Resolve.", "hero-white"],
          ["Introducing Recraft 4.1", "Crisp vectors and total style control.", "hero-art"],
          ["NovaFrame Mod", "Create worlds directly from prompts.", "hero-minecraft"],
        ].map(([title, desc, tone]) => (
          <button className={`feature-card ${tone}`} key={title} onClick={() => onOpenPage(title.includes("Plugin") ? "plugins" : "apps")} type="button">
            <div className="mock-media" />
            <strong>{title}</strong>
            <span>{desc}</span>
          </button>
        ))}
      </section>
      <section className="product-layout">
        <button className="super-card" onClick={() => onOpenPage("supercomputer")} type="button">
          <span className="badge new">NEW</span>
          <h2>SUPERCOMPUTER</h2>
          <p>Agents, automation, skills, connectors and AI workflows.</p>
          <span className="white-cta">Try now ↗</span>
          <div className="floating-stickers">
            <i>N</i><i>AI</i><i>CLI</i>
          </div>
        </button>
        <div className="mini-products">
          {productCards.map((item) => (
            <button className="product-tile" key={item.title} onClick={() => onDetail(item, item.category || "Product")} type="button">
              <span className="iconbox">{item.icon}</span>
              {item.badge ? <em className={`badge ${item.badge.toLowerCase()}`}>{item.badge}</em> : null}
              <strong>{item.title}</strong>
              <small>{item.desc}</small>
            </button>
          ))}
        </div>
      </section>
      <GamesBanner />
      <ToolGrid />
      <LatestModels onDetail={onDetail} />
    </div>
  );
}

function AssetsHub({
  onDetail,
  onOpenPage,
}: {
  onDetail: (item: Item, category: string) => void;
  onOpenPage: (page: PageId) => void;
}) {
  const [filter, setFilter] = useState("All");
  const products: Item[] = [
    { badge: "NEW", icon: "▣", title: "Supercomputer", desc: "AI workflows that think and act" },
    { badge: "NEW", icon: "</>", title: "Nova CLI", desc: "Automate creative production" },
    { badge: "TRENDING", icon: "▱", title: "Marketing Studio", desc: "Turn any product into a high-converting ad" },
  ];
  const left: Item[] = [
    { badge: "NEW", icon: "</>", title: "Nova CLI", desc: "Automate your production" },
    { badge: "TRENDING", icon: "✦", title: "AI Influencer", desc: "Create and manage your AI influencer" },
    { icon: "✣", title: "Marketing Studio", desc: "Turn any product into a video ad" },
  ];
  const right: Item[] = [
    { badge: "EXCLUSIVE", icon: "○", title: "Kling 3.0", desc: "Cinematic videos with audio" },
    { icon: "▥", title: "Cinema Studio", desc: "Camera-first AI filmmaking" },
    { icon: "⌘", title: "Canvas", desc: "Full workflow on one canvas" },
  ];
  return (
    <div className="assets-hub fade-in">
      <div className="assets-panel">
        <div className="search-xl">⌕ <span>Search models, tools, characters, workflows...</span></div>
        <div className="filter-row">
          {["All", "Models", "Products", "Characters", "Community", "Apps", "Originals"].map((tab) => (
            <button className={filter === tab ? "active" : ""} key={tab} onClick={() => setFilter(tab)} type="button">
              {tab} {tab === "Apps" || tab === "Originals" ? "↗" : ""}
            </button>
          ))}
        </div>
        <p className="tiny">Recents</p>
        <button className="recent-row" onClick={() => onDetail({ icon: "N", title: "NovaFrame Soul", desc: "Ultra-realistic character generation and consistency" }, "Model")} type="button">
          <span className="iconbox">N</span>
          <span><strong>NovaFrame Soul</strong><small>Ultra-realistic character generation and consistency</small></span>
        </button>
        <div className="section-head"><p>Popular products</p><button onClick={() => onOpenPage("apps")} type="button">See all</button></div>
        <div className="asset-products">
          {products.map((item) => (
            <button className="asset-product" key={item.title} onClick={() => onDetail(item, "Product")} type="button">
              <span className="asset-kind">{item.icon} Product</span>
              {item.badge ? <em className={`badge ${item.badge.toLowerCase()}`}>{item.badge}</em> : null}
              <strong>{item.title} ↗</strong>
              <small>{item.desc}</small>
            </button>
          ))}
        </div>
        <p className="tiny">Trending</p>
        <div className="trending-cols">
          {[left, right].map((col, index) => (
            <div key={index}>
              {col.map((item) => (
                <button className="trend-row" key={item.title} onClick={() => onDetail(item, "Trending")} type="button">
                  <span className="iconbox">{item.icon}</span>
                  <span><strong>{item.title}</strong><small>{item.desc}</small></span>
                  {item.badge ? <em className={`badge ${item.badge.toLowerCase()}`}>{item.badge}</em> : null}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StudioPage({
  items,
  kind,
  models,
  onDetail,
  onGenerate,
}: {
  items: Item[];
  kind: "image" | "video";
  models: Item[];
  onDetail: (item: Item, category: string) => void;
  onGenerate: (key: string, label?: string) => void;
}) {
  const advanced =
    kind === "image"
      ? ["Aspect Ratio", "Resolution", "Seed", "CFG", "Steps", "Negative Prompt", "Reference Strength", "Style Strength"]
      : ["Prompt to Video", "Image to Video", "First Frame", "End Frame", "Motion Control", "Camera Control", "Style Control", "Social export formats"];
  return (
    <div className="studio-grid page-pad fade-in">
      <section className="studio-builder glass">
        <p className="eyebrow">{kind === "image" ? "Image Studio" : "Video Studio"}</p>
        <h1>{kind === "image" ? "Generate production-ready images." : "Direct cinematic video scenes."}</h1>
        <textarea placeholder={kind === "image" ? "Describe a luxury product campaign with controlled lighting" : "Describe your scene, motion, camera and atmosphere"} />
        <div className="settings-grid">
          {advanced.map((setting) => (
            <button key={setting} type="button">{setting}</button>
          ))}
        </div>
        <button className="lime-action" onClick={() => onGenerate(kind, `${kind} result`)} type="button">
          Generate {kind === "image" ? "Image" : "Video"}
        </button>
      </section>
      <section className="mega-inline glass">
        <div>
          <p className="tiny">Features</p>
          {items.map((item) => <MegaRow item={item} key={item.title} onClick={() => onDetail(item, `${kind} tool`)} />)}
        </div>
        <div>
          <p className="tiny">Models</p>
          {models.map((item) => <MegaRow item={item} key={item.title} onClick={() => onDetail(item, `${kind} model`)} />)}
        </div>
      </section>
    </div>
  );
}

function AudioStudio({
  loadingKey,
  onDetail,
  onGenerate,
  results,
}: {
  loadingKey: string | null;
  onDetail: (item: Item, category: string) => void;
  onGenerate: (key: string, label?: string) => void;
  results: string[];
}) {
  const [selected, setSelected] = useState("Eleven v3");
  const models: Item[] = [
    { icon: "Ⅱ", title: "Eleven v3", desc: "Expressive AI voice with emotion control" },
    { icon: "≋", title: "MiniMax Speech 2.8 HD", desc: "Studio-quality text-to-speech" },
    { icon: "▥", title: "Seed Speech", desc: "ByteDance multilingual text-to-speech" },
    { icon: "∨", title: "VibeVoice", desc: "Long-form expressive voice synthesis" },
  ];
  return (
    <div className="audio-page fade-in">
      <StudioSidebar title="Audio Studio" />
      <section className="audio-stage">
        <div className="audio-glow" />
        <div className="equalizer">{Array.from({ length: 42 }).map((_, i) => <span key={i} style={{ height: `${22 + (i % 9) * 13}px` }} />)}</div>
        <div className="audio-title">
          <p>AUDIO</p>
          <h1>Ready to give your<br />scene a voice?</h1>
        </div>
        <div className="audio-console">
          <div className="audio-dial">
            <strong>Voiceover</strong>
            <span>Change Voice</span>
            <span>Translate</span>
          </div>
          <div className="voice-list">
            {models.map((model) => (
              <button
                className={selected === model.title ? "selected" : ""}
                key={model.title}
                onClick={() => {
                  setSelected(model.title);
                  onDetail(model, "Audio model");
                }}
                type="button"
              >
                <span className="iconbox">{model.icon}</span>
                <span><strong>{model.title}</strong><small>{model.desc}</small></span>
                {selected === model.title ? <em>✓</em> : null}
              </button>
            ))}
            <div className="selected-chip">Ⅱ {selected}</div>
          </div>
          <div className="wave-card">
            <strong>CHOOSE VOICE</strong>
            <div className="wave-bars">{Array.from({ length: 24 }).map((_, i) => <span key={i} style={{ height: `${8 + (i % 6) * 5}px` }} />)}</div>
          </div>
          <button className="generate-square" onClick={() => onGenerate("audio", "Audio voiceover")} type="button">
            {loadingKey === "audio" ? "LOADING" : "GENERATE"} ✦
          </button>
        </div>
        {results.length ? <ResultDock results={results} /> : null}
      </section>
    </div>
  );
}

function SupercomputerPage({
  loadingKey,
  onGenerate,
}: {
  loadingKey: string | null;
  onGenerate: (key: string, label?: string) => void;
}) {
  const tools = [
    "Video Ads",
    "Product Photography",
    "UGC Videos",
    "AI Influencers",
    "Fashion Campaigns",
    "Voice Generation",
    "Storyboards",
    "Marketing Automation",
    "Image Generation",
    "Video Generation",
    "Personal Clipper",
    "UGC Tutorial",
    "Animated Infographics",
    "Virtual Try-On",
    "TV Commercial",
    "Amazon Listing Design",
    "Podcast Video",
    "Premium Motion Design",
    "Kinetic Typography",
    "Product Animation",
    "UGC Try-On",
    "Motion Design",
    "Cartoon Animation",
  ];
  return (
    <div className="super-page fade-in">
      <aside className="super-sidebar">
        <button className="side-brand" type="button"><span>N</span> Supercomputer⌄</button>
        <button type="button">＋ New task</button>
        <button type="button">⌕ Search</button>
        <button type="button">▦ Marketplace <em className="badge new">NEW</em></button>
        <p>Tasks⌄</p>
        <div className="empty-task"><b>＋</b><strong>No tasks yet</strong><small>Create one to get started</small></div>
        <div className="side-bottom">
          <button type="button">◆ Pricing <em>30% OFF</em></button>
          <button type="button">↪ Log in</button>
        </div>
      </aside>
      <section className="super-main">
        <button className="shortcuts" type="button">⌘ Shortcuts</button>
        <div className="super-hero">
          <div className="super-icon">N</div>
          <h1>SUPERCOMPUTER FOR CREATIVE WORK</h1>
          <p>Turn a simple chat into production-ready content at scale.</p>
          <div className="prompt-bar">
            <textarea placeholder="Make a talking head video from" />
            <div>
              <button type="button">＋</button>
              <button type="button">G Google Gemini 3.5 Flash⌄</button>
              <button type="button">Ask⌄</button>
              <button className="round-submit" onClick={() => onGenerate("super", "Supercomputer task")} type="button">
                {loadingKey === "super" ? "…" : "↑"}
              </button>
            </div>
          </div>
        </div>
        <div className="section-head wide">
          <div><h2>What can the Supercomputer do?</h2><p>Videos, ads, product shots, avatars, music videos, and more</p></div>
          <button type="button">Browse more</button>
        </div>
        <div className="tool-card-grid">
          {tools.map((tool, index) => (
            <article className="tool-card" key={tool}>
              <span className="thumb-grad">{index + 1}</span>
              <h3>{tool}</h3>
              <p>{tool} workflows with prompt planning, asset generation, and delivery presets.</p>
              <button type="button">Try</button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function CinemaStudio({
  loadingKey,
  onGenerate,
  results,
}: {
  loadingKey: string | null;
  onGenerate: (key: string, label?: string) => void;
  results: string[];
}) {
  const [dropdown, setDropdown] = useState(true);
  const [selected, setSelected] = useState("Cinema Studio 3.5");
  const cinematic = [
    ["Cinema Studio 3.5", "Camera selection, style presets, and AI director", "NEW"],
    ["Cinema Studio 3.0", "Enhanced camera and speed ramp control", ""],
    ["Cinema Studio 2.5", "Camera movements with start frame", ""],
  ] as const;
  const featured = [
    ["Seedance 2.0", "720p", "4s-15s", "NEW"],
    ["Seedance 2.0 Fast", "720p", "4s-15s", "NEW"],
    ["Kling 3.0", "4K", "3s-15s", "EXCLUSIVE"],
    ["Kling 3.0 Motion Control", "1080p", "3s-30s", ""],
    ["HappyHorse", "1080p", "3s-15s", "NEW"],
  ] as const;
  return (
    <div className="cinema-page fade-in">
      <StudioSidebar title="Cinema Studio" />
      <section className="cinema-stage">
        <div className="preview-stack"><i /><i /><i /></div>
        <h1>CREATE YOUR FIRST PROJECT.<br /><span>GENERATE THE IMPOSSIBLE.</span></h1>
        {dropdown ? (
          <div className="model-dropdown">
            <div className="search-xl compact">⌕ <span>Search...</span></div>
            <p className="tiny">✦ Cinematic models</p>
            {cinematic.map(([title, desc, badge]) => (
              <button key={title} onClick={() => { setSelected(title); setDropdown(false); }} type="button">
                <span className="iconbox">N</span><span><strong>{title}</strong><small>{desc}</small></span>
                {badge ? <em className="badge new">{badge}</em> : null}
                {selected === title ? <b>✓</b> : null}
              </button>
            ))}
            <p className="tiny">✦ Featured models</p>
            {featured.map(([title, quality, seconds, badge]) => (
              <button key={title} onClick={() => { setSelected(title); setDropdown(false); }} type="button">
                <span className="iconbox">▥</span><span><strong>{title}</strong><small>◇ {quality} &nbsp; ◷ {seconds}</small></span>
                {badge ? <em className={`badge ${badge.toLowerCase()}`}>{badge}</em> : null}
              </button>
            ))}
          </div>
        ) : null}
        <div className="cinema-controls">
          <button type="button">Director</button>
          <div className="motion-graph"><span /><span /><span /><span /></div>
          <button type="button">Speed ramp<br /><strong>Auto</strong></button>
          <button type="button">Duration<br /><strong>4s</strong></button>
        </div>
        <div className="composer">
          <div className="toggle-stack"><button type="button">Image</button><button className="active" type="button">Video</button></div>
          <textarea placeholder="Describe your scene - use @ to add characters & locations" />
          <button type="button">＋</button>
          <button onClick={() => setDropdown((open) => !open)} type="button">N {selected}</button>
          <button type="button">16:9</button>
          <button type="button">1080p</button>
          <button type="button">- 1/4 +</button>
          <button type="button">Sound</button>
          <button type="button">＋ START FRAME</button>
          <button type="button">＋ END FRAME</button>
          <button className="lime-action" onClick={() => onGenerate("cinema", "Cinema scene")} type="button">
            {loadingKey === "cinema" ? "GENERATING" : "GENERATE"}<br />✦ 8
          </button>
        </div>
        {results.length ? <ResultDock results={results} /> : null}
      </section>
    </div>
  );
}

function MarketingStudio({
  loadingKey,
  onGenerate,
  results,
}: {
  loadingKey: string | null;
  onGenerate: (key: string, label?: string) => void;
  results: string[];
}) {
  const groups = {
    "UGC Style": ["Review", "Testimonial", "Unboxing", "Problem Solution", "Lifestyle", "Storytelling"],
    "Hook Type": ["Stop Scrolling", "Before & After", "Shocking Fact", "Question Hook", "Emotional Hook", "Viral Hook"],
    Setting: ["Bedroom", "Office", "Luxury Studio", "Kitchen", "Gym", "Beach", "Restaurant", "Modern Apartment"],
    Avatar: ["Female Influencer", "Male Influencer", "Fitness Coach", "Beauty Creator", "Tech Reviewer", "Business Owner"],
    Voice: ["Male Voice", "Female Voice", "Professional", "Energetic", "Luxury", "Friendly"],
    Platform: ["TikTok", "Instagram Reels", "YouTube Shorts", "Facebook Ads"],
    "Call To Action": ["Shop Now", "Learn More", "Order Today", "Try It Now"],
  };
  return (
    <div className="page-pad fade-in">
      <section className="hero-panel marketing-hero">
        <p className="eyebrow">Marketing Studio</p>
        <h1>Turn Any Product Into a High-Converting Video Ad</h1>
        <div className="tabs"><button>Image</button><button className="active">Video</button></div>
      </section>
      <section className="marketing-grid">
        <div className="glass form-panel">
          <label>Product URL</label>
          <input placeholder="https://store.com/product" />
          <div className="extract-grid">
            <span>Product Name</span><span>Product Description</span><span>Product Images</span>
          </div>
          <label>Product Upload</label>
          <div className="dropzone">Drag images, videos, and logo here</div>
          {Object.entries(groups).map(([title, options]) => (
            <div className="option-block" key={title}>
              <p>{title}</p>
              <div>{options.map((option) => <button key={option} type="button">{option}</button>)}</div>
            </div>
          ))}
          <button className="lime-action" onClick={() => onGenerate("marketing", "Marketing ad variation")} type="button">
            {loadingKey === "marketing" ? "Generating..." : "Generate Video Ad"}
          </button>
        </div>
        <ResultGallery results={results} title="Ad variations" />
      </section>
    </div>
  );
}

function InfluencerStudio({
  loadingKey,
  onGenerate,
  results,
}: {
  loadingKey: string | null;
  onGenerate: (key: string, label?: string) => void;
  results: string[];
}) {
  const sections = [
    ["Character Type", "Human, Ant, Bee, Octopus, Crocodile, Iguana, Lizard, Alien, Beetle, Reptile, Amphibian, Elf, Mantis"],
    ["Gender", "Female, Male, Trans man, Trans woman, Non-binary"],
    ["Ethnicity / Origin Base", "African, Asian, European, Indian, Middle Eastern, Mixed"],
    ["Skin Color", "black, dark brown, white, purple, tan, olive, grey, green, blue, red, metallic, iridescent"],
    ["Eye Color", "Black, Purple, Green, White, Brown, Black Solid/Void, White Blind Eye, Deep Brown, Blue, Amber, Red, Grey"],
    ["Skin Conditions", "Vitiligo, Pigmentation, Freckles, Birthmarks, Scars, Burns, Albinism, Cracked/Dry Skin, Wrinkled Skin"],
    ["Age", "Adult, Mature, Senior"],
    ["Face Advanced", "Human eyes, reptile eyes, mechanical eyes, glowing eye, elf ears, horns, scales, fur, metallic, stripes, spots"],
  ];
  return (
    <div className="influencer-layout page-pad fade-in">
      <aside className="glass create-side"><button type="button">＋ Create new</button><button type="button">Presets</button><button type="button">Character library</button></aside>
      <section className="portrait-preview"><div className="portrait-card"><span>N</span><strong>NovaFrame Character</strong></div>{results[0] ? <p>{results[0]}</p> : null}</section>
      <aside className="glass builder-side">
        {sections.map(([title, csv]) => (
          <div className="option-block" key={title}>
            <p>{title}</p>
            <div>{csv.split(", ").map((item) => <button key={item} type="button">{item}</button>)}</div>
          </div>
        ))}
        <button className="lime-action" onClick={() => onGenerate("influencer", "Influencer preview")} type="button">
          {loadingKey === "influencer" ? "Generating..." : "Generate Influencer"}
        </button>
      </aside>
    </div>
  );
}

function CanvasPage() {
  return (
    <div className="canvas-page fade-in">
      <section className="canvas-board">
        <div className="connection-line" />
        <div className="float-media one">Image</div>
        <div className="float-media two">Video</div>
        <div className="float-media three">Prompt</div>
        <div className="comment-bubble">That&apos;s cool!</div>
        <h1>GENERATE STUNNING MEDIA WITH AI CANVAS</h1>
        <div className="empty-board"><strong>No Boards</strong><span>Make images, videos, and ideas in one place</span><button type="button">Create Canvas</button></div>
      </section>
      <section className="template-grid page-pad">
        {["Long Video Example", "Simple Seedance 2.0", "Extend Video", "Cinematic Storyboard", "Product Motion Board", "Character Scene Builder"].map((item) => <article className="tool-card" key={item}><h3>{item}</h3><p>Reusable Canvas workflow template.</p></article>)}
      </section>
      <div className="credit-toast">Credits are running low! Over 90% already used <button type="button">Upgrade</button></div>
    </div>
  );
}

function AppsPage({ onDetail }: { onDetail: (item: Item, category: string) => void }) {
  const [category, setCategory] = useState("All");
  const visible = apps.filter(([cat, , , badge]) => category === "All" || category === cat || (category === "Trending Templates" && badge === "TRENDING"));
  return (
    <div className="page-pad fade-in">
      <section className="section-head wide"><div><p className="eyebrow">Apps</p><h1>NovaFrame Apps</h1></div></section>
      <div className="filter-row wrap">
        {appCategories.map((cat) => <button className={category === cat ? "active" : ""} key={cat} onClick={() => setCategory(cat)} type="button">{cat}</button>)}
      </div>
      <div className="apps-grid">
        {visible.map(([cat, title, desc, badge]) => (
          <button className="app-card" key={title} onClick={() => onDetail({ icon: "✦", title, desc, badge: badge as Badge }, cat)} type="button">
            <span className="app-thumb" />
            <em className={`badge ${badge.toLowerCase()}`}>{badge}</em>
            <strong>{title}</strong>
            <small>{cat}</small>
            <p>{desc}</p>
            <b>Try Now</b>
          </button>
        ))}
      </div>
    </div>
  );
}

function PluginsPage({
  loadingKey,
  onGenerate,
}: {
  loadingKey: string | null;
  onGenerate: (key: string, label?: string) => void;
}) {
  const [tab, setTab] = useState("DaVinci Resolve");
  const tabs = ["Premiere Pro", "After Effects", "DaVinci Resolve", "Figma", "Photoshop"];
  return (
    <div className="page-pad fade-in">
      <div className="filter-row wrap">{tabs.map((item) => <button className={tab === item ? "active" : ""} key={item} onClick={() => setTab(item)} type="button">{item}</button>)}</div>
      <section className="hero-panel plugin-hero">
        <p className="eyebrow">Plugins</p>
        <h1>NovaFrame is now inside {tab}</h1>
        <p>Generate, edit, reframe, upscale and remove backgrounds directly inside your timeline.</p>
        <div className="cta-row"><button className="lime-action" onClick={() => onGenerate("plugin", `${tab} installer`)} type="button">{loadingKey === "plugin" ? "Preparing..." : "Download for macOS"}</button><button type="button">Download for Windows</button></div>
      </section>
      <section className="three-grid">
        {["Download the installer", "Run the installer", "Open your editing app and find NovaFrame under Extensions"].map((step, i) => <article className="tool-card" key={step}><span className="step">{i + 1}</span><h3>{step}</h3></article>)}
      </section>
      <ToolGrid title="Meet Cinema Studio inside your editor" tools={["Generate AI Video", "Generate AI Image", "Reframe", "Remove Background", "Draw to Edit", "Upscale"]} />
      <section className="pricing-table">
        {["Adobe Premiere Pro 2024+", "Adobe After Effects 2024+", "DaVinci Resolve 18+", "macOS Apple Silicon / Intel", "Windows 10 / 11 64-bit"].map((item) => <span key={item}>✓ {item}</span>)}
      </section>
      <Faq items={["How do I install it on macOS?", "How do I install it on Windows?", "Which versions are supported?", "Do I need internet?", "Do I need a NovaFrame subscription?"]} />
    </div>
  );
}

function McpCliPage({ onDetail }: { onDetail: (item: Item, category: string) => void }) {
  const [tab, setTab] = useState("MCP");
  const clients = ["Claude", "Cursor", "OpenClaw", "Hermes", "Custom Agent"];
  const tools = ["Video Analyzer", "Marketing Video Generator", "Soul Character Training", "Cinematic Image to Video", "Viral Clip Generator", "Virality Prediction"];
  return (
    <div className="page-pad fade-in">
      <section className="hero-panel">
        <p className="eyebrow">NovaFrame Marketplace</p>
        <h1>CONNECTORS MARKETPLACE</h1>
        <p>Connect NovaFrame with your favorite AI tools, productivity apps, and creative platforms.</p>
        <div className="search-xl">⌕ <span>Search connectors...</span></div>
      </section>
      <div className="filter-row wrap">{["MCP", "CLI", "Skills"].map((item) => <button className={tab === item ? "active" : ""} key={item} onClick={() => setTab(item)} type="button">{item}</button>)}</div>
      {tab === "MCP" ? (
        <>
          <div className="mcp-flow"><span>ChatGPT</span><span>Claude</span><span>Gemini</span><b>↓ Connector ↓</b><strong>NovaFrame</strong></div>
          <div className="client-grid">
            {clients.map((client) => (
              <button className="connector-card" key={client} onClick={() => onDetail({ icon: client[0], title: client, desc: `${client} can send creative jobs into NovaFrame MCP.` }, "MCP client")} type="button">
                <span className="iconbox">{client[0]}</span>
                <strong>{client}</strong>
                <small>Ready for MCP connector setup</small>
                <b>Configure</b>
              </button>
            ))}
          </div>
          <section className="connector-sections">
            {connectorSections.map((section) => (
              <div key={section.title}>
                <h2>{section.title}</h2>
                <div className="connector-grid">
                  {section.items.map((name, index) => (
                    <button className="connector-card" key={name} onClick={() => onDetail({ icon: name[0], title: name, desc: `Connect ${name} to NovaFrame workflows.` }, "Connector")} type="button">
                      <span className="iconbox">{name[0]}</span>
                      <strong>{name}</strong>
                      <small>{index % 3 === 0 ? "Connected" : "Not Connected"} • Last Sync {index + 1}h ago</small>
                      <b>{index % 3 === 0 ? "Configure" : "Connect"}</b>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </section>
        </>
      ) : tab === "CLI" ? (
        <section className="hero-panel">
          <h2>Connect NovaFrame to Any AI Agent</h2>
          <code>https://mcp.novaframe.ai/mcp</code>
          <pre>{`npm install -g @novaframe/cli\nnovaframe auth login\nnovaframe generate video --prompt "cinematic product shot"`}</pre>
          <div className="tool-card-grid">{tools.map((tool) => <article className="tool-card" key={tool}><h3>{tool}</h3><p>CLI powered creative automation.</p></article>)}</div>
        </section>
      ) : (
        <ToolGrid title="Skills" tools={["Shot planning", "Product research", "Campaign builder", "Avatar manager", "Prompt rewriting", "Batch rendering"]} />
      )}
      <ArchitectureNotes />
    </div>
  );
}

function ArchitectureNotes() {
  return (
    <section className="architecture-notes">
      <h2>Backend architecture</h2>
      <p>Paid providers stay server-side. Client screens use simulated results until keys and routes are connected.</p>
      <div>
        <strong>Routes</strong>
        {futureApiRoutes.map((route) => <code key={route}>{route}</code>)}
      </div>
      <div>
        <strong>Environment</strong>
        {futureEnvVars.map((name) => <code key={name}>{name}</code>)}
      </div>
      <div>
        <strong>Supabase tables</strong>
        {futureTables.map((table) => <code key={table}>{table}</code>)}
      </div>
    </section>
  );
}

function CollabPage() {
  return (
    <div className="page-pad fade-in">
      <section className="hero-panel">
        <p className="eyebrow">Collab</p>
        <h1>Create Together in Shared AI Projects</h1>
        <p>Bring your team into one creative workspace with comments, calls, assets, roles, and version history.</p>
      </section>
      <ToolGrid tools={["Shared Projects", "Built-in Calls", "Comments", "Asset Library", "Community Publishing", "Access Control", "Version History", "Team Roles"]} />
      <section className="mini-products">{["Creative Teams", "Marketing", "Content Creators", "Educators", "AI Filmmakers"].map((item) => <article className="product-tile" key={item}><strong>{item}</strong><small>Use NovaFrame collaboration for {item.toLowerCase()}.</small></article>)}</section>
    </div>
  );
}

function LibraryPage({ onOpenPage }: { onOpenPage: (page: PageId) => void }) {
  return (
    <div className="page-pad fade-in">
      <section className="section-head wide"><div><p className="eyebrow">Library</p><h1>Your creations will appear here.</h1><p>Let&apos;s make magic</p></div><button className="lime-action" onClick={() => onOpenPage("image")} type="button">Generate</button></section>
      <div className="search-xl">⌕ <span>Search assets...</span></div>
      <div className="filter-row wrap">{["Image", "Video", "Audio", "Marketing Studio", "Characters", "Lipsync", "Canvas Boards"].map((item) => <button key={item} type="button">{item}</button>)}</div>
      <div className="empty-library"><strong>No assets yet</strong><span>Upload files or generate your first campaign.</span><button type="button">Upload</button></div>
    </div>
  );
}

function PricingPage() {
  const plans = [
    ["Starter", "€29 / month", "2,000 credits", "Image generation, Basic video generation, Audio voiceover, Library access"],
    ["Creator Pro", "€79 / month", "8,000 credits", "Image + video generation, Marketing Studio, AI Influencer basic, Canvas boards, Priority queue"],
    ["Ultra", "€1,188 / year before VAT", "120,000 credits", "Cinema Studio, Supercomputer, AI Influencer advanced, Audio Studio, Canvas collaboration, Commercial usage, Team workspace"],
    ["Enterprise", "Custom pricing", "Unlimited seats", "SSO, Custom branding, Dedicated support, API access"],
  ];
  return (
    <div className="page-pad fade-in">
      <section className="hero-panel"><p className="eyebrow">Pricing</p><h1>Choose Your Creative Power</h1><p>Use coupon <strong>ULTRA_ANNUAL_23</strong> for €360 off annual Ultra. Austria VAT 20% applies.</p></section>
      <div className="pricing-grid">
        {plans.map(([name, price, credits, features]) => <article className="price-card" key={name}><em>{name === "Creator Pro" ? "Most Popular" : name}</em><h2>{price}</h2><strong>{credits}</strong><p>{features}</p><button className="lime-action" type="button">Checkout</button></article>)}
      </div>
      <section className="pricing-table"><h2>Credit calculator</h2><input type="range" min="100" max="120000" defaultValue="8000" /><p>Estimate image, video, audio and studio usage before checkout.</p></section>
      <Faq items={["How do credits work?", "Do credits expire?", "Can I buy extra credits?", "What happens when credits run out?", "Can I cancel anytime?"]} />
    </div>
  );
}

function DetailScreen({
  detail,
  loadingKey,
  onGenerate,
  results,
}: {
  detail: DetailPage;
  loadingKey: string | null;
  onGenerate: (key: string, label?: string) => void;
  results: string[];
}) {
  return (
    <div className="detail-page page-pad fade-in">
      <section className="hero-panel">
        <span className="detail-icon">{detail.icon}</span>
        <p className="eyebrow">{detail.category}</p>
        <h1>{detail.title}</h1>
        <p>{detail.desc}</p>
        <textarea placeholder={`Describe what you want to create with ${detail.title}`} />
        <button className="lime-action" onClick={() => onGenerate("detail", `${detail.title} result`)} type="button">
          {loadingKey === "detail" ? "Generating..." : "Generate"}
        </button>
      </section>
      <ResultGallery results={results} title={`${detail.title} results`} />
    </div>
  );
}

function AccountMenu({ onOpenPage }: { onOpenPage: (page: PageId) => void }) {
  return (
    <aside className="account-menu">
      <div className="account-card"><span className="avatar big">A</span><strong>ayyildizhakan58</strong><em>Creator Pro</em></div>
      <div className="credits"><span>Remaining Credits</span><strong>2,480</strong><i /></div>
      <button type="button">Top Up Credits</button>
      <button type="button">Boost Rendering Speed</button>
      {["View Profile", "Account Settings", "Billing & Subscription", "API Keys", "Team Workspace", "Notifications"].map((item) => <button key={item} onClick={() => item.includes("Billing") ? onOpenPage("pricing") : undefined} type="button">{item}</button>)}
      <button type="button">Increase Concurrent Jobs <em className="badge new">NEW</em></button>
      <button type="button">Priority Queue</button>
      <button type="button">Community Access</button>
      <button type="button">Help Center</button>
      <button type="button">Contact Support</button>
      <button type="button">Sign Out</button>
    </aside>
  );
}

function GamesBanner() {
  return (
    <section className="games-banner">
      <span className="pixel heart">♥</span>
      <span className="pixel lightning">ϟ</span>
      <span className="pixel potion">◈</span>
      <span className="pixel diamond">◆</span>
      <span className="pixel coin">●</span>
      <p>Powered by NovaFrame MCP</p>
      <h1>NOVAFRAME GAMES</h1>
      <span>Create interactive experiences powered by AI.</span>
    </section>
  );
}

function ToolGrid({ title = "Popular Tools", tools }: { title?: string; tools?: string[] }) {
  const list = tools || ["Image Studio", "Video Studio", "Audio Studio", "Marketing Studio", "AI Influencer", "Canvas", "MCP & CLI", "Supercomputer"];
  return (
    <section className="page-section">
      <h2>{title}</h2>
      <div className="tool-card-grid">{list.map((tool, index) => <article className="tool-card" key={tool}><span className="iconbox">{["□", "▭", "≋", "▱", "✦", "⌘", "</>", "N"][index % 8]}</span><h3>{tool}</h3><p>{tool} workflows with fast controls and reusable results.</p></article>)}</div>
    </section>
  );
}

function LatestModels({ onDetail }: { onDetail: (item: Item, category: string) => void }) {
  const latest: Item[] = [
    { badge: "TOP", icon: "N", title: "Nova Soul 2.0", desc: "Image model", category: "Image" },
    { badge: "NEW", icon: "▥", title: "Seedance 2.0", desc: "Video model", category: "Video" },
    { badge: "TOP", icon: "B", title: "Nano Banana Pro", desc: "Image model", category: "Image" },
    { badge: "NEW", icon: "R", title: "Recraft V4.1", desc: "Design model", category: "Image" },
    { icon: "F", title: "Flux 2", desc: "Image model", category: "Image" },
    { badge: "NEW", icon: "G", title: "GPT Image 2", desc: "Image model", category: "Image" },
    { icon: "G", title: "Google Veo 3.1", desc: "Video model", category: "Video" },
    { badge: "EXCLUSIVE", icon: "K", title: "Kling 3.0", desc: "Video model", category: "Video" },
  ];
  return (
    <section className="page-section">
      <h2>Latest Models</h2>
      <div className="latest-grid">
        {latest.map((item) => <button className="model-card" key={item.title} onClick={() => onDetail(item, `${item.category} model`)} type="button"><span className="iconbox">{item.icon}</span><strong>{item.title}</strong><small>{item.desc}</small>{item.badge ? <em className={`badge ${item.badge.toLowerCase()}`}>{item.badge}</em> : null}</button>)}
      </div>
    </section>
  );
}

function StudioSidebar({ title }: { title: string }) {
  return (
    <aside className="studio-sidebar">
      <button className="side-brand" type="button"><span>N</span> {title}⌄</button>
      <button className="active" type="button">Home</button>
      <button type="button">My Elements</button>
      <button type="button">My Favorites</button>
      <button type="button">Community Feed</button>
      <p>Projects ＋</p>
      <button type="button">＋ New project</button>
      <div className="side-bottom"><button type="button">◆ Pricing <em>30% OFF</em></button><button type="button">↪ Log in</button></div>
    </aside>
  );
}

function ResultDock({ results }: { results: string[] }) {
  return <div className="result-dock">{results.slice(0, 3).map((result) => <span key={result}>{result}</span>)}</div>;
}

function ResultGallery({ results, title }: { results: string[]; title: string }) {
  return (
    <section className="glass result-gallery">
      <h2>{title}</h2>
      <div>{(results.length ? results : ["Preview 1", "Preview 2", "Preview 3", "Preview 4"]).map((result) => <article key={result}><span className="mock-media" /><strong>{result}</strong></article>)}</div>
    </section>
  );
}

function Faq({ items }: { items: string[] }) {
  return <section className="faq">{items.map((item) => <details key={item}><summary>{item}</summary><p>NovaFrame keeps this simple with clear usage, simulated checkout flows, and server-side API architecture for paid calls.</p></details>)}</section>;
}

const styles = `
:root {
  color-scheme: dark;
  --bg: #07090d;
  --bg2: #0a0d12;
  --card: #121419;
  --panel: #171a20;
  --border: rgba(255,255,255,0.08);
  --text: #ffffff;
  --muted: #9ca3af;
  --lime: #ccff00;
  --pink: #ff1f8f;
  --blue: #2563eb;
}
* { box-sizing: border-box; }
body { margin: 0; background: var(--bg); color: var(--text); font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
button, input, textarea { font: inherit; }
button { cursor: pointer; color: inherit; }
.nf-shell { min-height: 100vh; background: radial-gradient(circle at 50% -10%, rgba(204,255,0,.12), transparent 38%), linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px), var(--bg); background-size: auto, 56px 56px, 56px 56px, auto; }
.topbar { position: sticky; top: 0; z-index: 50; display: flex; align-items: center; gap: 14px; min-height: 68px; padding: 12px 18px; border-bottom: 1px solid var(--border); background: rgba(7,9,13,.84); backdrop-filter: blur(20px); }
.brand, .nav-item, .top-actions button, .side-brand, .studio-sidebar button, .super-sidebar button { border: 0; background: transparent; }
.brand { display: inline-flex; align-items: center; gap: 12px; font-weight: 900; font-size: 20px; white-space: nowrap; }
.brand-mark, .super-icon, .avatar { display: grid; place-items: center; width: 38px; height: 38px; border-radius: 10px; background: #fff; color: #08090d; font-weight: 950; }
.brand-mark { box-shadow: 0 0 18px rgba(204,255,0,.25); }
.nav-scroll { flex: 1; display: flex; align-items: center; gap: 4px; overflow-x: auto; scrollbar-width: thin; }
.nav-item { display: inline-flex; align-items: center; gap: 8px; padding: 10px 12px; color: #c9ccd3; border-radius: 11px; font-size: 15px; font-weight: 800; white-space: nowrap; transition: .22s ease; }
.nav-item:hover, .nav-item.active { color: #fff; background: rgba(255,255,255,.07); }
.badge { display: inline-flex; align-items: center; justify-content: center; padding: 3px 7px; border-radius: 6px; background: var(--lime); color: #101400; font-size: 10px; font-style: italic; font-weight: 950; line-height: 1; text-transform: uppercase; }
.badge.top, .badge.exclusive { background: var(--lime); }
.badge.trending, .badge.pro { background: var(--pink); color: #fff; }
.top-actions { display: flex; align-items: center; gap: 8px; }
.search-pill, .asset-btn, .ghost-btn, .upgrade, .login-btn { min-height: 38px; border-radius: 12px !important; padding: 0 13px; background: rgba(255,255,255,.06) !important; border: 1px solid var(--border) !important; font-weight: 800; white-space: nowrap; }
.search-pill { color: var(--muted); display: inline-flex; gap: 9px; align-items: center; min-width: 190px; justify-content: flex-start; }
kbd { background: rgba(255,255,255,.13); border-radius: 5px; padding: 2px 5px; font-size: 11px; }
.upgrade span, .side-bottom em { display: block; margin-top: 2px; color: #fff; background: var(--pink); border-radius: 6px; padding: 2px 6px; font-size: 10px; }
.login-btn, .lime-action { background: var(--lime) !important; color: #0b0d10 !important; border: 0 !important; font-weight: 950; }
.avatar.open { outline: 2px solid var(--lime); }
.nf-page { min-height: calc(100vh - 68px); }
.page-pad { padding: 24px; }
.fade-in { animation: fadeIn .35s ease both; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
.glass, .hero-panel, .tool-card, .product-tile, .model-card, .price-card, .app-card, .connector-card, .assets-panel, .mega-panel, .account-menu, .feature-card, .super-card { background: rgba(18,20,25,.78); border: 1px solid var(--border); border-radius: 24px; backdrop-filter: blur(20px); box-shadow: inset 0 1px 0 rgba(255,255,255,.04); }
.featured-strip { display: grid; grid-template-columns: repeat(4, minmax(220px, 1fr)); gap: 16px; }
.feature-card { min-height: 258px; padding: 0; overflow: hidden; text-align: left; transition: .25s ease; }
.feature-card:hover, .product-tile:hover, .tool-card:hover, .model-card:hover, .app-card:hover, .connector-card:hover, .asset-product:hover, .trend-row:hover, .mega-row:hover { transform: translateY(-6px); box-shadow: 0 18px 44px rgba(204,255,0,.09), 0 0 0 1px rgba(204,255,0,.16); }
.feature-card strong, .feature-card span { display: block; padding: 0 16px; }
.feature-card strong { margin-top: 13px; font-size: 17px; text-transform: uppercase; }
.feature-card span { color: var(--muted); padding-bottom: 16px; }
.mock-media { display: block; height: 185px; background: linear-gradient(135deg, rgba(204,255,0,.14), rgba(37,99,235,.26)), radial-gradient(circle at 70% 30%, rgba(255,255,255,.3), transparent 20%), #1b1f25; }
.hero-white .mock-media { background: #f4f4ef; }
.hero-art .mock-media { background: conic-gradient(from 80deg, #e44, #16c7ff, #ffd166, #ff1f8f, #e44); }
.hero-minecraft .mock-media { image-rendering: pixelated; background: linear-gradient(90deg, #4c8c3f 12px, #385d2e 12px 24px, #6da65a 24px 36px, #2b4827 36px 48px); background-size: 48px 48px; }
.product-layout { display: grid; grid-template-columns: 1.1fr 2.9fr; gap: 16px; margin-top: 28px; }
.super-card { position: relative; min-height: 270px; padding: 28px; text-align: left; overflow: hidden; background: linear-gradient(135deg, rgba(204,255,0,.14), rgba(18,20,25,.95)); }
.super-card h2 { font-size: 32px; margin: 10px 0; letter-spacing: 0; }
.super-card p, .tool-card p, .product-tile small, .model-card small, .connector-card small, .mega-row small, .recent-row small, .trend-row small { color: var(--muted); display: block; }
.white-cta { position: absolute; left: 28px; bottom: 28px; background: #fff; color: #111; border-radius: 12px; padding: 12px 22px; font-weight: 900; }
.floating-stickers { position: absolute; right: 30px; bottom: 20px; display: flex; gap: 14px; transform: rotate(-12deg); }
.floating-stickers i { display: grid; place-items: center; width: 70px; height: 70px; border-radius: 18px; background: rgba(255,255,255,.1); border: 2px solid rgba(255,255,255,.35); color: var(--lime); font-weight: 950; }
.mini-products, .tool-card-grid, .latest-grid, .apps-grid, .connector-grid, .three-grid { display: grid; gap: 16px; }
.mini-products { grid-template-columns: repeat(3, 1fr); }
.product-tile, .model-card, .connector-card, .app-card { position: relative; min-height: 128px; padding: 24px; text-align: left; border: 1px solid var(--border); transition: .25s ease; }
.product-tile .badge, .model-card .badge, .app-card .badge { position: absolute; right: 16px; top: 16px; }
.iconbox { flex: 0 0 auto; display: grid; place-items: center; width: 46px; height: 46px; border-radius: 12px; background: rgba(255,255,255,.06); font-weight: 950; }
.games-banner { position: relative; overflow: hidden; margin-top: 28px; min-height: 500px; border-radius: 24px; border: 1px solid var(--border); display: grid; place-items: center; text-align: center; background: radial-gradient(circle at 50% 100%, rgba(204,255,0,.74), rgba(204,255,0,.22) 38%, rgba(18,20,25,.96) 72%), linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px); background-size: auto, 28px 28px, 28px 28px; }
.games-banner h1 { margin: 0; font-size: clamp(42px, 8vw, 84px); line-height: .9; }
.games-banner p { align-self: end; margin: 0; color: #ffb47a; font-weight: 900; }
.games-banner > span:not(.pixel) { align-self: start; color: var(--muted); font-weight: 800; }
.pixel { position: absolute; font-size: 48px; animation: float 4s ease-in-out infinite; filter: drop-shadow(0 12px 25px rgba(0,0,0,.4)); }
.heart { left: 18%; bottom: 10%; color: #ff3131; }
.lightning { right: 16%; top: 24%; color: #ffd400; animation-delay: .7s; }
.potion { left: 52%; bottom: 8%; color: #70d6ff; animation-delay: 1.1s; }
.diamond { left: 30%; top: 28%; color: #a7f3ff; animation-delay: 1.4s; }
.coin { right: 30%; bottom: 18%; color: #ffd43b; animation-delay: 1.8s; }
@keyframes float { 0%,100% { transform: translateY(0) rotate(-8deg); } 50% { transform: translateY(-22px) rotate(7deg); } }
.page-section { margin-top: 30px; }
.page-section h2, .section-head h2 { font-size: 28px; margin: 0 0 16px; }
.tool-card-grid { grid-template-columns: repeat(4, minmax(180px, 1fr)); }
.tool-card { padding: 22px; min-height: 160px; transition: .25s ease; }
.latest-grid { grid-template-columns: repeat(4, minmax(170px, 1fr)); }
.mega-wrap { position: fixed; z-index: 60; left: 0; right: 0; top: 68px; display: flex; justify-content: flex-start; pointer-events: none; }
.mega-panel { pointer-events: auto; width: min(920px, calc(100vw - 24px)); margin-left: 12px; max-height: calc(100vh - 90px); overflow: auto; background: rgba(23,26,32,.96); border-radius: 0 0 24px 24px; }
.mega-head { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; border-bottom: 1px solid var(--border); font-weight: 950; }
.mega-head button { border: 1px solid var(--border); background: rgba(255,255,255,.06); border-radius: 10px; padding: 8px 12px; }
.mega-cols, .mega-inline { display: grid; grid-template-columns: 1fr 1.1fr; gap: 20px; padding: 20px; }
.tiny, .eyebrow { color: var(--muted); font-size: 13px; margin: 0 0 12px; font-weight: 900; text-transform: uppercase; }
.eyebrow { color: #64f6ff; }
.mega-row, .recent-row, .trend-row { position: relative; display: flex; align-items: center; gap: 14px; width: 100%; border: 0; border-radius: 14px; padding: 10px; text-align: left; background: transparent; transition: .2s ease; }
.mega-row:hover, .recent-row:hover, .trend-row:hover { background: rgba(255,255,255,.055); }
.mega-row .badge { position: absolute; left: 16px; top: 2px; }
.studio-grid { display: grid; grid-template-columns: .95fr 1.4fr; gap: 20px; }
.studio-builder { padding: 28px; }
.studio-builder h1, .hero-panel h1 { margin: 0 0 16px; font-size: clamp(38px, 6vw, 76px); line-height: .95; letter-spacing: 0; }
textarea, input { width: 100%; border: 1px solid var(--border); border-radius: 16px; background: rgba(0,0,0,.26); color: #fff; padding: 16px; resize: vertical; outline: none; }
textarea { min-height: 140px; }
.settings-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin: 16px 0; }
.settings-grid button, .filter-row button, .tabs button, .option-block button, .cta-row button, .composer button, .prompt-bar button { border: 1px solid var(--border); background: rgba(255,255,255,.06); border-radius: 12px; padding: 10px 12px; }
.lime-action { border-radius: 14px; padding: 14px 22px; }
.assets-hub { padding: 24px; min-height: calc(100vh - 68px); display: grid; place-items: start center; background: radial-gradient(circle at 50% 0, rgba(255,31,143,.09), transparent 35%); }
.assets-panel { width: min(900px, 100%); padding: 0 0 24px; overflow: hidden; background: rgba(48,40,36,.82); }
.search-xl { display: flex; align-items: center; gap: 12px; min-height: 66px; padding: 0 22px; border-radius: 24px; border: 1px solid var(--border); background: rgba(255,255,255,.07); color: var(--muted); font-size: 18px; }
.search-xl.compact { min-height: 50px; border-radius: 16px; margin-bottom: 14px; }
.filter-row { display: flex; gap: 8px; padding: 12px 0; overflow-x: auto; }
.assets-panel .filter-row { padding-inline: 4px; }
.filter-row.wrap { flex-wrap: wrap; }
.filter-row button.active, .tabs button.active { background: rgba(255,255,255,.14); color: #fff; }
.assets-panel > * { margin-left: 16px; margin-right: 16px; }
.section-head { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-top: 24px; }
.section-head.wide { margin: 0 0 20px; }
.section-head button { border: 1px solid var(--border); background: rgba(255,255,255,.05); border-radius: 12px; padding: 10px 14px; }
.asset-products { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.asset-product { position: relative; min-height: 116px; border: 1px solid var(--border); border-radius: 14px; background: linear-gradient(135deg, rgba(37,99,235,.25), rgba(204,255,0,.12)); padding: 14px; text-align: left; transition: .2s ease; }
.asset-product:nth-child(3) { background: linear-gradient(135deg, rgba(255,31,143,.55), rgba(18,20,25,.9)); }
.asset-kind { display: inline-block; color: #cbd5e1; font-size: 12px; margin-bottom: 18px; }
.asset-product .badge { position: absolute; right: 12px; top: 16px; }
.trending-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 36px; }
.audio-page, .cinema-page, .super-page { min-height: calc(100vh - 68px); display: grid; grid-template-columns: 220px 1fr; }
.studio-sidebar, .super-sidebar { position: relative; padding: 12px; background: rgba(18,20,25,.88); border-right: 1px solid var(--border); }
.studio-sidebar button, .super-sidebar button { display: flex; align-items: center; gap: 10px; width: 100%; min-height: 44px; padding: 0 12px; border-radius: 12px; color: #e5e7eb; font-weight: 850; text-align: left; }
.studio-sidebar button:hover, .studio-sidebar button.active, .super-sidebar button:hover { background: rgba(255,255,255,.07); }
.side-brand span, .side-brand .brand-mark { width: 28px; height: 28px; border-radius: 8px; background: var(--lime); color: #111; display: grid; place-items: center; font-weight: 950; }
.studio-sidebar p, .super-sidebar p { color: var(--muted); font-weight: 900; }
.side-bottom { position: absolute; left: 12px; right: 12px; bottom: 12px; }
.audio-stage, .cinema-stage, .super-main { position: relative; overflow: hidden; min-height: calc(100vh - 68px); }
.audio-stage { display: grid; place-items: center; background: radial-gradient(circle at 55% 44%, rgba(255,31,143,.23), transparent 22%), radial-gradient(circle at 62% 48%, rgba(255,210,80,.12), transparent 26%), #0c0e12; }
.audio-glow { position: absolute; inset: 0; background: radial-gradient(circle at 50% 50%, rgba(255,31,143,.12), transparent 34%); }
.equalizer { position: absolute; bottom: 0; left: 0; right: 0; display: flex; justify-content: space-around; opacity: .13; align-items: end; height: 190px; }
.equalizer span, .wave-bars span { display: inline-block; width: 18px; background: #fff; border-radius: 3px 3px 0 0; }
.audio-title { position: absolute; top: 32%; text-align: center; }
.audio-title p { color: var(--muted); font-weight: 950; }
.audio-title h1 { margin: 0; font-size: clamp(34px, 5vw, 58px); line-height: 1.05; background: linear-gradient(90deg, #ff7ab8, #ffd166); -webkit-background-clip: text; background-clip: text; color: transparent; }
.audio-console { position: absolute; bottom: 38px; left: 50%; transform: translateX(-50%); display: grid; grid-template-columns: 180px 340px 220px 160px; gap: 12px; align-items: end; }
.audio-dial, .voice-list, .wave-card, .generate-square { background: rgba(23,26,32,.92); border: 1px solid var(--border); border-radius: 22px; padding: 16px; }
.audio-dial { min-height: 135px; display: grid; align-content: center; gap: 12px; }
.audio-dial strong { color: var(--lime); }
.voice-list button { display: flex; align-items: center; gap: 12px; width: 100%; background: transparent; border: 0; border-radius: 13px; padding: 10px; text-align: left; }
.voice-list button.selected { background: rgba(255,255,255,.08); }
.selected-chip { display: inline-flex; gap: 8px; align-items: center; margin-top: 8px; background: rgba(255,255,255,.08); border-radius: 10px; padding: 9px 12px; font-weight: 900; }
.wave-card strong { color: var(--lime); font-size: 21px; font-family: monospace; }
.wave-bars { display: flex; align-items: end; gap: 3px; height: 42px; margin-top: 12px; }
.wave-bars span { width: 4px; background: #d9ff4b; }
.generate-square { min-height: 118px; background: linear-gradient(135deg, var(--lime), #6f7d1e); color: #14160c; font-weight: 950; }
.result-dock { position: absolute; right: 24px; bottom: 20px; display: flex; gap: 10px; }
.result-dock span { background: rgba(255,255,255,.08); border: 1px solid var(--border); border-radius: 12px; padding: 10px 12px; }
.super-main { padding: 18px; background: #101216; }
.shortcuts { position: absolute; right: 26px; top: 24px; z-index: 2; border: 0; border-radius: 18px; padding: 10px 14px; background: rgba(255,255,255,.09); }
.super-hero { min-height: 620px; border-radius: 28px; display: grid; place-items: center; align-content: center; text-align: center; background: radial-gradient(circle at 50% 90%, rgba(204,255,0,1), rgba(204,255,0,.45) 35%, rgba(24,27,23,.9) 70%), radial-gradient(circle, rgba(255,255,255,.06) 1px, transparent 1px); background-size: auto, 12px 12px; }
.super-icon { width: 88px; height: 88px; border-radius: 22px; background: linear-gradient(135deg, #f1ff8a, var(--lime)); box-shadow: 0 18px 60px rgba(204,255,0,.38); }
.super-hero h1 { font-size: clamp(38px, 6vw, 64px); margin: 22px 0 8px; }
.super-hero p { color: #d7e0b0; font-weight: 850; }
.prompt-bar { width: min(960px, 86%); margin-top: 28px; background: rgba(18,20,25,.96); border: 2px solid rgba(0,0,0,.55); border-radius: 24px; padding: 14px; }
.prompt-bar textarea { min-height: 74px; border: 0; padding: 10px; }
.prompt-bar div { display: flex; align-items: center; gap: 10px; }
.round-submit { margin-left: auto; width: 42px; height: 42px; border-radius: 50% !important; background: var(--lime) !important; color: #111; }
.empty-task { margin-top: 50px; display: grid; place-items: center; gap: 8px; color: var(--muted); }
.empty-task b { width: 78px; height: 58px; border-radius: 16px; background: rgba(255,255,255,.07); display: grid; place-items: center; font-size: 22px; }
.thumb-grad { display: grid; place-items: center; height: 110px; border-radius: 16px; background: linear-gradient(135deg, rgba(255,31,143,.5), rgba(37,99,235,.45), rgba(204,255,0,.25)); color: #fff; font-size: 34px; font-weight: 950; }
.cinema-stage { display: grid; place-items: center; text-align: center; background: linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px), #101216; background-size: 32px 32px; }
.cinema-stage h1 { font-size: clamp(36px, 5vw, 70px); line-height: .95; }
.cinema-stage h1 span { color: var(--lime); }
.preview-stack { position: absolute; top: 17%; display: flex; }
.preview-stack i { width: 128px; height: 86px; margin-left: -36px; border-radius: 18px; border: 1px solid rgba(255,255,255,.22); background: linear-gradient(135deg, rgba(255,255,255,.2), rgba(37,99,235,.26)); transform: rotate(8deg); }
.model-dropdown { position: absolute; top: 34px; left: 50%; transform: translateX(-50%); width: 390px; padding: 16px; border: 1px solid var(--border); border-radius: 24px; background: rgba(23,26,32,.94); backdrop-filter: blur(20px); z-index: 3; text-align: left; }
.model-dropdown button { display: flex; gap: 12px; align-items: center; width: 100%; border: 0; background: transparent; border-radius: 14px; padding: 10px; }
.model-dropdown button:hover { background: rgba(255,255,255,.07); }
.model-dropdown b { margin-left: auto; color: var(--lime); }
.cinema-controls { position: absolute; bottom: 200px; display: flex; gap: 10px; align-items: center; }
.cinema-controls button, .motion-graph { min-height: 70px; border: 1px solid var(--border); background: rgba(255,255,255,.08); border-radius: 18px; padding: 12px 18px; }
.motion-graph { width: 210px; display: flex; align-items: center; justify-content: space-around; }
.motion-graph span { width: 14px; height: 14px; border-radius: 50%; background: #27c5ff; box-shadow: 0 0 15px #27c5ff; }
.composer { position: absolute; bottom: 72px; display: flex; align-items: stretch; gap: 8px; max-width: min(1040px, 94%); padding: 14px; border: 1px solid var(--border); border-radius: 24px; background: rgba(23,26,32,.9); backdrop-filter: blur(20px); }
.composer textarea { min-height: 84px; min-width: 280px; }
.toggle-stack { display: grid; gap: 6px; }
.toggle-stack button.active { background: rgba(255,255,255,.16); }
.hero-panel { padding: 34px; margin-bottom: 20px; }
.hero-panel p { color: var(--muted); font-size: 18px; max-width: 850px; }
.marketing-grid { display: grid; grid-template-columns: 1.25fr .9fr; gap: 18px; }
.form-panel { padding: 24px; }
.form-panel label { display: block; margin: 18px 0 8px; color: #e5e7eb; font-weight: 900; }
.extract-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 12px; }
.extract-grid span, .dropzone, .empty-library { border: 1px dashed rgba(255,255,255,.16); border-radius: 16px; padding: 18px; color: var(--muted); background: rgba(255,255,255,.035); }
.option-block { margin-top: 18px; }
.option-block p { color: #fff; font-weight: 950; }
.option-block div { display: flex; flex-wrap: wrap; gap: 8px; }
.influencer-layout { display: grid; grid-template-columns: 220px minmax(300px, 1fr) 430px; gap: 18px; }
.create-side, .builder-side { padding: 18px; }
.create-side button { width: 100%; margin-bottom: 10px; border: 1px solid var(--border); background: rgba(255,255,255,.06); border-radius: 12px; padding: 12px; }
.portrait-preview { display: grid; place-items: center; min-height: calc(100vh - 116px); border-radius: 28px; background: radial-gradient(circle, rgba(255,31,143,.18), transparent 35%), rgba(255,255,255,.025); }
.portrait-card { display: grid; place-items: center; gap: 16px; width: min(360px, 90%); aspect-ratio: 3/4; border-radius: 34px; background: linear-gradient(180deg, rgba(204,255,0,.25), rgba(37,99,235,.22)), #171a20; border: 1px solid var(--border); }
.portrait-card span { width: 96px; height: 96px; display: grid; place-items: center; border-radius: 24px; background: #fff; color: #111; font-size: 48px; font-weight: 950; }
.builder-side { max-height: calc(100vh - 116px); overflow: auto; }
.canvas-page { position: relative; min-height: calc(100vh - 68px); background: radial-gradient(circle at 50% 30%, rgba(37,99,235,.22), transparent 33%), #06101f; }
.canvas-board { position: relative; min-height: 650px; display: grid; place-items: center; text-align: center; background-image: radial-gradient(rgba(37,99,235,.7) 1px, transparent 1px); background-size: 24px 24px; overflow: hidden; }
.canvas-board h1 { font-size: clamp(40px, 7vw, 86px); max-width: 980px; line-height: .95; }
.empty-board { display: grid; gap: 8px; background: rgba(7,9,13,.72); border: 1px solid var(--border); border-radius: 24px; padding: 24px; }
.empty-board button, .credit-toast button { border: 0; background: var(--lime); color: #111; border-radius: 12px; padding: 10px 14px; font-weight: 950; }
.float-media { position: absolute; border-radius: 18px; padding: 28px; background: rgba(255,255,255,.08); border: 1px solid var(--border); animation: float 5s ease-in-out infinite; }
.one { left: 16%; top: 22%; } .two { right: 18%; top: 26%; animation-delay: .8s; } .three { left: 28%; bottom: 18%; animation-delay: 1.3s; }
.comment-bubble { position: absolute; right: 26%; bottom: 24%; background: #fff; color: #111; border-radius: 999px; padding: 12px 18px; font-weight: 900; }
.credit-toast { position: fixed; right: 18px; bottom: 18px; z-index: 20; background: rgba(23,26,32,.95); border: 1px solid var(--border); border-radius: 16px; padding: 14px; display: flex; gap: 12px; align-items: center; }
.template-grid { grid-template-columns: repeat(3, 1fr); }
.apps-grid { grid-template-columns: repeat(5, minmax(170px, 1fr)); margin-top: 16px; }
.app-card { min-height: 260px; }
.app-thumb { display: block; height: 100px; border-radius: 16px; background: linear-gradient(135deg, rgba(204,255,0,.28), rgba(255,31,143,.22), rgba(37,99,235,.3)); margin-bottom: 16px; }
.connector-sections { display: grid; gap: 28px; }
.client-grid { display: grid; grid-template-columns: repeat(5, minmax(150px, 1fr)); gap: 12px; margin: 18px 0 28px; }
.connector-grid { grid-template-columns: repeat(4, minmax(190px, 1fr)); }
.connector-card b { display: inline-block; margin-top: 16px; color: var(--lime); }
.mcp-flow { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; margin: 20px 0; }
.mcp-flow span, .mcp-flow strong, .mcp-flow b { border: 1px solid var(--border); background: rgba(255,255,255,.06); border-radius: 14px; padding: 14px 18px; }
pre, code { display: block; white-space: pre-wrap; background: #05070a; border: 1px solid var(--border); border-radius: 16px; padding: 18px; color: #d7ff5f; }
.architecture-notes { margin-top: 28px; padding: 24px; border: 1px solid var(--border); border-radius: 24px; background: rgba(255,255,255,.035); }
.architecture-notes > div { margin-top: 14px; display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
.architecture-notes code { display: inline-block; padding: 8px 10px; border-radius: 10px; }
.pricing-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.price-card { padding: 24px; }
.price-card em { color: var(--lime); font-weight: 950; }
.price-card h2 { min-height: 62px; }
.pricing-table { margin-top: 22px; padding: 24px; border-radius: 22px; border: 1px solid var(--border); background: rgba(255,255,255,.04); display: grid; gap: 10px; }
.faq { display: grid; gap: 10px; margin-top: 22px; }
.faq details { border: 1px solid var(--border); border-radius: 16px; padding: 16px; background: rgba(255,255,255,.04); }
.detail-icon { width: 82px; height: 82px; border-radius: 24px; display: grid; place-items: center; background: rgba(255,255,255,.08); font-size: 36px; margin-bottom: 18px; }
.result-gallery { padding: 24px; }
.result-gallery > div { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
.result-gallery article { border: 1px solid var(--border); border-radius: 18px; overflow: hidden; background: rgba(255,255,255,.04); }
.result-gallery article strong { display: block; padding: 14px; }
.account-menu { position: fixed; z-index: 70; right: 18px; top: 78px; width: 330px; padding: 16px; display: grid; gap: 8px; background: rgba(23,26,32,.96); }
.account-menu button { border: 1px solid var(--border); background: rgba(255,255,255,.05); border-radius: 12px; padding: 11px 12px; text-align: left; }
.account-card { display: grid; grid-template-columns: 50px 1fr; gap: 10px; align-items: center; }
.avatar.big { width: 50px; height: 50px; }
.account-card em { grid-column: 2; color: var(--lime); font-style: normal; }
.credits { padding: 14px; border-radius: 14px; background: rgba(204,255,0,.08); }
.credits i { display: block; height: 8px; margin-top: 10px; border-radius: 999px; background: linear-gradient(90deg, var(--lime) 72%, rgba(255,255,255,.1) 72%); }
@media (max-width: 1280px) {
  .top-actions .search-pill { display: none; }
  .featured-strip { grid-template-columns: repeat(2, 1fr); }
  .product-layout, .studio-grid, .marketing-grid, .influencer-layout { grid-template-columns: 1fr; }
  .apps-grid { grid-template-columns: repeat(3, 1fr); }
  .pricing-grid, .connector-grid, .client-grid { grid-template-columns: repeat(2, 1fr); }
  .audio-console { grid-template-columns: 1fr 1.4fr; width: min(760px, 94%); }
}
@media (max-width: 820px) {
  .topbar { align-items: flex-start; flex-wrap: wrap; }
  .brand { width: 100%; }
  .top-actions { width: 100%; overflow-x: auto; }
  .page-pad { padding: 14px; }
  .featured-strip, .mini-products, .tool-card-grid, .latest-grid, .asset-products, .trending-cols, .mega-cols, .mega-inline, .pricing-grid, .connector-grid, .client-grid, .three-grid, .template-grid, .apps-grid, .result-gallery > div { grid-template-columns: 1fr; }
  .product-layout { grid-template-columns: 1fr; }
  .audio-page, .cinema-page, .super-page { grid-template-columns: 1fr; }
  .studio-sidebar, .super-sidebar { position: relative; min-height: auto; border-right: 0; border-bottom: 1px solid var(--border); }
  .side-bottom { position: static; margin-top: 16px; }
  .audio-stage, .cinema-stage, .super-main { min-height: 900px; }
  .audio-console { position: absolute; left: 14px; right: 14px; bottom: 20px; transform: none; width: auto; grid-template-columns: 1fr; }
  .composer { position: static; margin: 420px 14px 30px; flex-direction: column; }
  .cinema-controls { left: 14px; right: 14px; bottom: 390px; overflow-x: auto; }
  .model-dropdown { width: calc(100vw - 28px); top: 80px; }
  .super-hero { min-height: 520px; padding: 20px; }
  .prompt-bar { width: 100%; }
  .prompt-bar div { flex-wrap: wrap; }
  .hero-panel h1, .studio-builder h1 { font-size: 42px; }
  .games-banner { min-height: 420px; }
  .account-menu { left: 14px; right: 14px; width: auto; }
}
`;
