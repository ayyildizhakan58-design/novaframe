import { fal } from "@fal-ai/client";

export const runtime = "nodejs";

type StudioGenerateBody = {
  modelId?: string;
  params?: {
    aspect_ratio?: string;
    duration?: number | string;
    resolution?: string;
  };
  prompt?: string;
};

type FalVideoResult = {
  data?: {
    video?: {
      url?: string;
    };
  };
};

type FalImageResult = {
  data?: {
    images?: Array<{
      url?: string;
    }>;
  };
};

const VIDEO_MODEL_IDS = new Set([
  "cs35",
  "cs30",
  "cs25",
  "seedance-2",
  "kling-3",
  "veo-3-1",
  "happyhorse",
  "grok-video",
  "minimax-hailuo",
]);

function normalizeDuration(value: unknown): "5" | "10" {
  if (value === 10 || value === "10") return "10";
  return "5";
}

function normalizeAspectRatio(value: unknown): "16:9" | "9:16" | "1:1" {
  if (value === "9:16" || value === "1:1") return value;
  return "16:9";
}

export async function POST(req: Request) {
  try {
    const falKey = process.env.FAL_KEY;

    if (!falKey) {
      return Response.json(
        { ok: false, error: "FAL_KEY is missing in Vercel Environment Variables." },
        { status: 500 },
      );
    }

    fal.config({ credentials: falKey });

    const body = (await req.json()) as StudioGenerateBody;
    const prompt = body.prompt?.trim();

    if (!prompt) {
      return Response.json(
        { ok: false, error: "Prompt is required." },
        { status: 400 },
      );
    }

    const modelId = body.modelId ?? "flux-2";
    const isVideo = VIDEO_MODEL_IDS.has(modelId);

    if (isVideo) {
      const result = (await fal.subscribe(
        "fal-ai/kling-video/v1.6/standard/text-to-video",
        {
          input: {
            prompt,
            duration: normalizeDuration(body.params?.duration),
            aspect_ratio: normalizeAspectRatio(body.params?.aspect_ratio),
          },
        },
      )) as FalVideoResult;

      const url = result.data?.video?.url;

      if (!url) {
        return Response.json(
          { ok: false, error: "FAL did not return a video URL.", result },
          { status: 502 },
        );
      }

      return Response.json({ ok: true, type: "video", url });
    }

    const result = (await fal.subscribe("fal-ai/flux/schnell", {
      input: {
        prompt,
        image_size: "landscape_16_9",
        num_images: 1,
      },
    })) as FalImageResult;

    const url = result.data?.images?.[0]?.url;

    if (!url) {
      return Response.json(
        { ok: false, error: "FAL did not return an image URL.", result },
        { status: 502 },
      );
    }

    return Response.json({ ok: true, type: "image", url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Generation failed.";

    return Response.json(
      { ok: false, error: message },
      { status: 500 },
    );
  }
}
