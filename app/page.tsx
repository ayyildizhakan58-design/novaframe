import Link from "next/link";

const navItems = ["Explore", "Image", "Video", "Audio", "Marketing", "Cinema", "AI Influencer", "Canvas", "Apps"];

const tools = [
  ["C3.5", "Cinema 3.5", "AI director"],
  ["SD", "Seedance 2.0", "720p video"],
  ["AD", "Marketing", "Product ads"],
  ["AI", "AI Influencer", "Virtual creators"],
  ["NV", "Nano Visual", "Images"],
  ["VO", "Audio Studio", "30+ voices"],
  ["CA", "Canvas", "AI workspace"],
];

const presets = [
  "Baseball Game",
  "Drift Racing",
  "CGI Breakdown",
  "Storm Giant",
  "Zombie Dance",
  "Red Carpet",
  "Neon City",
  "Office CCTV",
  "Dragon Fantasy",
  "Cloud Surf",
  "On Fire",
  "Mukbang",
];

const influencers = ["Aurora V", "Kai X", "Lumen One"];
const tabs = ["Nano Visual Pro", "Kling 3.0", "Lumenfield Soul", "Cinema App", "SeedMotion 2.0"];

function Logo({ small = false }: { small?: boolean }) {
  return (
    <div className="lf-logo">
      <span className={small ? "lf-logo-icon small" : "lf-logo-icon"}>L</span>
      <strong>
        Lumen<span>field</span>
      </strong>
    </div>
  );
}

function Divider({ label }: { label: string }) {
  return (
    <div className="lf-divider">
      <span>{label}</span>
      <i />
    </div>
  );
}

