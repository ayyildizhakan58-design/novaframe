"use client";

import { useMemo, useState } from "react";

type PageId =
  | "explore"
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
  | "apps";

type NavItem = {
  id: PageId;
  label: string;
  new?: boolean;
};

type Feature = {
  badge?: "NEW" | "TOP";
  desc: string;
  icon: string;
  title: string;
};

type Model = {
  badge?: "NEW" | "TOP" | "EXCLUSIVE" | "TRENDING";
  category?: string;
  desc: string;
  icon: string;
  title: string;
};

const navItems: NavItem[] = [
  { id: "explore", label: "Explore" },
  { id: "image", label: "Image" },
  { id: "video", label: "Video" },
  { id: "audio", label: "Audio" },
  { id: "supercomputer", label: "Supercomputer", new: true },
  { id: "mcp", label: "MCP & CLI", new: true },
  { id: "collab", label: "Collab" },
  { id: "plugins", label: "Plugins", new: true },
  { id: "marketing", label: "Marketing Studio" },
  { id: "cinema", label: "Cinema Studio" },
  { id: "influencer", label: "AI Influencer" },
  { id: "canvas", label: "Canvas" },
  { id: "apps", label: "Apps" },
];

const exploreTabs = ["All", "Models", "Products", "Characters", "Community", "Apps", "Originals"];

const featuredCards = [
  {
    desc: "Build interactive AI games using NovaFrame MCP.",
    kind: "video",
    title: "NovaFrame Games",
  },
  {
    desc: "Generate footage directly inside DaVinci Resolve.",
    kind: "white",
    title: "NovaFrame Plugin for DaVinci Resolve",
  },
  {
    desc: "Crisp vectors and total style control.",
    kind: "art",
    title: "Introducing Recraft 4.1",
  },
  {
    desc: "Create worlds directly from prompts.",
    kind: "minecraft",
    title: "NovaFrame Mod",
  },
];

const productCards: Model[] = [
  { badge: "TRENDING", category: "Image", desc: "Generate high quality visuals", icon: "G", title: "Nano Banana Pro" },
  { badge: "NEW", category: "Video", desc: "Create videos in seconds", icon: "▮▮", title: "Seedance 2.0" },
  { badge: "TRENDING", category: "Campaign", desc: "Launch campaigns from one prompt", icon: "▣", title: "Marketing Studio" },
  { badge: "NEW", category: "Connector", desc: "Turn AI into a creative engine", icon: "</>", title: "MCP & CLI" },
  { badge: "NEW", category: "Canvas", desc: "Generate media on one canvas", icon: "✣", title: "NovaFrame Canvas" },
  { category: "Cinema", desc: "Create cinematic scenes", icon: "▦", title: "Cinema Studio 3.5" },
];

const popularTools: Feature[] = [
  { desc: "Generate images, edits and product visuals.", icon: "◱", title: "Image Studio" },
  { desc: "Create cinematic clips and model routed videos.", icon: "▮", title: "Video Studio" },
  { desc: "Create voiceover, narration and localized audio.", icon: "▥", title: "Audio Studio" },
  { desc: "Generate ads, hooks and production campaigns.", icon: "▣", title: "Marketing Studio" },
  { desc: "Build reusable virtual talent and characters.", icon: "✦", title: "AI Influencer" },
  { desc: "Work with references, boards and generated assets.", icon: "✣", title: "Canvas" },
  { desc: "Connect Claude, Cursor and agents to production.", icon: "</>", title: "MCP & CLI" },
  { desc: "Run agents, automation and creative workflows.", icon: "✱", title: "Supercomputer" },
];

const latestModels: Model[] = [
  { badge: "TOP", category: "Image", desc: "Ultra-realistic fashion visuals", icon: "⌁", title: "Nova Soul 2.0" },
  { badge: "NEW", category: "Video", desc: "Most advanced video model", icon: "▮▮", title: "Seedance 2.0" },
  { badge: "TOP", category: "Image", desc: "Best 4K image model", icon: "G", title: "Nano Banana Pro" },
  { badge: "NEW", category: "Image", desc: "Photorealistic and expressive generation", icon: "◒", title: "Recraft V4.1" },
  { category: "Image", desc: "Speed-optimized detail", icon: "△", title: "Flux 2" },
  { badge: "NEW", category: "Image", desc: "4K images with near-perfect text", icon: "◎", title: "GPT Image 2" },
  { category: "Video", desc: "Advanced AI video with sound", icon: "G", title: "Google Veo 3.1" },
  { badge: "EXCLUSIVE", category: "Video", desc: "Cinematic videos with audio", icon: "◌", title: "Kling 3.0" },
];

