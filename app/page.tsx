"use client";

import { useMemo, useState } from "react";

import Header from "@/components/Header";

type Locale = "en" | "de" | "fr";
type NavId =
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

const dictionaries = {
  en: {
    nav: {
      explore: "Explore",
      image: "Image",
      video: "Video",
      audio: "Audio",
      supercomputer: "Supercomputer",
      mcp: "MCP & CLI",
      collab: "Collab",
      plugins: "Plugins",
      marketing: "Marketing Studio",
      cinema: "Cinema Studio",
      influencer: "AI Influencer",
      canvas: "Canvas",
      apps: "Apps",
    },
    common: {
      new: "New",
      launch: "Launch studio",
      login: "Sign in",
      credits: "Credits",
      generate: "Generate",
      checkout: "Checkout",
      run: "Run",
      modelSelect: "Auto select model",
      pricing: "Pricing and credits",
      currentJob: "Current job",
    },
    hero: {
      tags: ["Multi-model studio", "Stripe credits", "Google + SMS auth", "EN DE FR"],
      title: "One creative command center for image, video, audio and ads.",
      text:
        "Lumenfield unifies premium AI models, guided studios, plugins, payments and a shared asset library in one production workspace.",
      steps: [
        ["1", "Brief", "Prompt, URL, image, video or product feed"],
        ["2", "Route", "Best model and workflow selected"],
        ["3", "Deliver", "Assets stored in Library with credits tracked"],
      ],
    },
    studio: {
      prompt: "A cinematic product reveal with controlled camera motion",
      job: "Marketing Studio is preparing a 9:16 product ad and 4 stills.",
    },
    sections: {
      exploreEyebrow: "Explore",
      toolsTitle: "Production tools",
      imageTitle: "Image",
      videoTitle: "Video",
      modelsTitle: "Models",
      appsEyebrow: "Apps",
      appsTitle: "One-click workflows",
      accessEyebrow: "Access",
      accessTitle: "Google sign-in, SMS OTP and secure checkout",
      paymentEyebrow: "Payments",
      paymentTitle: "Credit card plans for creators, teams and studios",
      integrationsEyebrow: "Integrations",
      integrationsTitle: "Provider and plugin layer",
      footer: "Lumenfield AI Studio. Original platform architecture inspired by modern creative AI workflows.",
    },
    tools: {
      image: [
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
      ],
      video: [
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
      ],
      apps: [
        ["Virality Predictor", "Score hooks before publishing"],
        ["Expand Image", "Extend any image beyond its edges"],
        ["Skin Enhancer", "Natural realistic skin texture"],
        ["Outfit Swap", "Try on any outfit"],
        ["Background Remover", "Clean alpha output"],
        ["Billboard Ad", "Turn a photo into a billboard takeover"],
      ],
    },
    modelGroups: [
      ["Image models", ["GPT Image 2", "Recraft V4.1", "Nano Banana Pro", "Seedream 5.0", "FLUX.2", "Topaz"]],
      ["Video models", ["Seedance 2.0", "Kling 3.0", "Sora 2", "Google Veo 3.1", "Wan 2.7", "Minimax Hailuo"]],
      ["Audio models", ["ElevenLabs", "Voice Lab", "Music Studio", "Sound FX", "Lipsync", "Narration"]],
    ],
    categories: [
      "Professional",
      "Enhance & Style",
      "Face & Identity",
      "Video Editing",
      "Ads & Products",
      "Games & Characters",
      "Trending Templates",
    ],
    apps: [
      "Virality Predictor",
      "Similarity Score",
      "Expand Image",
      "Angles 2.0",
      "Relight",
      "Outfit Swap",
      "Video Background Remover",
      "Click to Ad",
    ],
    flows: ["Google OAuth or phone OTP", "Account and workspace created", "Stripe checkout opens", "Credits added by webhook"],
    plans: ["Starter 1,000", "Pro 5,000", "Studio 25,000"],
  },
  de: {
    nav: {
      explore: "Entdecken",
      image: "Bild",
      video: "Video",
      audio: "Audio",
      supercomputer: "Supercomputer",
      mcp: "MCP & CLI",
      collab: "Zusammenarbeit",
      plugins: "Plugins",
      marketing: "Marketing-Studio",
      cinema: "Cinema-Studio",
      influencer: "KI-Influencer",
      canvas: "Canvas",
      apps: "Apps",
    },
    common: {
      new: "Neu",
      launch: "Studio öffnen",
      login: "Anmelden",
      credits: "Credits",
      generate: "Generieren",
      checkout: "Zur Kasse",
      run: "Starten",
      modelSelect: "Modell automatisch wählen",
      pricing: "Preise und Credits",
      currentJob: "Aktueller Auftrag",
    },
    hero: {
      tags: ["Multi-Modell-Studio", "Stripe-Credits", "Google + SMS Anmeldung", "EN DE FR"],
      title: "Eine Kreativzentrale für Bild, Video, Audio und Werbung.",
      text:
        "Lumenfield vereint Premium-KI-Modelle, geführte Studios, Plugins, Zahlungen und eine gemeinsame Medienbibliothek in einem Produktionsraum.",
      steps: [
        ["1", "Briefing", "Prompt, URL, Bild, Video oder Produktdaten"],
        ["2", "Routing", "Das beste Modell und der passende Ablauf werden gewählt"],
        ["3", "Lieferung", "Ergebnisse landen mit Credit-Tracking in der Bibliothek"],
      ],
    },
    studio: {
      prompt: "Eine filmische Produktpräsentation mit kontrollierter Kamerabewegung",
      job: "Das Marketing-Studio erstellt eine 9:16 Produktanzeige und 4 Standbilder.",
    },
    sections: {
      exploreEyebrow: "Entdecken",
      toolsTitle: "Produktionswerkzeuge",
      imageTitle: "Bild",
      videoTitle: "Video",
      modelsTitle: "Modelle",
      appsEyebrow: "Apps",
      appsTitle: "Workflows mit einem Klick",
      accessEyebrow: "Zugang",
      accessTitle: "Google-Anmeldung, SMS-Code und sicherer Checkout",
      paymentEyebrow: "Zahlungen",
      paymentTitle: "Kreditkartenpakete für Creator, Teams und Studios",
      integrationsEyebrow: "Integrationen",
      integrationsTitle: "Anbieter- und Plugin-Ebene",
      footer: "Lumenfield AI Studio. Eigenständige Plattformarchitektur für moderne kreative KI-Workflows.",
    },
    tools: {
      image: [
        ["Bild erstellen", "KI-Bilder generieren"],
        ["Filmische Kameras", "Bildgenerierung mit Kamerasteuerung"],
        ["Moodboard", "Referenzen in ein fokussiertes Board verwandeln"],
        ["Soul ID Charakter", "Wiederverwendbare Charaktere erstellen"],
        ["KI-Influencer", "Virtuelle Talente erstellen und verwalten"],
        ["Fotodump", "Ästhetische Bildserien generieren"],
        ["Neu ausleuchten", "Position, Farbe und Helligkeit steuern"],
        ["Inpaint", "Bereich auswählen und Änderung beschreiben"],
        ["Bild hochskalieren", "Bildqualität verbessern"],
        ["Gesichtstausch", "Realistische Face-Swaps erstellen"],
        ["Charaktertausch", "Charaktere konsistent ersetzen"],
        ["Zeichnung zu Bearbeitung", "Skizzenmarkierungen in Edits verwandeln"],
        ["Fashion Factory", "Mode-Sets erstellen"],
      ],
      video: [
        ["Video erstellen", "KI-Videos generieren"],
        ["Cinema-Studio", "Filmisches Video mit KI-Regie"],
        ["Mixed Media", "Bild, Video und Referenzen kombinieren"],
        ["Video bearbeiten", "Szenen, Shots und Elemente bearbeiten"],
        ["Klick zu Anzeige", "Produkt-URLs in Videoanzeigen verwandeln"],
        ["Sora 2 Trends", "Ideen in virale Formate verwandeln"],
        ["Lipsync-Studio", "Sprechende Clips erstellen"],
        ["Zeichnung zu Video", "Skizzen werden zu Filmszenen"],
        ["UGC Factory", "Creator-Style-Videos bauen"],
        ["Video hochskalieren", "Videoqualität verbessern"],
        ["Vibe Motion", "Professionelle Motion Graphics"],
        ["Recast Studio", "Charaktere in Videos tauschen"],
      ],
      apps: [
        ["Viralitätsprognose", "Hooks vor der Veröffentlichung bewerten"],
        ["Bild erweitern", "Bilder über ihre Ränder hinaus erweitern"],
        ["Hautverbesserung", "Natürliche realistische Hautstruktur"],
        ["Outfit-Tausch", "Jedes Outfit ausprobieren"],
        ["Hintergrund entfernen", "Saubere Alpha-Ausgabe"],
        ["Billboard-Anzeige", "Ein Foto in eine Billboard-Kampagne verwandeln"],
      ],
    },
    modelGroups: [
      ["Bildmodelle", ["GPT Image 2", "Recraft V4.1", "Nano Banana Pro", "Seedream 5.0", "FLUX.2", "Topaz"]],
      ["Videomodelle", ["Seedance 2.0", "Kling 3.0", "Sora 2", "Google Veo 3.1", "Wan 2.7", "Minimax Hailuo"]],
      ["Audiomodelle", ["ElevenLabs", "Voice Lab", "Music Studio", "Sound FX", "Lipsync", "Erzählung"]],
    ],
    categories: [
      "Professionell",
      "Verbessern & Stil",
      "Gesicht & Identität",
      "Videobearbeitung",
      "Anzeigen & Produkte",
      "Spiele & Charaktere",
      "Trend-Vorlagen",
    ],
    apps: [
      "Viralitätsprognose",
      "Ähnlichkeitswert",
      "Bild erweitern",
      "Angles 2.0",
      "Neu ausleuchten",
      "Outfit-Tausch",
      "Video-Hintergrund entfernen",
      "Klick zu Anzeige",
    ],
    flows: ["Google OAuth oder SMS-Code", "Konto und Workspace werden erstellt", "Stripe Checkout öffnet sich", "Credits werden per Webhook gebucht"],
    plans: ["Starter 1.000", "Pro 5.000", "Studio 25.000"],
  },
  fr: {
    nav: {
      explore: "Explorer",
      image: "Image",
      video: "Vidéo",
      audio: "Audio",
      supercomputer: "Superordinateur",
      mcp: "MCP & CLI",
      collab: "Collaboration",
      plugins: "Plugins",
      marketing: "Studio marketing",
      cinema: "Studio cinéma",
      influencer: "Influenceur IA",
      canvas: "Canvas",
      apps: "Apps",
    },
    common: {
      new: "Nouveau",
      launch: "Ouvrir le studio",
      login: "Connexion",
      credits: "Crédits",
      generate: "Générer",
      checkout: "Paiement",
      run: "Lancer",
      modelSelect: "Choisir le modèle automatiquement",
      pricing: "Prix et crédits",
      currentJob: "Tâche en cours",
    },
    hero: {
      tags: ["Studio multi-modèles", "Crédits Stripe", "Google + SMS", "EN DE FR"],
      title: "Un centre créatif pour l'image, la vidéo, l'audio et la publicité.",
      text:
        "Lumenfield réunit modèles IA premium, studios guidés, plugins, paiements et bibliothèque partagée dans un seul espace de production.",
      steps: [
        ["1", "Brief", "Prompt, URL, image, vidéo ou flux produit"],
        ["2", "Routage", "Le meilleur modèle et le bon workflow sont sélectionnés"],
        ["3", "Livraison", "Les contenus sont stockés dans la bibliothèque avec suivi des crédits"],
      ],
    },
    studio: {
      prompt: "Une révélation produit cinématographique avec mouvement de caméra contrôlé",
      job: "Le Studio marketing prépare une publicité produit 9:16 et 4 visuels fixes.",
    },
    sections: {
      exploreEyebrow: "Explorer",
      toolsTitle: "Outils de production",
      imageTitle: "Image",
      videoTitle: "Vidéo",
      modelsTitle: "Modèles",
      appsEyebrow: "Apps",
      appsTitle: "Workflows en un clic",
      accessEyebrow: "Accès",
      accessTitle: "Connexion Google, code SMS et paiement sécurisé",
      paymentEyebrow: "Paiements",
      paymentTitle: "Forfaits carte bancaire pour créateurs, équipes et studios",
      integrationsEyebrow: "Intégrations",
      integrationsTitle: "Couche fournisseurs et plugins",
      footer: "Lumenfield AI Studio. Architecture originale pour les workflows créatifs IA modernes.",
    },
    tools: {
      image: [
        ["Créer une image", "Générer des images IA"],
        ["Caméras cinéma", "Génération d'image avec contrôle caméra"],
        ["Moodboard", "Transformer les références en tableau ciblé"],
        ["Personnage Soul ID", "Créer des personnages réutilisables"],
        ["Influenceur IA", "Créer et gérer des talents virtuels"],
        ["Photodump", "Générer des séries visuelles esthétiques"],
        ["Rééclairage", "Contrôler position, couleur et luminosité"],
        ["Inpaint", "Sélectionner une zone et décrire le changement"],
        ["Upscale image", "Améliorer la qualité de l'image"],
        ["Face Swap", "Créer des échanges de visage réalistes"],
        ["Échange de personnage", "Remplacer des personnages de façon cohérente"],
        ["Dessin vers édition", "Transformer des croquis en modifications"],
        ["Fashion Factory", "Créer des ensembles mode"],
      ],
      video: [
        ["Créer une vidéo", "Générer des vidéos IA"],
        ["Studio cinéma", "Vidéo cinématographique avec réalisateur IA"],
        ["Mixed Media", "Combiner image, vidéo et références"],
        ["Modifier la vidéo", "Modifier scènes, plans et éléments"],
        ["Clic vers pub", "Transformer des URL produit en publicités vidéo"],
        ["Tendances Sora 2", "Transformer des idées en formats viraux"],
        ["Studio lipsync", "Créer des clips parlants"],
        ["Dessin vers vidéo", "Le croquis devient une scène cinéma"],
        ["UGC Factory", "Créer des vidéos style créateur"],
        ["Upscale vidéo", "Améliorer la qualité vidéo"],
        ["Vibe Motion", "Motion design professionnel"],
        ["Recast Studio", "Échanger des personnages dans les vidéos"],
      ],
      apps: [
        ["Prédicteur viral", "Évaluer les accroches avant publication"],
        ["Étendre l'image", "Prolonger une image au-delà de ses bords"],
        ["Amélioration peau", "Texture de peau naturelle et réaliste"],
        ["Changement de tenue", "Essayer n'importe quelle tenue"],
        ["Suppression arrière-plan", "Sortie alpha propre"],
        ["Publicité billboard", "Transformer une photo en campagne d'affichage"],
      ],
    },
    modelGroups: [
      ["Modèles image", ["GPT Image 2", "Recraft V4.1", "Nano Banana Pro", "Seedream 5.0", "FLUX.2", "Topaz"]],
      ["Modèles vidéo", ["Seedance 2.0", "Kling 3.0", "Sora 2", "Google Veo 3.1", "Wan 2.7", "Minimax Hailuo"]],
      ["Modèles audio", ["ElevenLabs", "Voice Lab", "Music Studio", "Sound FX", "Lipsync", "Narration"]],
    ],
    categories: [
      "Professionnel",
      "Améliorer & styliser",
      "Visage & identité",
      "Montage vidéo",
      "Publicités & produits",
      "Jeux & personnages",
      "Modèles tendance",
    ],
    apps: [
      "Prédicteur viral",
      "Score de similarité",
      "Étendre l'image",
      "Angles 2.0",
      "Rééclairage",
      "Changement de tenue",
      "Suppression arrière-plan vidéo",
      "Clic vers pub",
    ],
    flows: ["Google OAuth ou code SMS", "Compte et espace de travail créés", "Stripe Checkout s'ouvre", "Crédits ajoutés par webhook"],
    plans: ["Starter 1 000", "Pro 5 000", "Studio 25 000"],
  },
} satisfies Record<Locale, unknown>;

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
  const [activeNav, setActiveNav] = useState<NavId>("explore");
  const [activeCategory, setActiveCategory] = useState(0);
  const t = dictionaries[locale];

  const activeTools = useMemo(() => {
    if (activeNav === "video" || activeNav === "cinema") return t.tools.video;
    if (activeNav === "apps") return t.tools.apps;
    return t.tools.image;
  }, [activeNav, t.tools.apps, t.tools.image, t.tools.video]);

  return (
    <main className="min-h-screen bg-[#09090b] text-white">
      <Header
        activeNav={activeNav}
        launchLabel={t.common.launch}
        locale={locale}
        loginLabel={t.common.login}
        navLabels={t.nav}
        newLabel={t.common.new}
        setActiveNav={setActiveNav}
        setLocale={(value) => {
          setLocale(value);
          setActiveCategory(0);
        }}
      />

      <section className="surface-grid border-b border-white/10">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-4 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:py-14">
          <div className="flex min-h-[560px] flex-col justify-between">
            <div>
              <div className="mb-5 flex flex-wrap gap-2">
                {t.hero.tags.map((item: string) => (
                  <span className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 text-xs text-white/70" key={item}>
                    {item}
                  </span>
                ))}
              </div>
              <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight text-white md:text-7xl">
                {t.hero.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">{t.hero.text}</p>
            </div>

            <div className="mt-10 grid gap-3 md:grid-cols-3">
              {t.hero.steps.map(([step, title, body]: string[]) => (
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
                <p>{t.nav.supercomputer}</p>
                <h2>{t.nav[activeNav]}</h2>
              </div>
              <span>
                {t.common.credits}: 2,480
              </span>
            </div>
            <div className="prompt-box">
              <textarea value={t.studio.prompt} readOnly />
              <div className="prompt-actions">
                <select aria-label="Model">
                  <option>{t.common.modelSelect}</option>
                  <option>GPT Image 2</option>
                  <option>Kling 3.0</option>
                  <option>Google Veo 3.1</option>
                  <option>ElevenLabs</option>
                </select>
                <button>{t.common.generate}</button>
              </div>
            </div>
            <div className="studio-grid">
              {activeTools.slice(0, 6).map(([name, desc]: string[]) => (
                <button className="tool-tile" key={name}>
                  <span />
                  <strong>{name}</strong>
                  <small>{desc}</small>
                </button>
              ))}
            </div>
            <div className="job-row">
              <div>
                <strong>{t.common.currentJob}</strong>
                <p>{t.studio.job}</p>
              </div>
              <span>68%</span>
            </div>
          </section>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-10">
        <div className="section-head">
          <div>
            <p>{t.sections.exploreEyebrow}</p>
            <h2>{t.sections.toolsTitle}</h2>
          </div>
          <a href="#payments">{t.common.pricing}</a>
        </div>

        <div className="tool-columns">
          <div className="tool-column">
            <h3>{t.sections.imageTitle}</h3>
            {t.tools.image.map(([name, desc]: string[]) => (
              <button className="list-tool" key={name}>
                <strong>{name}</strong>
                <span>{desc}</span>
              </button>
            ))}
          </div>
          <div className="tool-column">
            <h3>{t.sections.videoTitle}</h3>
            {t.tools.video.map(([name, desc]: string[]) => (
              <button className="list-tool" key={name}>
                <strong>{name}</strong>
                <span>{desc}</span>
              </button>
            ))}
          </div>
          <div className="tool-column">
            <h3>{t.sections.modelsTitle}</h3>
            {(t.modelGroups as [string, string[]][]).map(([title, items]) => (
              <div className="model-group" key={title}>
                <strong>{title}</strong>
                <div>
                  {items.map((item) => (
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
              <p>{t.sections.appsEyebrow}</p>
              <h2>{t.sections.appsTitle}</h2>
            </div>
            <div className="category-row">
              {t.categories.map((category: string, index: number) => (
                <button
                  className={activeCategory === index ? "category-active" : ""}
                  key={category}
                  onClick={() => setActiveCategory(index)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="app-grid">
            {t.apps.map((app: string, index: number) => (
              <article className="app-card" key={app}>
                <div className="app-preview">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div>
                  <p>{t.categories[activeCategory]}</p>
                  <h3>{app}</h3>
                  <button>{t.common.run}</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1440px] gap-4 px-4 py-10 lg:grid-cols-[1fr_1fr]">
        <div className="system-panel" id="auth">
          <p>{t.sections.accessEyebrow}</p>
          <h2>{t.sections.accessTitle}</h2>
          <div className="flow-list">
            {t.flows.map((item: string) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
        <div className="system-panel" id="payments">
          <p>{t.sections.paymentEyebrow}</p>
          <h2>{t.sections.paymentTitle}</h2>
          <div className="pricing-row">
            {t.plans.map((plan: string) => (
              <button key={plan}>{plan}</button>
            ))}
          </div>
          <a className="checkout-link" href="#studio">
            {t.common.checkout}
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 pb-12">
        <div className="section-head">
          <div>
            <p>{t.sections.integrationsEyebrow}</p>
            <h2>{t.sections.integrationsTitle}</h2>
          </div>
        </div>
        <div className="integration-grid">
          {integrations.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 px-4 py-6 text-center text-sm text-white/45">
        {t.sections.footer}
      </footer>
    </main>
  );
}
