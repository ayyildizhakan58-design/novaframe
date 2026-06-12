import Link from "next/link";

const navItems = [
  { href: "#platform", label: "Platform" },
  { href: "#studios", label: "Studios" },
  { href: "#models", label: "Models" },
  { href: "#workflow", label: "Workflow" },
  { href: "#pricing", label: "Pricing" },
];

const studios = [
  {
    title: "Cinema Studio",
    text: "Prompt, reference frames, camera direction and model routing for cinematic video generation.",
    href: "/generate",
  },
  {
    title: "Marketing Studio",
    text: "Turn product URLs, images and brand notes into structured ad concepts and vertical campaigns.",
    href: "/marketing-studio",
  },
  {
    title: "AI Influencer",
    text: "Create reusable virtual talent, define identity traits and generate consistent campaign assets.",
    href: "/ai-influencer",
  },
  {
    title: "Canvas",
    text: "Organize ideas, references and generated assets in one visual production workspace.",
    href: "/canvas",
  },
];

const modelGroups: Array<[string, string[]]> = [
  ["Image", ["GPT Image 2", "Recraft V4.1", "Nano Banana Pro", "FLUX.2"]],
  ["Video", ["Seedance 2.0", "Kling 3.0", "Google Veo 3.1", "Minimax Hailuo"]],
  ["Audio", ["ElevenLabs", "Voice Lab", "Narration", "Lipsync"]],
];

const workflow = [
  ["01", "Brief", "Start with a prompt, product URL, upload, reference frame or campaign goal."],
  ["02", "Route", "Lumenfield selects the best studio, model and credit cost for the request."],
  ["03", "Generate", "Create images, videos, audio or ads with progress tracking and clear outputs."],
  ["04", "Library", "Save results to a reusable workspace for future campaigns and edits."],
];

