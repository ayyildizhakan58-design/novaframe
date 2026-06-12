export type ModelType = "image" | "video" | "audio" | "tool";
export type ModelProvider = "fal" | "elevenlabs" | "replicate";

export interface ModelEntry {
  id: string;
  label: string;
  type: ModelType;
  provider: ModelProvider;
  endpoint: string;
  creditCost: number;
  perSecond?: number;
  tier: 1 | 2 | 3;
  defaultParams?: Record<string, unknown>;
  needsImage?: boolean;
  needsMask?: boolean;
}

const IMAGE_MODELS: ModelEntry[] = [
  {
    id: "flux-2",
    label: "FLUX.2",
    type: "image",
    provider: "fal",
    endpoint: "fal-ai/flux-2-flex",
    creditCost: 6,
    tier: 1,
    defaultParams: { image_size: "landscape_16_9", num_images: 1 },
  },
  {
    id: "flux-dev",
    label: "FLUX.1 [dev]",
    type: "image",
    provider: "fal",
    endpoint: "fal-ai/flux/dev",
    creditCost: 5,
    tier: 1,
    defaultParams: { image_size: "landscape_16_9", num_images: 1 },
  },
  {
    id: "nano-banana-pro",
    label: "Nano Banana Pro",
    type: "image",
    provider: "fal",
    endpoint: "fal-ai/nano-banana-pro",
    creditCost: 30,
    tier: 1,
  },
  {
    id: "nano-banana-2",
    label: "Nano Banana 2",
    type: "image",
    provider: "fal",
    endpoint: "fal-ai/nano-banana",
    creditCost: 12,
    tier: 1,
  },
  {
    id: "gpt-image-2",
    label: "GPT Image 2",
    type: "image",
    provider: "fal",
    endpoint: "fal-ai/gpt-image-2",
    creditCost: 14,
    tier: 1,
    defaultParams: { image_size: "1024x1024" },
  },
  {
    id: "gpt-image-1-5",
    label: "GPT Image 1.5",
    type: "image",
    provider: "fal",
    endpoint: "fal-ai/gpt-image-1.5",
    creditCost: 10,
    tier: 1,
  },
  {
    id: "seedream-5-lite",
    label: "Seedream 5.0 lite",
    type: "image",
    provider: "fal",
    endpoint: "fal-ai/bytedance/seedream/v4",
    creditCost: 8,
    tier: 1,
    defaultParams: { image_size: "square_hd" },
  },
  {
    id: "recraft",
    label: "Recraft V4.1",
    type: "image",
    provider: "fal",
    endpoint: "fal-ai/recraft-v3",
    creditCost: 8,
    tier: 1,
    defaultParams: { style: "realistic_image" },
  },
  {
    id: "reve",
    label: "Reve",
    type: "image",
    provider: "fal",
    endpoint: "fal-ai/reve",
    creditCost: 8,
    tier: 1,
  },
  {
    id: "z-image",
    label: "Z-Image",
    type: "image",
    provider: "fal",
    endpoint: "fal-ai/z-image",
    creditCost: 6,
    tier: 1,
  },
  {
    id: "grok-image",
    label: "Grok Imagine",
    type: "image",
    provider: "fal",
    endpoint: "fal-ai/grok-imagine/image",
    creditCost: 8,
    tier: 1,
  },
];

const VIDEO_MODELS: ModelEntry[] = [
  {
    id: "seedance-2",
    label: "Seedance 2.0",
    type: "video",
    provider: "fal",
    endpoint: "fal-ai/bytedance/seedance/v2/pro/text-to-video",
    creditCost: 120,
    perSecond: 24,
    tier: 1,
    defaultParams: { duration: 5, aspect_ratio: "16:9", resolution: "1080p" },
  },
  {
    id: "kling-3",
    label: "Kling 3.0",
    type: "video",
    provider: "fal",
    endpoint: "fal-ai/kling-video/v3/pro/text-to-video",
    creditCost: 90,
    perSecond: 18,
    tier: 1,
    defaultParams: { duration: 5, aspect_ratio: "16:9" },
  },
  {
    id: "veo-3-1",
    label: "Google Veo 3.1",
    type: "video",
    provider: "fal",
    endpoint: "fal-ai/veo3.1",
    creditCost: 200,
    perSecond: 40,
    tier: 1,
    defaultParams: { duration: 8, aspect_ratio: "16:9", generate_audio: true },
  },
  {
    id: "veo-3-1-lite",
    label: "Google Veo 3.1 Lite",
    type: "video",
    provider: "fal",
    endpoint: "fal-ai/veo3.1/lite",
    creditCost: 100,
    perSecond: 20,
    tier: 1,
    defaultParams: { duration: 8, aspect_ratio: "16:9" },
  },
  {
    id: "happyhorse",
    label: "HappyHorse",
    type: "video",
    provider: "fal",
    endpoint: "fal-ai/happy-horse",
    creditCost: 110,
    perSecond: 22,
    tier: 1,
    defaultParams: { duration: 5 },
  },
  {
    id: "grok-video",
    label: "Grok Imagine 1.5",
    type: "video",
    provider: "fal",
    endpoint: "fal-ai/grok-imagine/video",
    creditCost: 100,
    perSecond: 20,
    tier: 1,
    defaultParams: { duration: 5 },
  },
  {
    id: "wan-2-7",
    label: "Wan 2.7",
    type: "video",
    provider: "fal",
    endpoint: "fal-ai/wan/v2.7/text-to-video",
    creditCost: 60,
    perSecond: 12,
    tier: 1,
    defaultParams: { duration: 5, resolution: "720p" },
  },
  {
    id: "minimax-hailuo",
    label: "Minimax Hailuo 2.3",
    type: "video",
    provider: "fal",
    endpoint: "fal-ai/minimax/hailuo-02/standard/text-to-video",
    creditCost: 80,
    perSecond: 16,
    tier: 1,
    defaultParams: { duration: 6 },
  },
  {
    id: "seedance-1-5-pro",
    label: "Seedance 1.5 Pro",
    type: "video",
    provider: "fal",
    endpoint: "fal-ai/bytedance/seedance/v1/pro/text-to-video",
    creditCost: 70,
    perSecond: 14,
    tier: 1,
    defaultParams: { duration: 5, resolution: "1080p" },
  },
];

