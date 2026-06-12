export const runtime = "nodejs";

type GenerateVideoBody = {
  prompt?: string;
  ratio?: string;
  duration?: number;
};

function normalizeRatio(ratio?: string): "1280:720" | "720:1280" {
  if (ratio === "720:1280") return "720:1280";
  return "1280:720";
}

function normalizeDuration(duration?: number): 5 | 10 {
  return duration === 10 ? 10 : 5;
}

async function createRunwayClient(apiKey: string) {
  const loadSdk = new Function(
    "specifier",
    "return import(specifier)"
  ) as (specifier: string) => Promise<{
    default: new (options: { apiKey: string }) => {
      imageToVideo: {
        create(input: {
          model: string;
          promptText: string;
          ratio: "1280:720" | "720:1280";
          duration: 5 | 10;
        }): Promise<{ id: string; status: string }>;
      };
    };
  }>;
  const mod = await loadSdk("@runwayml/sdk");

  return new mod.default({ apiKey });
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RUNWAYML_API_SECRET;

    if (!apiKey) {
      return Response.json(
        {
          ok: false,
          error: "RUNWAYML_API_SECRET Vercel Environment Variables icinde yok.",
        },
        { status: 500 }
      );
    }

    const runway = await createRunwayClient(apiKey);
    const body = (await req.json()) as GenerateVideoBody;

    const prompt = body.prompt?.trim();
    const ratio = normalizeRatio(body.ratio);
    const duration = normalizeDuration(body.duration);

    if (!prompt || prompt.length < 3) {
      return Response.json(
        {
          ok: false,
          error: "Prompt yazman gerekiyor.",
        },
        { status: 400 }
      );
    }

    const task = await runway.imageToVideo.create({
      model: "gen4.5",
      promptText: prompt,
      ratio,
      duration,
    });

    return Response.json({
      ok: true,
      taskId: task.id,
      status: task.status,
    });
  } catch (error) {
    console.error("Runway generate-video error:", error);

    const message =
      error instanceof Error ? error.message : "Runway video baslatilamadi.";

    return Response.json(
      {
        ok: false,
        error: message,
      },
      { status: 500 }
    );
  }
}
