export type LumenBadge = "NEW" | "TOP" | "EXCLUSIVE" | "TRENDING";

export type LumenFeature = {
  icon: string;
  title: string;
  desc: string;
  badge?: LumenBadge;
};

export type LumenModel = {
  icon: string;
  name: string;
  desc: string;
  badge?: LumenBadge;
};

export type LumenProduct = {
  title: string;
  desc: string;
  badge?: LumenBadge;
};

export const imageFeatures: LumenFeature[] = [
  { icon: "IMG", title: "Create Image", desc: "Generate AI images" },
  { icon: "CAM", title: "Cinematic Cameras", desc: "Image generation with camera controls", badge: "TOP" },
  { icon: "CAN", title: "Canvas", desc: "Visual ideation meets repeatable workflows", badge: "NEW" },
  { icon: "MOO", title: "Moodboard", desc: "Turn references into a focused board" },
  { icon: "AI", title: "AI Influencer", desc: "Create and manage your AI influencer" },
  { icon: "LIT", title: "Relight", desc: "Adjust lighting and brightness" },
  { icon: "UP", title: "Image Upscale", desc: "Enhance image quality" },
  { icon: "CHR", title: "Character Swap", desc: "Create consistent character swaps" },
];

export const imageModels: LumenModel[] = [
  { icon: "LS", name: "Lumen Soul 2.0", desc: "Ultra-realistic fashion visuals", badge: "TOP" },
  { icon: "LC", name: "Lumen Soul Cinema", desc: "Cinematic film-grade aesthetic" },
  { icon: "LP", name: "Lumen Popcorn", desc: "Storyboard, edit, create" },
  { icon: "GI", name: "GPT Image 2", desc: "4K images with strong text rendering", badge: "NEW" },
  { icon: "NB", name: "Nano Banana 2", desc: "Pro quality at flash speed", badge: "NEW" },
  { icon: "FX", name: "FLUX.2", desc: "Speed-optimized detail" },
  { icon: "RC", name: "Recraft V4.1", desc: "Photorealistic and expressive generation" },
  { icon: "ZI", name: "Z-Image", desc: "Instant lifelike portraits" },
];

export const videoFeatures: LumenFeature[] = [
  { icon: "VID", title: "Create Video", desc: "Generate AI videos" },
  { icon: "CIN", title: "Cinema Studio", desc: "Cinematic video with AI director", badge: "TOP" },
  { icon: "CAN", title: "Canvas", desc: "Visual ideation meets repeatable workflows", badge: "NEW" },
  { icon: "MIX", title: "Mixed Media", desc: "Create mixed media projects" },
  { icon: "AD", title: "Click to Ad", desc: "Turn product URLs into video ads" },
  { icon: "LIP", title: "Lip Sync Studio", desc: "Create talking clips" },
  { icon: "DRW", title: "Draw to Video", desc: "Sketch turns into a cinema" },
  { icon: "UP", title: "Video Upscale", desc: "Enhance video quality" },
];

export const videoModels: LumenModel[] = [
  { icon: "SD", name: "Seedance 2.0", desc: "Most advanced video model", badge: "TOP" },
  { icon: "KG", name: "Kling 3.0", desc: "Cinematic videos with audio", badge: "TOP" },
  { icon: "KM", name: "Kling 3.0 Motion Control", desc: "Transfer motion from video to image" },
  { icon: "S2", name: "Sora 2", desc: "Advanced video model" },
  { icon: "V3", name: "Veo 3.1", desc: "Advanced AI video with sound" },
  { icon: "HH", name: "HappyHorse", desc: "High ranked video and audio model" },
  { icon: "W2", name: "Wan 2.7", desc: "First and end frame control", badge: "NEW" },
  { icon: "LD", name: "Lumen DOP", desc: "VFX and camera control" },
];

export const exploreProducts: LumenProduct[] = [
  { title: "SUPERCOMPUTER", desc: "Agents, automation, skills, connectors, AI drive and more", badge: "NEW" },
  { title: "MCP & CLI", desc: "Turn your assistant into a creative engine", badge: "NEW" },
  { title: "MARKETING STUDIO", desc: "Turn any product into a video ad", badge: "TRENDING" },
];

export const trendingTools: LumenFeature[] = [
  { icon: "CLI", title: "MCP & CLI", desc: "Automate your production", badge: "NEW" },
  { icon: "AI", title: "AI Influencer", desc: "Create and manage your AI influencer", badge: "TRENDING" },
  { icon: "MKT", title: "Marketing Studio", desc: "Turn any product into a video ad" },
  { icon: "KG", title: "Kling 3.0", desc: "Cinematic videos with audio", badge: "EXCLUSIVE" },
  { icon: "CIN", title: "Cinema Studio", desc: "Versatile image styles by xAI" },
  { icon: "CAN", title: "Canvas", desc: "Full workflow on one canvas" },
];
