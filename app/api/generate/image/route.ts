import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 30;

type ImageRequest = {
  aspectRatio?: string;
  count?: number;
  model?: string;
  prompt?: string;
  quality?: string;
};

function aspectToSize(aspect = "1:1"): [number, number] {
  if (aspect === "9:16") return [768, 1360];
  if (aspect === "16:9") return [1360, 768];
  if (aspect === "4:5") return [864, 1080];
  return [1024, 1024];
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ImageRequest;
    const prompt = body.prompt?.trim();

    if (!prompt) {
      return NextResponse.json({ error: "prompt is required" }, { status: 400 });
    }

    const model = body.model ?? "FLUX.2";
    const aspectRatio = body.aspectRatio ?? "1:1";
    const count = Math.min(Math.max(body.count ?? 1, 1), 4);
    const [width, height] = aspectToSize(aspectRatio);
    const modelLower = model.toLowerCase();

    if (process.env.OPENAI_API_KEY && (modelLower.includes("gpt") || modelLower.includes("dall"))) {
      const size = aspectRatio === "9:16" ? "1024x1792" : aspectRatio === "16:9" ? "1792x1024" : "1024x1024";
      const response = await fetch("https://api.openai.com/v1/images/generations", {
        body: JSON.stringify({
          model: "dall-e-3",
          n: 1,
          prompt: `${prompt}. Cinematic, professional, high detail.`,
          quality: body.quality ?? "hd",
          response_format: "url",
          size,
        }),
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      if (response.ok) {
        const data = (await response.json()) as { data?: Array<{ url?: string }> };
        return NextResponse.json({
          images: (data.data ?? []).map((image) => ({ height, url: image.url, width })),
          model,
          prompt,
          provider: "openai",
        });
      }
    }

    if (process.env.FAL_KEY) {
      let endpoint = "fal-ai/flux/dev";
      if (modelLower.includes("seedream")) endpoint = "fal-ai/bytedance/seedream/v4";
      if (modelLower.includes("recraft")) endpoint = "fal-ai/recraft-v3";

      const response = await fetch(`https://fal.run/${endpoint}`, {
        body: JSON.stringify({
          image_size: { height, width },
          num_images: count,
          prompt: `${prompt}, cinematic, professional, high detail`,
        }),
        headers: {
          Authorization: `Key ${process.env.FAL_KEY}`,
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      if (response.ok) {
        const data = (await response.json()) as { images?: Array<{ height?: number; url?: string; width?: number }> };
        return NextResponse.json({
          images: (data.images ?? []).map((image) => ({
            height: image.height ?? height,
            url: image.url,
            width: image.width ?? width,
          })),
          model,
          prompt,
          provider: "fal",
        });
      }
    }

    return NextResponse.json({
      images: Array.from({ length: count }, (_, index) => ({
        height,
        seed: Date.now() + index,
        url: `https://picsum.photos/seed/lumenfield-${Date.now()}-${index}/${width}/${height}`,
        width,
      })),
      model,
      prompt,
      provider: "simulation",
    });
  } catch (error) {
    const detail = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ detail, error: "Image generation failed" }, { status: 500 });
  }
}
