import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

type VideoRequest = {
  aspectRatio?: string;
  cameraMotion?: string;
  duration?: string;
  firstFrameUrl?: string;
  model?: string;
  prompt?: string;
  resolution?: string;
  speed?: string;
};

function cinematicPrompt(prompt: string, camera?: string, speed?: string) {
  return [
    prompt,
    camera && camera !== "Static" ? `camera movement: ${camera}` : "",
    speed && speed !== "Auto" ? `${speed.toLowerCase()} motion` : "",
    "cinematic quality, high detail, professional lighting",
  ].filter(Boolean).join(", ");
}

function jobResponse(jobId: string, provider: string, body: Required<Pick<VideoRequest, "aspectRatio" | "duration" | "model" | "resolution">>) {
  return {
    estimatedSeconds: provider === "simulation" ? 12 : 45,
    jobId,
    metadata: body,
    provider,
    status: provider === "simulation" ? "processing" : "queued",
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as VideoRequest;
    const prompt = body.prompt?.trim();

    if (!prompt) {
      return NextResponse.json({ error: "prompt is required" }, { status: 400 });
    }

    const model = body.model ?? "Seedance 2.0";
    const duration = body.duration ?? "4s";
    const aspectRatio = body.aspectRatio ?? "16:9";
    const resolution = body.resolution ?? "1080p";
    const modelLower = model.toLowerCase();

    if (process.env.FAL_KEY && (modelLower.includes("seedance") || modelLower.includes("kling"))) {
      const endpoint = modelLower.includes("kling")
        ? "fal-ai/kling-video/v3/pro/text-to-video"
        : "fal-ai/bytedance/seedance/v2/pro/text-to-video";
      const response = await fetch(`https://queue.fal.run/${endpoint}`, {
        body: JSON.stringify({
          aspect_ratio: aspectRatio,
          duration: Number.parseInt(duration, 10),
          image_url: body.firstFrameUrl,
          prompt: cinematicPrompt(prompt, body.cameraMotion, body.speed),
        }),
        headers: {
          Authorization: `Key ${process.env.FAL_KEY}`,
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      if (response.ok) {
        const data = (await response.json()) as { request_id?: string };
        return NextResponse.json(jobResponse(data.request_id ?? `lf_${Date.now()}`, "fal", { aspectRatio, duration, model, resolution }));
      }
    }

    return NextResponse.json(jobResponse(`lf_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`, "simulation", { aspectRatio, duration, model, resolution }));
  } catch (error) {
    const detail = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ detail, error: "Video generation failed" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const jobId = req.nextUrl.searchParams.get("jobId");
  const provider = req.nextUrl.searchParams.get("provider") ?? "simulation";

  if (!jobId) {
    return NextResponse.json({ error: "jobId required" }, { status: 400 });
  }

  if (provider === "simulation") {
    return NextResponse.json({
      jobId,
      provider,
      status: "completed",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    });
  }

  return NextResponse.json({ jobId, provider, status: "processing" });
}
