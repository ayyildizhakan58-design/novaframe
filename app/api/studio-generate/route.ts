import { fal } from "@fal-ai/client";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const falKey = process.env.FAL_KEY;
    if (!falKey) {
      return Response.json({ ok: false, error: "FAL_KEY eksik." }, { status: 500 });
    }

    fal.config({ credentials: falKey });

    const body = await req.json();
    const { prompt, modelId, params } = body;

    if (!prompt?.trim()) {
      return Response.json({ ok: false, error: "Prompt gerekli." }, { status: 400 });
    }

    const videoModels = ["cs35","cs30","cs25","seedance-2","kling-3","veo-3-1","happyhorse","grok-video","minimax-hailuo"];
    const isVideo = videoModels.includes(modelId);

    if (isVideo) {
      const result = await fal.subscribe("fal-ai/kling-video/v1.6/standard/text-to-video", {
        input: {
          prompt: prompt.trim(),
          duration: String(params?.duration ?? "5"),
          aspect_ratio: params?.aspect_ratio ?? "16:9",
        },
      });
      const url = (result.data as { video?: { url?: string } }).video?.url;
      return Response.json({ ok: true, type: "video", url });
    } else {
      const result = await fal.subscribe("fal-ai/flux/schnell", {
        input: {
          prompt: prompt.trim(),
          image_size: "landscape_16_9",
          num_images: 1,
        },
      });
      const url = (result.data as { images?: { url: string }[] }).images?.[0]?.url;
      return Response.json({ ok: true, type: "image", url });
    }

  } catch (error) {
    const message = error instanceof Error ? error.message : "Üretim başarısız.";
    return Response.json({ ok: false, error: message }, { status: 500 });
  }
}