export default function Home() {
  return (
    <main className="lf-page">
      <nav className="lf-nav">
        <Logo />
        <div className="lf-nav-links">
          {navItems.map((item, index) => (
            <Link className={index === 0 ? "active" : ""} href={item === "Cinema" ? "/generate" : `#${item.toLowerCase().replaceAll(" ", "-")}`} key={item}>
              {item}
            </Link>
          ))}
          <Link href="#pricing">
            Pricing <span>30% OFF</span>
          </Link>
        </div>
        <div className="lf-lang">
          <button>EN</button>
          <button>DE</button>
          <button>FR</button>
        </div>
        <Link className="lf-login" href="#login">
          Log in
        </Link>
        <Link className="lf-signup" href="/generate">
          Sign up
        </Link>
      </nav>

      <section className="lf-hero" id="explore">
        <div className="lf-hero-grid" />
        <div className="lf-hero-glow" />
        <div className="lf-hero-ghost">LUMEN</div>
        <div className="lf-hero-badge">
          <span />
          The AI Creative Command Center
        </div>
        <h1>
          Create stunning <em>video</em>
          <br />
          with one command.
        </h1>
        <p>
          All models. All modalities. One platform built
          <br />
          for creators who move fast.
        </p>
        <div className="lf-hero-actions">
          <Link href="/generate">Launch Studio</Link>
          <Link href="#apps">Explore Apps</Link>
        </div>
        <div className="lf-stats">
          {[
            ["2M+", "Creators"],
            ["50+", "AI Models"],
            ["10B+", "Frames rendered"],
            ["99.9%", "Uptime"],
          ].map(([value, label]) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="lf-section" id="apps">
        <p className="lf-label">Featured Tools</p>
        <div className="lf-tools">
          {tools.map(([icon, name, desc]) => (
            <Link className="lf-tool-card" href="/generate" key={name}>
              <b>{icon}</b>
              <strong>{name}</strong>
              <span>{desc}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="lf-section">
        <p className="lf-label">Viral Presets</p>
        <div className="lf-presets">
          {presets.map((preset) => (
            <Link href="/generate" key={preset}>
              {preset}
            </Link>
          ))}
        </div>
      </section>

      <Divider label="Cinema Studio" />
      <section className="lf-studio" id="cinema">
        <aside>
          <Logo small />
          {["Home", "My Elements", "My Favorites", "Community Feed", "Projects"].map((item) => (
            <Link href="/generate" key={item}>
              {item}
            </Link>
          ))}
          <div />
          <Link className="lf-new-project" href="/generate">
            + New Project
          </Link>
          <Link className="lf-offer" href="#pricing">
            30% OFF
          </Link>
        </aside>
        <div className="lf-studio-main">
          <div className="lf-workspace">
            <div>
              <h2>CREATE YOUR FIRST PROJECT.</h2>
              <h3>GENERATE THE IMPOSSIBLE.</h3>
              <div className="lf-result-row">
                {["Cinema 3.5", "Kling 3.0", "Seedance 2.0"].map((model, index) => (
                  <Link className={`lf-result-card r${index + 1}`} href="/generate" key={model}>
                    <span>NEW</span>
                    <b>Play</b>
                    <strong>{model}</strong>
                    <small>{index === 0 ? "16:9" : index === 1 ? "9:16" : "1:1"} - 8s - {index === 1 ? "4K" : "1080p"}</small>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="lf-composer">
            <div className="lf-compose-top">
              <textarea placeholder="a futuristic city at dusk, golden hour, slow dolly in, cinematic..." />
              <button>
                <span /> Cinema Studio 3.5
              </button>
              <label>
                Aspect
                <select>
                  <option>16:9</option>
                  <option>9:16</option>
                  <option>1:1</option>
                </select>
              </label>
              <label>
                Res
                <select>
                  <option>1080p</option>
                  <option>4K</option>
                  <option>720p</option>
                </select>
              </label>
              <label>
                Duration
                <select>
                  <option>8s</option>
                  <option>4s</option>
                  <option>15s</option>
                </select>
              </label>
            </div>
            <div className="lf-compose-bottom">
              <button>+ Start Frame</button>
              <button>+ End Frame</button>
              <Link href="/generate">Generate</Link>
            </div>
          </div>
        </div>
      </section>

      <Divider label="Marketing Studio" />
      <section className="lf-marketing" id="marketing">
        {["UGC Ad", "Product Demo", "Luxury Ad"].map((item, index) => (
          <Link className={`lf-ad-card a${index + 1}`} href="/marketing-studio" key={item}>
            <b>Play</b>
            <strong>{item}</strong>
            <span>{index === 0 ? "Strong Hook" : index === 1 ? "Question Hook" : "Social Proof"} - 9:16</span>
          </Link>
        ))}
        <div>
          <p>Lumenfield Marketing Studio</p>
          <h2>
            TURN ANY PRODUCT
            <br />
            INTO A <span>VIDEO AD</span>
          </h2>
          <small>Upload product - choose style - get 9:16 ads in seconds</small>
          <Link href="/marketing-studio">Generate Ad</Link>
        </div>
      </section>

      <Divider label="AI Influencer Builder" />
      <section className="lf-influencer" id="ai-influencer">
        <aside>
          <p>My Influencers</p>
          {influencers.map((name) => (
            <Link href="/ai-influencer" key={name}>
              <i />
              <span>{name}</span>
            </Link>
          ))}
        </aside>
        <div className="lf-inf-preview">
          <div>
            <i />
            <b />
            <strong>Lumenfield Character</strong>
            <span>Human - Female</span>
          </div>
          <Link href="/ai-influencer">Generate Influencer</Link>
        </div>
        <div className="lf-builder">
          <h2>Build Your AI Influencer</h2>
          {[
            ["Character Type", ["Human", "Alien", "Elf", "Octopus", "Mantis"]],
            ["Gender", ["Female", "Male", "Non-binary", "Trans man"]],
            ["Skin Color", ["dark brown", "white", "olive", "metallic", "purple"]],
            ["Eye Color", ["Brown", "Purple", "Amber", "Blue", "Red"]],
          ].map(([label, items]) => (
            <div key={label as string}>
              <p>{label as string}</p>
              <div>
                {(items as string[]).map((item, index) => (
                  <button className={index === 0 ? "active" : ""} key={item}>
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Divider label="Login Page" />
      <section className="lf-login-preview" id="login">
        <div>
          <Logo />
          <h2>Welcome back</h2>
          <p>
            Sign in to access your studio,
            <br />
            generations, and projects.
          </p>
          <button>G Continue with Google</button>
          <button>Continue with Apple</button>
        </div>
        <div>
          <strong>LUMEN</strong>
          <span />
          <nav>
            {tabs.map((tab, index) => (
              <button className={index === 0 ? "active" : ""} key={tab}>
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </section>

      <footer className="lf-footer" id="pricing">
        Lumenfield is an original platform for modern creative AI workflows.
      </footer>
    </main>
  );
}
