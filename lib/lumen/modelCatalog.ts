export type LumenFeature = {
  icon: string;
  title: string;
  desc: string;
  badge?: "NEW" | "TOP";
};

export type LumenModel = {
  icon: string;
  name: string;
  desc: string;
  badge?: "NEW" | "TOP" | "EXCLUSIVE";
};

export const imageFeatures: LumenFeature[] = [
  { icon: "▧", title: "Create Image", desc: "Generate AI images" },
  { icon: "▣", title: "Cinematic Cameras", desc: "Image generation with camera controls", badge: "TOP" },
  { icon: "⌘", title: "Canvas", desc: "Visual ideation meets repeatable workflows", badge: "NEW" },
  { icon: "∞", title: "Moodboard", desc: "Turn references into a focused board" },
  { icon: "✦", title: "AI Influencer", desc: "Create and manage your AI influencer" },
  { icon: "◌", title: "Relight", desc: "Adjust lighting and brightness" },
  { icon: "↗", title: "Image Upscale", desc: "Enhance image quality" },
  { icon: "◈", title: "Character Swap", desc: "Create consistent character swaps" },
];

export const imageModels: LumenModel[] = [
  { icon: "L", name: "Lumen Soul 2.0", desc: "Ultra-realistic fashion visuals", badge: "TOP" },
  { icon: "C", name: "Lumen Soul Cinema", desc: "Cinematic film-grade aesthetic" },
  { icon: "P", name: "Lumen Popcorn", desc: "Storyboard, edit, create" },
  { icon: "G", name: "GPT Image 2", desc: "4K images with strong text rendering", badge: "NEW" },
  { icon: "N", name: "Nano Banana 2", desc: "Pro quality at flash speed", badge: "NEW" },
  { icon: "F", name: "FLUX.2", desc: "Speed-optimized detail" },
  { icon: "R", name: "Recraft V4.1", desc: "Photorealistic and expressive generation" },
  { icon: "Z", name: "Z-Image", desc: "Instant lifelike portraits" },
];

export const videoFeatures: LumenFeature[] = [
  { icon: "▯", title: "Create Video", desc: "Generate AI videos" },
  { icon: "▦", title: "Cinema Studio", desc: "Cinematic video with AI director", badge: "TOP" },
  { icon: "⌘", title: "Canvas", desc: "Visual ideation meets repeatable workflows", badge: "NEW" },
  { icon: "◫", title: "Mixed Media", desc: "Create mixed media projects" },
  { icon: "▷", title: "Click to Ad", desc: "Turn product URLs into video ads" },
  { icon: "◉", title: "Lip Sync Studio", desc: "Create talking clips" },
  { icon: "✎", title: "Draw to Video", desc: "Sketch turns into a cinema" },
  { icon: "↗", title: "Video Upscale", desc: "Enhance video quality" },
];

export const videoModels: LumenModel[] = [
  { icon: "S", name: "Seedance 2.0", desc: "Most advanced video model", badge: "TOP" },
  { icon: "K", name: "Kling 3.0", desc: "Cinematic videos with audio", badge: "TOP" },
  { icon: "K", name: "Kling 3.0 Motion Control", desc: "Transfer motion from video to image" },
  { icon: "S", name: "Sora 2", desc: "Advanced video model" },
  { icon: "V", name: "Veo 3.1", desc: "Advanced AI video with sound" },
  { icon: "H", name: "HappyHorse", desc: "High ranked video and audio model" },
  { icon: "W", name: "Wan 2.7", desc: "First and end frame control", badge: "NEW" },
  { icon: "D", name: "Lumen DOP", desc: "VFX and camera control" },
];

export const exploreProducts = [
  { title: "SUPERCOMPUTER", desc: "Agents, automation, skills, connectors, AI drive and more", badge: "NEW" },
  { title: "MCP & CLI", desc: "Turn your assistant into a creative engine", badge: "NEW" },
  { title: "MARKETING STUDIO", desc: "Turn any product into a video ad", badge: "TRENDING" },
];

export const trendingTools = [
  { icon: "</>", title: "MCP & CLI", desc: "Automate your production", badge: "NEW" },
  { icon: "✦", title: "AI Influencer", desc: "Create and manage your AI influencer", badge: "TRENDING" },
  { icon: "✣", title: "Marketing Studio", desc: "Turn any product into a video ad" },
  { icon: "K", title: "Kling 3.0", desc: "Cinematic videos with audio", badge: "EXCLUSIVE" },
  { icon: "▦", title: "Cinema Studio", desc: "Versatile image styles by xAI" },
  { icon: "⌘", title: "Canvas", desc: "Full workflow on one canvas" },
];