const imageFeatures: Feature[] = [
  { desc: "Generate AI images", icon: "▧", title: "Create Image" },
  { badge: "TOP", desc: "Image generation with camera controls", icon: "▣", title: "Cinematic Cameras" },
  { badge: "NEW", desc: "Visual ideation meets repeatable AI workflows.", icon: "✣", title: "Canvas" },
  { desc: "Turn references into a focused moodboard", icon: "⌁", title: "Moodboard" },
  { desc: "Create unique character", icon: "☻", title: "Soul ID Character" },
  { desc: "Create and manage your AI influencer", icon: "✦", title: "AI Influencer" },
  { badge: "NEW", desc: "Generate Your Aesthetic", icon: "▤", title: "Photodump" },
  { desc: "Adjust lighting position, color, and brightness", icon: "☼", title: "Relight" },
  { desc: "Select an area, describe the change", icon: "✎", title: "Inpaint" },
  { desc: "Enhance image quality", icon: "↗", title: "Image Upscale" },
  { desc: "Create Realistic Face Swaps", icon: "□", title: "Face Swap" },
  { desc: "Create Realistic Character Swaps", icon: "▧", title: "Character Swap" },
  { desc: "From sketch to picture", icon: "⌕", title: "Draw To Edit" },
  { desc: "Create fashion sets", icon: "◈", title: "Fashion Factory" },
];

const imageModels: Model[] = [
  { badge: "TOP", desc: "Next generation ultra-realistic fashion visuals", icon: "⌁", title: "Nova Soul 2.0" },
  { desc: "Cinematic Film-Grade Aesthetic", icon: "⌁", title: "Nova Soul Cinema" },
  { desc: "Storyboard, edit, create", icon: "▱", title: "Nova Popcorn" },
  { badge: "NEW", desc: "4K images with near-perfect text rendering", icon: "◎", title: "GPT Image 2" },
  { badge: "NEW", desc: "Photorealistic and expressive image generation", icon: "◒", title: "Recraft V4.1" },
  { desc: "Pro quality at Flash speed", icon: "◌", title: "Nano Banana 2" },
  { badge: "TOP", desc: "Best 4K image model ever", icon: "◌", title: "Nano Banana Pro" },
  { desc: "Intelligent visual reasoning", icon: "▮", title: "Seedream 5.0 Lite" },
  { desc: "True-color precision rendering", icon: "◎", title: "GPT Image 1.5" },
  { desc: "Versatile image styles by xAI", icon: "◉", title: "Grok Imagine" },
  { desc: "Speed-optimized detail", icon: "△", title: "Flux 2" },
  { desc: "Advanced image editing model", icon: "✧", title: "Reve" },
  { desc: "Instant lifelike portraits", icon: "◬", title: "Z-Image" },
  { desc: "High-resolution upscaler", icon: "▥", title: "Topaz" },
];

const videoFeatures: Feature[] = [
  { desc: "Generate AI videos", icon: "▮", title: "Create Video" },
  { badge: "TOP", desc: "Cinematic video with AI director", icon: "▦", title: "Cinema Studio" },
  { badge: "NEW", desc: "Visual ideation meets repeatable AI workflows.", icon: "✣", title: "Canvas" },
  { desc: "Create mixed media projects", icon: "▧", title: "Mixed Media" },
  { desc: "Edit scenes, shots, elements", icon: "▹", title: "Edit Video" },
  { desc: "Turn product URLs into video ads", icon: "▽", title: "Click To Ad" },
  { desc: "Turn ideas into viral videos", icon: "✿", title: "Trends Studio" },
  { desc: "Create Talking Clips", icon: "◉", title: "Lipsync Studio" },
  { desc: "Sketch turns into a cinema", icon: "✎", title: "Draw To Video" },
  { desc: "From sketch to video with Sora 2", icon: "⌁", title: "Sketch To Video" },
  { desc: "Build UGC video with avatar", icon: "▣", title: "UGC Factory" },
  { desc: "Enhance video quality", icon: "↗", title: "Video Upscale" },
  { desc: "Video smart replacement", icon: "☼", title: "Animate" },
  { desc: "Create professional motion graphics", icon: "▯", title: "Vibe Motion" },
  { desc: "Swap characters in videos", icon: "⇄", title: "Recast Studio" },
];

const videoModels: Model[] = [
  { badge: "TOP", desc: "Most advanced video model", icon: "▮▮", title: "Seedance 2.0" },
  { badge: "TOP", desc: "Cinematic videos with audio", icon: "◌", title: "Kling 3.0" },
  { desc: "Transfer motion from video to image", icon: "◌", title: "Kling Motion Control" },
  { desc: "Advanced video editing", icon: "◌", title: "Kling O1 Edit" },
  { desc: "OpenAI's most advanced video model", icon: "☁", title: "Sora 2" },
  { desc: "Fast video generation by Google", icon: "G", title: "Google Veo 3.1 Lite" },
  { desc: "Advanced AI video with sound", icon: "G", title: "Google Veo 3.1" },
  { desc: "Video and audio model", icon: "⌁", title: "HappyHorse" },
  { badge: "NEW", desc: "Cinematic videos with synchronized audio", icon: "◉", title: "Grok Imagine Video" },
  { desc: "AI video generation with first and end frame control", icon: "▱", title: "Wan 2.7" },
  { desc: "Fastest high-dynamic video", icon: "▥", title: "Minimax Hailuo 2.3" },
  { desc: "Pro-grade audio-visual sync", icon: "▮▮", title: "Seedance 1.5 Pro" },
  { desc: "VFX and camera control", icon: "⌘", title: "Nova DOP" },
];

