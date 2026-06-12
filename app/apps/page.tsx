import StudioLanding from "@/components/StudioLanding";

export default function AppsPage() {
  return (
    <StudioLanding
      activeNav="apps"
      ctaHref="/generate"
      ctaLabel="Browse apps"
      eyebrow="Apps"
      features={[
        { title: "Professional", desc: "Virality Predictor, Similarity Score, Angles 2.0, Shots and Expand Image." },
        { title: "Enhance & Style", desc: "Skin Enhancer, AI Stylist, Relight, Outfit Swap and Style Snap." },
        { title: "Face & Identity", desc: "Face Swap, Recast, Character Swap, Headshot and Video Face Swap." },
        { title: "Ads & Products", desc: "Click to Ad, Billboard, Bullet Time, Truck Ad and Packshot." },
        { title: "Games & Characters", desc: "Game Dump, Nano Strike, Nano Theft, Simlife and plush characters." },
        { title: "Trending Templates", desc: "On Fire, Mukbang, Cloud Surf, Idol and viral social formats." },
      ]}
      tagline="Transform any content into professional ads, viral trends or artistic results with one tap."
      title="One-click AI effects"
    />
  );
}
