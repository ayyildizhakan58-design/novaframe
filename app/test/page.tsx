"use client";

import { useState } from "react";

export default function TestPage() {
  const [prompt, setPrompt] = useState(
    "a cinematic product reveal for a premium perfume bottle, controlled camera motion, studio lighting",
  );
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generate() {
    setLoading(true);
    setError(null);
    setUrl(null);

    try {
      const res = await fetch("/api/generate-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = (await res.json()) as { url?: string; error?: string };

      if (!res.ok || !data.url) {
        setError(data.error ?? "Generation failed");
        return;
      }

      setUrl(data.url);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Request failed",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#09090b] px-5 py-14 text-white">
      <section className="mx-auto max-w-2xl rounded-lg border border-white/10 bg-white/[0.055] p-5">
        <p className="mb-2 text-xs font-bold uppercase text-[#65e4ff]">
          fal.ai smoke test
        </p>
        <h1 className="mb-4 text-2xl font-semibold">
          Lumenfield test generation
        </h1>
        <p className="mb-5 text-sm leading-6 text-white/60">
          This page checks whether the FAL_KEY environment variable and the
          basic Flux image generation pipeline are working.
        </p>

        <textarea
          className="min-h-28 w-full resize-y rounded-md border border-white/10 bg-black/35 p-3 text-sm text-white outline-none"
          onChange={(event) => setPrompt(event.target.value)}
          value={prompt}
        />

        <button
          className="mt-3 rounded-md bg-[#c9ff5d] px-5 py-2.5 text-sm font-bold text-[#10130b] disabled:cursor-not-allowed disabled:bg-white/35"
          disabled={loading}
          onClick={generate}
        >
          {loading ? "Generating..." : "Generate"}
        </button>

        {error ? (
          <p className="mt-4 rounded-md border border-red-400/25 bg-red-500/10 p-3 text-sm text-red-200">
            Error: {error}
          </p>
        ) : null}

        {url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt="Generated result"
            className="mt-5 w-full rounded-lg border border-white/10"
            src={url}
          />
        ) : null}
      </section>
    </main>
  );
}
