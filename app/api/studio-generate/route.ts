import { NextRequest, NextResponse } from "next/server";
import { fal } from "@fal-ai/client";
import { getModel } from "@/lib/models";

fal.config({ credentials: process.env.FAL_KEY });

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { modelId, prompt, params } = await req.json();
    const model = getModel(modelId) ?? getModel("flux-2")!;

    if (model.provider !== "fal") {
      return NextResponse.json(
        { error: `${model.label} için ayrı entegrasyon gerekir` },
        { status: 400 }
      );
    }

    const result: any = await fal.subscribe(model.endpoint, {
      input: { prompt, ...model.defaultParams, ...params },
    });

    const url =
      result?.data?.images?.[0]?.url ??
      result?.data?.video?.url ??
      result?.data?.audio?.url ??
      result?.images?.[0]?.url ??
      result?.video?.url ??
      null;

    return NextResponse.json({ url, type: model.type, label: model.label });
  } catch (err: any) {
    console.error("Stüdyo üretim hatası:", err);
    return NextResponse.json(
      { error: err?.message ?? "Üretim başarısız" },
      { status: 500 }
    );
  }
}
