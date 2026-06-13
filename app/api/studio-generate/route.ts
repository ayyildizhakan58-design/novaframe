// =============================================================================
// STÜDYO ÜRETİM ENDPOINT'İ  (src/app/api/studio-generate/route.ts)
// =============================================================================
// Seçilen modeli GERÇEKTEN kullanır (models.ts'ten endpoint'i bulur).
// Sadece FAL_KEY ister — auth/kredi/depolama YOK (onları sonra ekleriz).
// Görsel: saniyeler. Video: dakikalar (Vercel ücretsiz planda zaman aşımı
// olabilir; uzun video için fal queue + polling gerekir).
// =============================================================================

import { NextRequest, NextResponse } from "next/server";
import { fal } from "@fal-ai/client";
import { getModel } from "@/lib/models";

fal.config({ credentials: process.env.FAL_KEY });

export async function POST(req: NextRequest) {
  try {
    const { modelId, prompt, params } = await req.json();
    const model = getModel(modelId) ?? getModel("flux-2")!;

    // ElevenLabs ayrı API; bu basit endpoint sadece fal modellerini çağırır
    if (model.provider !== "fal") {
      return NextResponse.json(
        { error: `${model.label} için ayrı entegrasyon gerekir (şimdilik fal modelleri)` },
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
      { error: err?.message ?? "Üretim başarısız (endpoint slug'ını fal.ai/models'tan doğrula)" },
      { status: 500 }
    );
  }
}
