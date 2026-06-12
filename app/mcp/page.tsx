import StudioLanding from "@/components/StudioLanding";

export default function McpPage() {
  return (
    <StudioLanding
      activeNav="mcp"
      ctaHref="/generate"
      ctaLabel="Connect"
      eyebrow="MCP & CLI"
      features={[
        { title: "One connection", desc: "Add the MCP server URL in your agent settings and authenticate with your account." },
        { title: "30+ models", desc: "Your agent gets image, video and audio models behind one generation layer." },
        { title: "Image & video generation", desc: "From stills to cinematic video, choose models and generate up to 4K." },
        { title: "Same credits", desc: "Connected agents use the same credit system as the Lumenfield workspace." },
        { title: "Asset history", desc: "Browse generation history and reference past images or videos as starting points." },
        { title: "Works everywhere", desc: "Any MCP-compatible client can connect once the server layer is enabled." },
      ]}
      tagline="Connect Lumenfield to AI agents and generate cinematic images, videos and ads straight from your prompts."
      title="Lumenfield MCP for any AI agent"
    />
  );
}
