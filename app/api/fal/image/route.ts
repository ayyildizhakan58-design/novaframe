import { fal } from "@fal-ai/client";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return Response.json({ error: "Prompt is required." }, { status: 400 });
    }

    const key = process.env.FAL_KEY;
    if (!key) {
      return Response.json({ error: "FAL_KEY is missing in Vercel Environment Variables." }, { status: 500 });
    }

    fal.config({ credentials: key });

    const result = await fal.subscribe("fal-ai/flux/dev", {
      input: {
        prompt,
        image_size: "landscape_16_9",
        num_images: 1,
      },
      logs: false,
    });

    return Response.json({ ok: true, result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Image generation failed.";
    return Response.json({ error: message }, { status: 500 });
  }
}
