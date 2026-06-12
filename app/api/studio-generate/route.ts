import { fal } from "@fal-ai/client";
import { NextRequest, NextResponse } from "next/server";

import { getModel } from "@/lib/models";

type StudioGenerateRequest = {
  modelId?: string;
  params?: Record<string, unknown>;
  prompt?: string;
};

type StudioResult = {
  data?: {
    audio?: { url?: string };
    images?: Array<{ url?: string }>;
    video?: { url?: string };
  };
  audio?: { url?: string };
  images?: Array<{ url?: string }>;
  video?: { url?: string };
};

function findAssetUrl(result: StudioResult): string | undefined {
  return (
    result.data?.images?.[0]?.url ??
    result.data?.video?.url ??
    result.data?.audio?.url ??
    result.images?.[0]?.url ??
    result.video?.url ??
    result.audio?.url
  );
}

export async function POST(req: NextRequest) {
  try {
    const { modelId, prompt, params } = (await req.json()) as StudioGenerateRequest;
    const model = getModel(modelId ?? "flux-2") ?? getModel("flux-2");

    if (!model) {
      return NextResponse.json({ error: "No model registry found" }, { status: 500 });
    }

    if (!prompt || prompt.trim().length === 0) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    if (model.provider !== "fal") {
      return NextResponse.json(
        { error: `${model.label} needs a separate provider integration` },
        { status: 400 },
      );
    }

    if (!process.env.FAL_KEY) {
      return NextResponse.json(
        {
          error: "FAL_KEY is not configured",
          model: model.label,
          input: { prompt, ...model.defaultParams, ...params },
        },
        { status: 503 },
      );
    }

    fal.config({ credentials: process.env.FAL_KEY });

    const result = (await fal.subscribe(model.endpoint, {
      input: { prompt, ...model.defaultParams, ...params },
    })) as StudioResult;

    const url = findAssetUrl(result);

    if (!url) {
      return NextResponse.json(
        { error: "The provider did not return an asset URL", result },
        { status: 502 },
      );
    }

    return NextResponse.json({ label: model.label, type: model.type, url });
  } catch (error) {
    const detail = error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      { error: "Studio generation failed", detail },
      { status: 500 },
    );
  }
}