const integrations = ["fal.ai", "OpenAI", "ElevenLabs", "Stripe", "Supabase", "Vercel", "Google Auth", "SMS OTP"];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#070708] text-[#f7f3ea]">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070708]/88 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-5">
          <Link className="flex items-center gap-3" href="/">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-gradient-to-br from-[#ff4da6] via-[#e8006f] to-[#6d28d9] text-sm font-black text-white shadow-[0_0_26px_rgba(232,0,111,.35)]">
              L
            </span>
            <span className="text-xl font-semibold tracking-tight">Lumenfield</span>
          </Link>

          <nav className="hidden flex-1 items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <a className="rounded-md px-3 py-2 text-sm text-white/58 hover:bg-white/[.06] hover:text-white" href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="ml-auto hidden items-center overflow-hidden rounded-md border border-white/10 sm:flex">
            {["EN", "DE", "FR"].map((lang, index) => (
              <button className={`px-3 py-2 text-xs font-semibold ${index === 0 ? "bg-white text-[#070708]" : "text-white/48"}`} key={lang}>
                {lang}
              </button>
            ))}
          </div>

          <Link className="hidden rounded-md border border-white/12 px-4 py-2 text-sm text-white/72 hover:bg-white/[.06] sm:block" href="#auth">
            Sign in
          </Link>
          <Link className="rounded-md bg-[#f7f3ea] px-4 py-2 text-sm font-semibold text-[#070708] hover:bg-white" href="/generate">
            Launch studio
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute left-1/2 top-20 h-72 w-[680px] -translate-x-1/2 rounded-full bg-[#e8006f]/15 blur-3xl" />
        <div className="pointer-events-none absolute left-1/2 top-24 hidden -translate-x-1/2 select-none text-[15vw] font-black leading-none tracking-normal text-transparent opacity-50 [-webkit-text-stroke:1px_rgba(255,255,255,.07)] lg:block">
          LUMEN
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1.02fr_.98fr] lg:py-24">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[.045] px-3 py-1.5 text-xs text-white/62">
              <span className="h-1.5 w-1.5 rounded-full bg-[#e8006f]" />
              Creative AI operating system
            </div>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[.98] tracking-tight md:text-7xl">
              Generate campaigns, videos and characters from one studio.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/62">
              Lumenfield combines premium AI models, guided creative studios, credit tracking and production workflows for image, video, audio and ads.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link className="rounded-md bg-[#e8006f] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_48px_rgba(232,0,111,.28)] hover:bg-[#ff2c8b]" href="/generate">
                Start generating
              </Link>
              <a className="rounded-md border border-white/12 px-5 py-3 text-sm font-semibold text-white/72 hover:bg-white/[.06]" href="#studios">
                Explore studios
              </a>
            </div>
            <div className="mt-12 grid max-w-2xl grid-cols-3 gap-3">
              {[
                ["50+", "model routes"],
                ["4", "guided studios"],
                ["3", "languages"],
              ].map(([value, label]) => (
                <div className="rounded-lg border border-white/10 bg-white/[.045] p-4" key={label}>
                  <strong className="block text-2xl tracking-tight">{value}</strong>
                  <span className="mt-1 block text-sm text-white/45">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#111113]/90 p-4 shadow-2xl shadow-black/30">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-[#ff4da6]">Supercomputer</p>
                <h2 className="mt-1 text-2xl font-semibold">Studio router</h2>
              </div>
              <span className="rounded-full border border-[#e8006f]/35 bg-[#e8006f]/10 px-3 py-1 text-xs font-semibold text-[#ffb5d7]">
                2,480 credits
              </span>
            </div>
            <div className="rounded-lg border border-white/10 bg-black/30 p-3">
              <textarea
                className="h-32 w-full resize-none bg-transparent p-2 text-sm leading-6 text-white outline-none placeholder:text-white/28"
                defaultValue="A cinematic product reveal with controlled camera motion, soft reflections and premium studio lighting."
              />
              <div className="flex flex-col gap-3 border-t border-white/10 pt-3 sm:flex-row">
                <select className="min-h-11 flex-1 rounded-md border border-white/10 bg-[#101013] px-3 text-sm text-white outline-none">
                  <option>Auto select best model</option>
                  <option>Cinema Studio 3.5</option>
                  <option>Kling 3.0</option>
                  <option>Seedance 2.0</option>
                </select>
                <Link className="grid min-h-11 place-items-center rounded-md bg-[#e8006f] px-5 text-sm font-semibold text-white" href="/generate">
                  Generate
                </Link>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {["Create image", "Create video", "Marketing ad", "AI influencer"].map((item) => (
                <Link className="rounded-lg border border-white/10 bg-white/[.045] p-4 hover:border-[#e8006f]/50 hover:bg-[#e8006f]/10" href="/generate" key={item}>
                  <span className="mb-4 block h-8 rounded bg-gradient-to-r from-[#21404c] to-[#394823]" />
                  <strong className="block text-sm">{item}</strong>
                  <small className="mt-1 block text-white/45">Guided workflow</small>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16" id="studios">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-[#ff4da6]">Studios</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Built for production, not just prompting.</h2>
          </div>
          <Link className="hidden rounded-md border border-white/12 px-4 py-2 text-sm text-white/70 hover:bg-white/[.06] sm:block" href="/apps">
            View apps
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {studios.map((studio) => (
            <Link className="group rounded-xl border border-white/10 bg-white/[.04] p-5 hover:border-[#e8006f]/45 hover:bg-[#e8006f]/10" href={studio.href} key={studio.title}>
              <div className="mb-8 h-24 rounded-lg border border-white/10 bg-[radial-gradient(circle_at_30%_30%,rgba(232,0,111,.35),transparent_32%),linear-gradient(135deg,#15151a,#09090b)]" />
              <h3 className="text-lg font-semibold">{studio.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/55">{studio.text}</p>
              <span className="mt-5 inline-block text-sm font-semibold text-[#ff4da6] group-hover:text-white">Open studio</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[.025]" id="models">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-[#ff4da6]">Models</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">One interface for the best creative models.</h2>
            <p className="mt-5 text-base leading-7 text-white/56">
              Route every request through the right provider while keeping one credit balance, one history and one workflow.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {modelGroups.map(([title, items]) => (
              <div className="rounded-xl border border-white/10 bg-[#101012] p-5" key={title}>
                <h3 className="font-semibold">{title}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1.5 text-xs text-white/58" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16" id="workflow">
        <p className="text-xs font-bold uppercase tracking-wide text-[#ff4da6]">Workflow</p>
        <h2 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">From idea to production asset in four clear steps.</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {workflow.map(([step, title, text]) => (
            <div className="rounded-xl border border-white/10 bg-white/[.04] p-5" key={step}>
              <span className="grid h-8 w-8 place-items-center rounded-md bg-[#e8006f] text-sm font-black text-white">{step}</span>
              <h3 className="mt-6 text-lg font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/55">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#101012]" id="auth">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-14 lg:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-black/20 p-6">
            <p className="text-xs font-bold uppercase tracking-wide text-[#ff4da6]">Access</p>
            <h2 className="mt-2 text-2xl font-semibold">Google sign-in, SMS OTP and protected workspaces.</h2>
            <p className="mt-4 text-sm leading-6 text-white/56">Connect authentication to credits, generation history and saved assets.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/20 p-6" id="pricing">
            <p className="text-xs font-bold uppercase tracking-wide text-[#ff4da6]">Payments</p>
            <h2 className="mt-2 text-2xl font-semibold">Stripe credit packs for creators and studios.</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {["Starter 1,000", "Pro 5,000", "Studio 25,000"].map((plan) => (
                <button className="rounded-md border border-white/10 bg-white/[.04] px-3 py-3 text-sm text-white/72 hover:border-[#e8006f]/45" key={plan}>
                  {plan}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14">
        <p className="text-xs font-bold uppercase tracking-wide text-[#ff4da6]">Integrations</p>
        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
          {integrations.map((item) => (
            <span className="rounded-lg border border-white/10 bg-white/[.04] px-4 py-3 text-sm text-white/58" key={item}>
              {item}
            </span>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 px-5 py-8 text-center text-sm text-white/42">
        Lumenfield is an original platform for modern creative AI workflows.
      </footer>
    </main>
  );
}
