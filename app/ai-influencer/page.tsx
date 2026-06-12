import StudioLanding from "@/components/StudioLanding";

export default function AiInfluencerPage() {
  return (
    <StudioLanding
      activeNav="influencer"
      ctaHref="/generate"
      eyebrow="AI Influencer"
      features={[
        { title: "Consistent identity", desc: "Train a persona once and keep the same face, look and style across generations." },
        { title: "Any scene", desc: "Place the persona in locations, outfits and moods without losing consistency." },
        { title: "Photo & video", desc: "Generate stills and short-form videos featuring your virtual talent." },
        { title: "Reusable across projects", desc: "Reference your persona in any studio with a single saved identity." },
      ]}
      tagline="Build a consistent virtual persona once and reuse it across every campaign, post and video."
      title="Create and manage virtual talent"
    />
  );
}