const audioModels: Model[] = [
  { desc: "Expressive AI voice with emotion control", icon: "▮", title: "Eleven v3" },
  { desc: "Studio-quality text-to-speech", icon: "≋", title: "MiniMax Speech 2.8 HD" },
  { desc: "ByteDance multilingual text-to-speech", icon: "▮▮", title: "Seed Speech" },
  { desc: "Long-form expressive voice synthesis", icon: "∨", title: "VibeVoice" },
];

const superTools = [
  "Image Generation",
  "Video Generation",
  "Personal Clipper",
  "UGC Tutorial",
  "Animated Infographics",
  "AI Influencer",
  "Product Photoshoot",
  "UGC Content",
  "Virtual Try-On",
  "TV Commercial",
  "Unboxing Video",
  "Amazon Listing Design",
  "Podcast Video",
  "Premium Motion Design",
  "Kinetic Typography",
  "Product Animation",
  "UGC Try-On",
  "Motion Design",
  "Cartoon Animation",
];

const connectorTabs = ["All", "AI Systems", "Productivity", "Creative Tools", "Development", "Marketing"];

const connectorSections = [
  {
    title: "Featured Connectors",
    cards: [
      ["ChatGPT", "Connect prompts, agents and creative requests."],
      ["Claude", "Turn Claude into a NovaFrame production engine."],
      ["Gemini", "Route research and prompts into creative workflows."],
      ["Cursor", "Build and automate creative apps from code."],
      ["VS Code Agent", "Generate assets directly from your editor."],
      ["OpenCode", "Connect local coding agents to NovaFrame."],
      ["DeepSeek", "Use reasoning models inside creative workflows."],
      ["Grok", "Connect xAI ideation to media production."],
    ],
  },
  {
    title: "Creative Connectors",
    cards: [
      ["Adobe Premiere Pro", "Send generated footage into your timeline."],
      ["Adobe After Effects", "Build motion graphics and scene variants."],
      ["DaVinci Resolve", "Generate footage directly inside Resolve."],
      ["Figma", "Move concepts into design systems."],
      ["Canva", "Create campaign graphics and social assets."],
      ["Photoshop", "Edit, expand and relight images."],
    ],
  },
  {
    title: "Productivity Connectors",
    cards: [
      ["Google Drive", "Store assets and sync campaign folders."],
      ["Gmail", "Send approvals and production updates."],
      ["Notion", "Connect briefs, scripts and content calendars."],
      ["Slack", "Notify teams when generations are ready."],
      ["Dropbox", "Sync deliverables with client folders."],
      ["Google Calendar", "Schedule campaigns and review cycles."],
    ],
  },
  {
    title: "Marketing Connectors",
    cards: [
      ["Meta Ads", "Push video ads to campaign drafts."],
      ["TikTok Ads", "Create vertical ad variants."],
      ["Google Ads", "Generate assets for search and video campaigns."],
      ["Shopify", "Turn product pages into ad creatives."],
      ["WooCommerce", "Generate commerce visuals from listings."],
      ["Klaviyo", "Create email visuals and product stories."],
    ],
  },
  {
    title: "Developer Connectors",
    cards: [
      ["GitHub", "Track projects and production automations."],
      ["GitLab", "Connect CI workflows to creative generation."],
      ["Vercel", "Deploy generated app experiences."],
      ["Supabase", "Store users, credits and generation history."],
      ["Cloudflare", "Route assets and media delivery."],
      ["Docker", "Package repeatable creative pipelines."],
    ],
  },
];

const placeholderPages: Record<Exclude<PageId, "explore" | "image" | "video" | "audio" | "supercomputer" | "mcp">, string> = {
  apps: "Discover focused tools for creators, teams and production workflows.",
  canvas: "Create, organize and remix visual ideas on a single AI canvas.",
  cinema: "Direct cinematic scenes with model routing, camera controls and reusable elements.",
  collab: "Invite teams, share assets and review production-ready creative outputs.",
  influencer: "Design consistent AI characters and virtual talent for campaigns.",
  marketing: "Turn products, URLs and briefs into campaign assets and ad variants.",
  plugins: "Install creative plugins for editors, design tools and production apps.",
};

function Badge({ value }: { value?: string }) {
  if (!value) return null;
  return <span className={`badge badge-${value.toLowerCase()}`}>{value}</span>;
}

function IconBox({ icon }: { icon: string }) {
  return <span className="icon-box">{icon}</span>;
}

