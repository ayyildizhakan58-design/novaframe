
// src/app/apps/page.tsx  →  /apps
import StudioLanding from "@/components/StudioLanding";

export default function Page() {
  return (
    <StudioLanding
      eyebrow="Apps"
      title="One-click AI effects"
      tagline="Transform any content into professional ads, viral trends or artistic results with one tap."
      ctaLabel="Browse apps"
      ctaHref="#"
      features={[
        { title: "Professional", desc: "Virality Predictor, Similarity Score, Angles 2.0, Shots, Expand Image." },
        { title: "Enhance & Style", desc: "Skin Enhancer, AI Stylist, Relight, Outfit Swap, Style Snap." },
        { title: "Face & Identity", desc: "Face Swap, Recast, Character Swap, Headshot, Video Face Swap." },
        { title: "Ads & Products", desc: "Click to Ad, Billboard, Bullet Time, Truck Ad, Packshot." },
        { title: "Games & Characters", desc: "Game Dump, Nano Strike, Nano Theft, Simlife, Plushies." },
        { title: "Trending Templates", desc: "On Fire, Skibidi, Mukbang, Cloud Surf, Idol." },
      ]}
    />
  );
}
