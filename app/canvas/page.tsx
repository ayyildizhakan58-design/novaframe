import StudioLanding from "@/components/StudioLanding";

export default function CanvasPage() {
  return (
    <StudioLanding
      activeNav="canvas"
      ctaHref="/generate"
      eyebrow="Canvas"
      features={[
        { title: "Infinite canvas", desc: "Drop references, crops and generations anywhere and arrange them freely." },
        { title: "Edit in place", desc: "Inpaint, relight and adjust without leaving the workspace." },
        { title: "Send to studio", desc: "Push any composition into the generator as a starting frame." },
        { title: "Iterate fast", desc: "Compare variations side by side and keep the strongest direction." },
      ]}
      tagline="Arrange references, edit images and shape your composition on an infinite canvas, then send it to generation."
      title="A visual workspace for composition"
    />
  );
}