function TopNav({ active, setActive }: { active: PageId; setActive: (page: PageId) => void }) {
  return (
    <header className="topbar">
      <button className="brand" onClick={() => setActive("explore")}>
        <span className="brand-mark">N</span>
        <span>NovaFrame</span>
      </button>
      <nav className="nav-scroll">
        {navItems.map((item) => (
          <button className={`nav-item ${active === item.id ? "active" : ""}`} key={item.id} onClick={() => setActive(item.id)}>
            {item.label}
            {item.new ? <span className="nav-new">New</span> : null}
          </button>
        ))}
        <button className="nav-item">
          Pricing <span className="sale">30% OFF</span>
        </button>
      </nav>
      <div className="nav-actions">
        <button className="search-mini">⌕ Search</button>
        <button className="ghost-btn">Login</button>
        <button className="primary-btn">Sign up</button>
      </div>
    </header>
  );
}

function ExplorePage({ setActive }: { setActive: (page: PageId) => void }) {
  return (
    <section className="page-pad explore-page fade-in">
      <div className="featured-row">
        {featuredCards.map((card) => (
          <button className={`feature-card ${card.kind}`} key={card.title}>
            <div className="feature-media">
              <span className="media-orb" />
            </div>
            <h3>{card.title}</h3>
            <p>{card.desc}</p>
          </button>
        ))}
      </div>

      <div className="hub-panel">
        <div className="search-row">
          <span>⌕</span>
          <input placeholder="Search models, products, characters, apps..." />
        </div>
        <div className="tab-row">
          {exploreTabs.map((tab, index) => (
            <button className={index === 0 ? "active" : ""} key={tab}>
              {tab}
            </button>
          ))}
        </div>

        <div className="explore-grid">
          <article className="super-card" onClick={() => setActive("supercomputer")}>
            <div>
              <h2>
                SUPERCOMPUTER <Badge value="NEW" />
              </h2>
              <p>Agents, automation, skills, connectors and AI workflows.</p>
              <button>Try now ↗</button>
            </div>
            <div className="floating-stack">
              <span />
              <span />
              <span />
            </div>
          </article>

          <div className="product-grid">
            {productCards.map((card) => (
              <button className="product-card" key={card.title}>
                <div>
                  <IconBox icon={card.icon} />
                  <Badge value={card.badge} />
                </div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="games-banner">
        <span className="float-icon heart">♥</span>
        <span className="float-icon bolt">ϟ</span>
        <span className="float-icon potion">◈</span>
        <span className="float-icon diamond">◆</span>
        <span className="float-icon coin">●</span>
        <p>Powered by NovaFrame MCP</p>
        <h1>NOVAFRAME GAMES</h1>
        <h2>Create interactive experiences powered by AI.</h2>
      </section>

      <SectionTitle eyebrow="Popular tools" title="Launch any creative workflow from one hub." />
      <div className="tool-grid">
        {popularTools.map((tool) => (
          <button className="tool-card" key={tool.title}>
            <IconBox icon={tool.icon} />
            <h3>{tool.title}</h3>
            <p>{tool.desc}</p>
          </button>
        ))}
      </div>

      <SectionTitle eyebrow="Latest models" title="New and trending model routes." />
      <div className="model-grid compact">
        {latestModels.map((model) => (
          <ModelCard key={model.title} model={model} />
        ))}
      </div>
    </section>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="section-title">
      <p>{eyebrow}</p>
      <h2>{title}</h2>
    </div>
  );
}

function ModelCard({ model }: { model: Model }) {
  return (
    <button className="model-card">
      <IconBox icon={model.icon} />
      <div>
        <h3>
          {model.title} <Badge value={model.badge} />
        </h3>
        {model.category ? <small>{model.category}</small> : null}
        <p>{model.desc}</p>
      </div>
    </button>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <button className="list-card">
      <IconBox icon={feature.icon} />
      <div>
        <h3>
          {feature.title} <Badge value={feature.badge} />
        </h3>
        <p>{feature.desc}</p>
      </div>
    </button>
  );
}

function CatalogPage({ features, models, title }: { features: Feature[]; models: Model[]; title: string }) {
  return (
    <section className="page-pad catalog fade-in">
      <div className="catalog-head">
        <p>NovaFrame {title}</p>
        <h1>{title} tools and models</h1>
      </div>
      <div className="mega-panel">
        <div>
          <h2>Features</h2>
          <div className="stack-list">
            {features.map((feature) => (
              <FeatureCard feature={feature} key={feature.title} />
            ))}
          </div>
        </div>
        <div>
          <h2>Models</h2>
          <div className="stack-list">
            {models.map((model) => (
              <ModelCard key={model.title} model={model} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AudioPage() {
  return (
    <section className="audio-page fade-in">
      <div className="audio-glow" />
      <div className="audio-hero">
        <p>AUDIO</p>
        <h1>READY TO GIVE YOUR SCENE A VOICE?</h1>
      </div>
      <div className="audio-visualizer">
        {Array.from({ length: 52 }, (_, index) => (
          <span key={index} style={{ height: `${16 + ((index * 13) % 72)}px` }} />
        ))}
      </div>
      <div className="voice-panel">
        {audioModels.map((model, index) => (
          <button className={index === 0 ? "active" : ""} key={model.title}>
            <IconBox icon={model.icon} />
            <div>
              <h3>{model.title}</h3>
              <p>{model.desc}</p>
            </div>
            {index === 0 ? <strong>✓</strong> : null}
          </button>
        ))}
      </div>
      <div className="audio-generator">
        <button>Choose Voice</button>
        <button>Generate ✦</button>
      </div>
    </section>
  );
}

function SupercomputerPage() {
  return (
    <section className="super-page fade-in">
      <div className="super-hero">
        <div className="super-logo">N</div>
        <h1>SUPERCOMPUTER FOR CREATIVE WORK</h1>
        <p>Turn a simple chat into production-ready content at scale.</p>
        <div className="prompt-bar">
          <span>+</span>
          <input defaultValue="Make a talking head video from my product page" />
          <button>Google Gemini 3.5 Flash ▾</button>
          <button>Ask ↑</button>
        </div>
      </div>

      <article className="game-card">
        <div>
          <p>Featured workflow</p>
          <h2>Make games with NovaFrame</h2>
          <span>It builds the game and generates the art, sounds, and characters for it.</span>
          <button>Create game</button>
        </div>
        <div className="game-art">
          <span>♥</span>
          <span>ϟ</span>
          <span>◆</span>
        </div>
      </article>

      <SectionTitle eyebrow="Supercomputer" title="What can the Supercomputer do?" />
      <div className="super-tool-grid">
        {superTools.map((tool, index) => (
          <button className="super-tool" key={tool}>
            <IconBox icon={["▧", "▮", "✂", "▣", "≋", "✦", "◱", "◉"][index % 8]} />
            <h3>{tool}</h3>
            <p>Create production-ready assets with agent-assisted automation.</p>
            <span>Try</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function MarketplacePage() {
  return (
    <section className="page-pad marketplace fade-in">
      <div className="market-hero">
        <p>NovaFrame Marketplace</p>
        <h1>CONNECTORS MARKETPLACE</h1>
        <h2>Connect NovaFrame with your favorite AI tools, productivity apps, and creative platforms.</h2>
        <div className="search-row">
          <span>⌕</span>
          <input placeholder="Search connectors..." />
        </div>
        <div className="tab-row">
          {connectorTabs.map((tab, index) => (
            <button className={index === 0 ? "active" : ""} key={tab}>
              {tab}
            </button>
          ))}
        </div>
      </div>
      {connectorSections.map((section) => (
        <div className="connector-section" key={section.title}>
          <SectionTitle eyebrow="Marketplace" title={section.title} />
          <div className="connector-grid">
            {section.cards.map(([name, desc], index) => (
              <button className="connector-card" key={name}>
                <IconBox icon={name.slice(0, 1)} />
                <div>
                  <h3>{name}</h3>
                  <p>{desc}</p>
                  <small>{index % 3 === 0 ? "Connected" : "Not Connected"} · Last sync {index % 3 === 0 ? "today" : "never"}</small>
                </div>
                <span>{index % 3 === 0 ? "Configure" : "Connect"}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

function PlaceholderPage({ active }: { active: Exclude<PageId, "explore" | "image" | "video" | "audio" | "supercomputer" | "mcp"> }) {
  const title = navItems.find((item) => item.id === active)?.label ?? "NovaFrame";
  return (
    <section className="page-pad fade-in">
      <div className="placeholder-page">
        <p>{title}</p>
        <h1>{title}</h1>
        <h2>{placeholderPages[active]}</h2>
        <button>Open workflow</button>
      </div>
      <div className="tool-grid">
        {popularTools.slice(0, 6).map((tool) => (
          <button className="tool-card" key={tool.title}>
            <IconBox icon={tool.icon} />
            <h3>{tool.title}</h3>
            <p>{tool.desc}</p>
          </button>
        ))}
      </div>
    </section>
  );
}

function CurrentPage({ active, setActive }: { active: PageId; setActive: (page: PageId) => void }) {
  const page = useMemo(() => {
    if (active === "explore") return <ExplorePage setActive={setActive} />;
    if (active === "image") return <CatalogPage features={imageFeatures} models={imageModels} title="Image" />;
    if (active === "video") return <CatalogPage features={videoFeatures} models={videoModels} title="Video" />;
    if (active === "audio") return <AudioPage />;
    if (active === "supercomputer") return <SupercomputerPage />;
    if (active === "mcp") return <MarketplacePage />;
    return <PlaceholderPage active={active} />;
  }, [active, setActive]);

  return page;
}

export default function Home() {
  const [active, setActive] = useState<PageId>("explore");

  return (
    <main className="nova-root">
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <TopNav active={active} setActive={setActive} />
      <CurrentPage active={active} setActive={setActive} />
    </main>
  );
}

const styles = `
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;background:#07090d;color:#fff;font-family:Inter,Arial,Helvetica,sans-serif}
button,input,textarea,select{font:inherit}
button,a{transition:transform .22s ease,border-color .22s ease,background .22s ease,box-shadow .22s ease,color .22s ease}
button{cursor:pointer}
.nova-root{min-height:100vh;background:#07090d;color:#fff;overflow-x:hidden}
.topbar{position:sticky;top:0;z-index:50;display:flex;align-items:center;gap:14px;height:56px;padding:0 18px;background:rgba(7,9,13,.86);border-bottom:1px solid rgba(255,255,255,.08);backdrop-filter:blur(20px)}
.brand{display:flex;align-items:center;gap:10px;background:transparent;border:0;color:#fff;font-weight:800;font-size:18px;white-space:nowrap}
.brand-mark{display:grid;place-items:center;width:32px;height:32px;border-radius:8px;background:#fff;color:#07090d;font-weight:950}
.nav-scroll{display:flex;align-items:center;gap:3px;flex:1;min-width:0;overflow-x:auto;scrollbar-width:thin}
.nav-item{position:relative;display:flex;align-items:center;gap:6px;min-height:36px;padding:0 9px;border:0;border-radius:8px;background:transparent;color:#c8cbd1;font-size:14px;font-weight:700;white-space:nowrap}
.nav-item:hover,.nav-item.active{background:#121419;color:#ccff00;transform:translateY(-1px)}
.nav-new,.sale,.badge{display:inline-flex;align-items:center;justify-content:center;border-radius:5px;background:#ccff00;color:#111;font-size:9px;font-weight:950;line-height:1;padding:4px 6px;text-transform:uppercase}
.sale,.badge-trending{background:#ff1f8f;color:#fff}
.badge-exclusive{background:#fff;color:#111}.badge-top{background:#ccff00;color:#111}.badge-new{background:#ccff00;color:#111}
.nav-actions{display:flex;align-items:center;gap:8px}
.search-mini,.ghost-btn,.primary-btn{height:36px;border-radius:10px;border:1px solid rgba(255,255,255,.08);background:#121419;color:#fff;padding:0 12px;font-weight:800}
.search-mini{color:#9ca3af;min-width:118px;text-align:left}.primary-btn{background:#ccff00;color:#111;border-color:#ccff00}.ghost-btn:hover,.search-mini:hover{background:rgba(255,255,255,.08)}
.page-pad{padding:24px;width:100%}
.fade-in{animation:fadeIn .45s ease both}@keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
.featured-row{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px;margin-bottom:16px}
.feature-card{min-height:260px;border:1px solid rgba(255,255,255,.08);border-radius:16px;background:#121419;color:#fff;text-align:left;padding:0;overflow:hidden;box-shadow:0 12px 34px rgba(0,0,0,.18)}
.feature-card:hover,.tool-card:hover,.product-card:hover,.model-card:hover,.connector-card:hover,.super-tool:hover{transform:translateY(-6px);box-shadow:0 22px 60px rgba(204,255,0,.12);border-color:rgba(204,255,0,.32)}
.feature-media{height:190px;position:relative;background:linear-gradient(135deg,#18202c,#293241)}
.feature-card.white .feature-media{background:#f4f1e8}.feature-card.art .feature-media{background:conic-gradient(from 120deg,#ff1f8f,#2563eb,#ccff00,#ff8a00,#ff1f8f)}.feature-card.minecraft .feature-media{background:linear-gradient(135deg,#5ca35c,#6fb4ff 52%,#7f5533)}
.media-orb{position:absolute;inset:30px;border-radius:22px;background:radial-gradient(circle at 30% 30%,rgba(255,255,255,.72),transparent 30%),linear-gradient(135deg,rgba(0,0,0,.2),rgba(255,255,255,.1));filter:blur(.2px)}
.feature-card h3{margin:14px 16px 6px;font-size:18px;text-transform:uppercase}.feature-card p{margin:0 16px 16px;color:#9ca3af;font-size:14px;line-height:1.45}
.hub-panel,.mega-panel,.market-hero{border:1px solid rgba(255,255,255,.08);border-radius:24px;background:rgba(18,20,25,.74);backdrop-filter:blur(20px);box-shadow:0 24px 80px rgba(0,0,0,.22);padding:18px;margin-bottom:24px}
.search-row{display:flex;align-items:center;gap:10px;height:54px;border-radius:18px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08);padding:0 16px;color:#9ca3af}
.search-row input{width:100%;background:transparent;border:0;outline:0;color:#fff;font-size:16px}
.tab-row{display:flex;gap:8px;flex-wrap:wrap;margin:12px 0 20px}.tab-row button{height:34px;border-radius:999px;border:1px solid rgba(255,255,255,.1);background:transparent;color:#d9dce2;padding:0 16px;font-weight:800}.tab-row button.active,.tab-row button:hover{background:rgba(255,255,255,.1);color:#fff}
.explore-grid{display:grid;grid-template-columns:1.15fr 3fr;gap:16px}
.super-card{position:relative;min-height:260px;border:1px solid rgba(255,255,255,.08);border-radius:18px;background:radial-gradient(circle at 75% 35%,rgba(204,255,0,.18),transparent 28%),linear-gradient(135deg,rgba(35,66,73,.85),rgba(18,20,25,.94));color:#fff;text-align:left;padding:26px;overflow:hidden}
.super-card h2{font-size:28px;margin:0 0 12px}.super-card p{color:#cbd5dd;max-width:270px;line-height:1.55}.super-card button,.game-card button,.super-tool span{margin-top:34px;border:0;border-radius:12px;background:#fff;color:#111;padding:13px 20px;font-weight:900}
.floating-stack{position:absolute;right:18px;bottom:10px;width:210px;height:170px}.floating-stack span{position:absolute;width:78px;height:78px;border-radius:18px;background:linear-gradient(135deg,#ccff00,#ff1f8f);box-shadow:0 18px 40px rgba(0,0,0,.28);animation:float 4s ease-in-out infinite}.floating-stack span:nth-child(2){right:30px;top:45px;animation-delay:.8s}.floating-stack span:nth-child(3){left:50px;bottom:0;animation-delay:1.6s}
@keyframes float{0%,100%{transform:translateY(0) rotate(-8deg)}50%{transform:translateY(-18px) rotate(8deg)}}
.product-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
.product-card,.tool-card,.model-card,.list-card,.connector-card,.super-tool{border:1px solid rgba(255,255,255,.08);border-radius:16px;background:#121419;color:#fff;text-align:left;padding:20px}
.product-card>div{display:flex;align-items:center;justify-content:space-between;margin-bottom:24px}.product-card h3,.tool-card h3,.model-card h3,.list-card h3,.connector-card h3,.super-tool h3{margin:0 0 8px;font-size:17px}.product-card p,.tool-card p,.model-card p,.list-card p,.connector-card p,.super-tool p{margin:0;color:#9ca3af;font-size:14px;line-height:1.45}
.icon-box{display:grid;place-items:center;width:42px;height:42px;border-radius:12px;background:rgba(255,255,255,.06);color:#fff;font-weight:950}
.games-banner{position:relative;min-height:500px;border:1px solid rgba(255,255,255,.08);border-radius:24px;background:radial-gradient(circle at 50% 110%,#ccff00 0,#667d0b 33%,#121419 72%);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;overflow:hidden;margin:24px 0}
.games-banner p{color:#ffb26b;font-weight:900}.games-banner h1{font-size:clamp(44px,7vw,86px);line-height:1;margin:10px 0}.games-banner h2{color:#c9cbd1;font-size:18px}.float-icon{position:absolute;font-size:48px;filter:drop-shadow(0 16px 20px rgba(0,0,0,.36));animation:float 5s ease-in-out infinite}.heart{left:16%;bottom:18%}.bolt{right:17%;top:22%;color:#ffd400}.potion{left:50%;bottom:8%;color:#65e4ff}.diamond{right:35%;bottom:20%;color:#9ee7ff}.coin{left:28%;top:25%;color:#ffdc5e}
.section-title{display:flex;align-items:end;justify-content:space-between;margin:28px 0 16px}.section-title p,.catalog-head p,.market-hero p{margin:0 0 8px;color:#ccff00;text-transform:uppercase;font-size:12px;font-weight:950;letter-spacing:.08em}.section-title h2,.catalog-head h1,.market-hero h1{margin:0;font-size:clamp(26px,4vw,46px);letter-spacing:-.04em}
.tool-grid,.model-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}.model-grid.compact{grid-template-columns:repeat(4,minmax(0,1fr))}
.catalog-head{margin:14px 0 18px}.mega-panel{display:grid;grid-template-columns:1fr 1.1fr;gap:24px}.mega-panel h2{color:#9ca3af;margin:0 0 14px;font-size:15px;font-weight:600}.stack-list{display:grid;gap:10px}.list-card,.model-card{display:grid;grid-template-columns:auto 1fr;gap:14px;align-items:center;padding:12px 14px}.list-card h3,.model-card h3{display:flex;align-items:center;gap:8px;font-size:16px}.model-card small{display:block;color:#ccff00;margin-bottom:4px;font-weight:800}
.audio-page{position:relative;min-height:calc(100vh - 56px);display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;background:radial-gradient(circle at 50% 45%,rgba(255,31,143,.18),transparent 24%),#090a0d;padding:80px 24px}.audio-glow{position:absolute;inset:auto 0 0;height:260px;background:linear-gradient(180deg,transparent,rgba(204,255,0,.08));filter:blur(8px)}.audio-hero{text-align:center;z-index:1}.audio-hero p{color:#9ca3af;font-weight:950}.audio-hero h1{max-width:640px;font-size:clamp(38px,5vw,68px);line-height:1.05;background:linear-gradient(90deg,#ff7bbc,#ffe08a);-webkit-background-clip:text;color:transparent}.audio-visualizer{position:absolute;bottom:120px;display:flex;align-items:end;gap:10px;opacity:.18}.audio-visualizer span{width:12px;border-radius:8px;background:#9ca3af}.voice-panel{z-index:2;width:min(440px,92vw);border:1px solid rgba(255,255,255,.08);border-radius:18px;background:rgba(18,20,25,.86);backdrop-filter:blur(20px);padding:10px}.voice-panel button{display:grid;grid-template-columns:auto 1fr auto;gap:12px;align-items:center;width:100%;border:0;border-radius:12px;background:transparent;color:#fff;padding:12px;text-align:left}.voice-panel button.active,.voice-panel button:hover{background:rgba(255,255,255,.07)}.voice-panel strong{color:#ccff00}.audio-generator{z-index:2;display:flex;gap:12px;margin-top:18px}.audio-generator button{border:1px solid rgba(255,255,255,.08);border-radius:14px;background:#121419;color:#fff;padding:16px 28px;font-weight:950}.audio-generator button:last-child{background:#a3bb26;color:#111}
.super-page{padding:24px}.super-hero{min-height:560px;border-radius:28px;background:radial-gradient(circle at 50% 86%,#ccff00 0,#819d0f 34%,#121419 73%);border:1px solid rgba(255,255,255,.08);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:34px}.super-logo{display:grid;place-items:center;width:82px;height:82px;border-radius:22px;background:#ccff00;color:#111;font-size:42px;font-weight:950;box-shadow:0 20px 60px rgba(204,255,0,.25)}.super-hero h1{font-size:clamp(34px,5vw,64px);margin:28px 0 12px}.super-hero p{color:#c9cbd1;font-size:17px}.prompt-bar{display:flex;align-items:center;gap:12px;width:min(880px,92vw);margin-top:34px;border:2px solid rgba(0,0,0,.8);border-radius:28px;background:#18191c;padding:16px}.prompt-bar input{flex:1;background:transparent;border:0;outline:0;color:#fff}.prompt-bar button,.prompt-bar span{border:0;border-radius:999px;background:#25272c;color:#fff;padding:10px 14px;font-weight:850}.prompt-bar button:last-child{background:#ccff00;color:#111}
.game-card{display:grid;grid-template-columns:1fr .8fr;gap:20px;margin:24px 0;border:1px solid rgba(255,255,255,.08);border-radius:24px;background:#121419;padding:26px;overflow:hidden}.game-card p{color:#ccff00;text-transform:uppercase;font-weight:950}.game-card h2{font-size:34px;margin:0 0 8px}.game-card span{color:#9ca3af}.game-art{position:relative;min-height:210px;border-radius:18px;background:linear-gradient(135deg,rgba(204,255,0,.14),rgba(255,31,143,.18))}.game-art span{position:absolute;font-size:52px;animation:float 4s ease-in-out infinite}.game-art span:nth-child(1){left:22%;top:28%}.game-art span:nth-child(2){right:24%;top:18%;color:#ffdb38}.game-art span:nth-child(3){left:48%;bottom:18%;color:#65e4ff}
.super-tool-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}.super-tool span{display:inline-block;margin-top:16px;padding:9px 16px}
.market-hero h2{color:#9ca3af;font-size:18px;font-weight:500;max-width:760px}.connector-section{margin-top:26px}.connector-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}.connector-card{display:grid;grid-template-columns:auto 1fr;gap:12px;position:relative}.connector-card>span{grid-column:1/-1;justify-self:start;border-radius:10px;background:rgba(204,255,0,.12);color:#ccff00;padding:9px 13px;font-weight:950}.connector-card small{display:block;margin-top:10px;color:#6f7682}
.placeholder-page{min-height:360px;border:1px solid rgba(255,255,255,.08);border-radius:24px;background:radial-gradient(circle at 50% 10%,rgba(204,255,0,.12),transparent 24%),#121419;padding:40px;display:flex;flex-direction:column;justify-content:center}.placeholder-page p{color:#ccff00;text-transform:uppercase;font-weight:950}.placeholder-page h1{font-size:clamp(44px,7vw,84px);margin:0}.placeholder-page h2{color:#9ca3af;max-width:720px}.placeholder-page button{width:fit-content;border:0;border-radius:14px;background:#ccff00;color:#111;padding:14px 20px;font-weight:950}
@media(max-width:1200px){.featured-row{grid-template-columns:repeat(2,1fr)}.explore-grid,.mega-panel,.game-card{grid-template-columns:1fr}.product-grid,.tool-grid,.model-grid,.model-grid.compact,.connector-grid,.super-tool-grid{grid-template-columns:repeat(2,1fr)}.nav-actions .search-mini{display:none}}
@media(max-width:720px){.topbar{height:auto;align-items:flex-start;flex-wrap:wrap;padding:10px}.brand{width:100%}.nav-scroll{order:3;width:100%;flex-basis:100%}.nav-actions{margin-left:auto}.ghost-btn{display:none}.page-pad,.super-page{padding:14px}.featured-row,.product-grid,.tool-grid,.model-grid,.model-grid.compact,.connector-grid,.super-tool-grid{grid-template-columns:1fr}.feature-card{min-height:220px}.feature-media{height:140px}.prompt-bar{flex-direction:column;align-items:stretch;border-radius:20px}.audio-generator{flex-direction:column;width:min(440px,92vw)}.super-hero{min-height:500px;padding:22px}.games-banner{min-height:380px}.catalog-head h1{font-size:34px}.list-card,.model-card{grid-template-columns:auto 1fr}.section-title{display:block}}
`;