const AUDIO_MODELS: ModelEntry[] = [
  {
    id: "elevenlabs-v3",
    label: "Eleven v3",
    type: "audio",
    provider: "elevenlabs",
    endpoint: "https://api.elevenlabs.io/v1/text-to-speech",
    creditCost: 10,
    tier: 1,
    defaultParams: { model_id: "eleven_v3" },
  },
  {
    id: "minimax-speech",
    label: "MiniMax Speech 2.8 HD",
    type: "audio",
    provider: "fal",
    endpoint: "fal-ai/minimax/speech-02-hd",
    creditCost: 8,
    tier: 1,
  },
  {
    id: "seed-speech",
    label: "Seed Speech",
    type: "audio",
    provider: "fal",
    endpoint: "fal-ai/bytedance/seed-speech",
    creditCost: 8,
    tier: 1,
  },
  {
    id: "vibevoice",
    label: "VibeVoice",
    type: "audio",
    provider: "fal",
    endpoint: "fal-ai/vibevoice",
    creditCost: 10,
    tier: 1,
  },
];

const TOOL_MODELS: ModelEntry[] = [
  {
    id: "image-upscale",
    label: "Image Upscale (Topaz)",
    type: "tool",
    provider: "fal",
    endpoint: "fal-ai/clarity-upscaler",
    creditCost: 6,
    tier: 2,
    needsImage: true,
  },
  {
    id: "video-upscale",
    label: "Video Upscale",
    type: "tool",
    provider: "fal",
    endpoint: "fal-ai/topaz/upscale/video",
    creditCost: 40,
    tier: 2,
    needsImage: true,
  },
  {
    id: "inpaint",
    label: "Inpaint",
    type: "tool",
    provider: "fal",
    endpoint: "fal-ai/flux-pro/v1/fill",
    creditCost: 10,
    tier: 2,
    needsImage: true,
    needsMask: true,
  },
  {
    id: "face-swap",
    label: "Face Swap",
    type: "tool",
    provider: "fal",
    endpoint: "fal-ai/face-swap",
    creditCost: 8,
    tier: 2,
    needsImage: true,
  },
  {
    id: "background-remove",
    label: "Background Remover",
    type: "tool",
    provider: "fal",
    endpoint: "fal-ai/birefnet",
    creditCost: 4,
    tier: 2,
    needsImage: true,
  },
  {
    id: "relight",
    label: "Relight",
    type: "tool",
    provider: "fal",
    endpoint: "fal-ai/iclight-v2",
    creditCost: 8,
    tier: 2,
    needsImage: true,
  },
  {
    id: "lipsync",
    label: "Lipsync Studio",
    type: "tool",
    provider: "fal",
    endpoint: "fal-ai/sync-lipsync",
    creditCost: 30,
    tier: 2,
    needsImage: true,
  },
];

export const MODELS: ModelEntry[] = [
  ...IMAGE_MODELS,
  ...VIDEO_MODELS,
  ...AUDIO_MODELS,
  ...TOOL_MODELS,
];

export function getModel(id: string): ModelEntry | undefined {
  return MODELS.find((model) => model.id === id);
}

export function getModelsByType(type: ModelType): ModelEntry[] {
  return MODELS.filter((model) => model.type === type);
}

export function computeCost(
  model: ModelEntry,
  params?: Record<string, unknown>,
): number {
  if (model.type === "video" && model.perSecond) {
    const baseDuration = Number(model.defaultParams?.duration ?? 5);
    const duration = Number(params?.duration ?? baseDuration);
    const extra = Math.max(0, duration - baseDuration);
    return model.creditCost + extra * model.perSecond;
  }

  return model.creditCost;
}
