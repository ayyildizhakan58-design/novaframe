"use client";

import { useState } from "react";

export default function Home() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Gradient Background */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at top, rgba(255, 0, 136, 0.15) 0%, transparent 50%),
            radial-gradient(circle at bottom, rgba(255, 0, 136, 0.1) 0%, transparent 50%)
          `
        }}
      />

      {/* Header / Navigation */}
      <header className="relative z-50 border-b border-gray-800">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ 
                backgroundColor: '#FF0088',
                boxShadow: '0 0 20px rgba(255, 0, 136, 0.5)'
              }}
            >
              <svg viewBox="0 0 40 40" className="w-7 h-7" fill="none">
                <path
                  d="M28 20 C28 14.5, 23.5 10, 18 10 C20.5 12, 22 16, 22 20 C22 24, 20.5 28, 18 30 C23.5 30, 28 25.5, 28 20 Z"
                  fill="#000000"
                />
                <circle cx="12" cy="14" r="1.5" fill="#000000" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">
              Lumenfield
            </span>
          </div>

          {/* Navigation Menu */}
          <div className="hidden md:flex items-center gap-1">
            {[
              { name: "Explore", badge: null },
              { name: "Image", badge: null },
              { name: "Video", badge: null },
              { name: "Audio", badge: null },
              { name: "Supercomputer", badge: "New" },
              { name: "MCP & CLI", badge: "New" },
              { name: "Collab", badge: null },
              { name: "Plugins", badge: "New" },
              { name: "Marketing Studio", badge: null },
              { name: "Cinema Studio", badge: null },
              { name: "AI Influencer", badge: null },
              { name: "Canvas", badge: null },
            ].map((item) => (
              <button
                key={item.name}
                className="px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1 whitespace-nowrap"
              >
                {item.name}
                {item.badge && (
                  <span 
                    className="text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold"
                    style={{ backgroundColor: '#FF0088' }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <button 
            className="text-white px-6 py-2 rounded-lg font-semibold transition-all"
            style={{ 
              backgroundColor: '#FF0088',
              boxShadow: '0 0 20px rgba(255, 0, 136, 0.5)'
            }}
          >
            Get Started
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center">
          <div 
            className="inline-block mb-6 px-4 py-2 rounded-full"
            style={{ 
              backgroundColor: '#0A0A0C',
              border: '1px solid rgba(255, 0, 136, 0.3)'
            }}
          >
            <span className="text-sm" style={{ color: '#FF0088' }}>
              ✨ AI-Powered Creative Platform
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            Create Your{" "}
            <span 
              style={{ 
                color: '#FF0088',
                textShadow: '0 0 30px rgba(255, 0, 136, 0.8)'
              }}
            >
              First Project
            </span>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Step into limitless creativity with Lumenfield. Professional AI-powered platform for image, video, and audio generation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all"
              style={{ 
                backgroundColor: '#FF0088',
                boxShadow: '0 0 20px rgba(255, 0, 136, 0.5)'
              }}
            >
              🚀 Get Started
            </button>
            <button className="border-2 border-gray-600 hover:border-pink-500 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all">
              📺 Watch Demo
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24">
          {[
            {
              icon: "🎨",
              title: "Image Studio",
              description: "Create professional visuals with AI. Midjourney, DALL-E, Stable Diffusion integration.",
            },
            {
              icon: "🎬",
              title: "Cinema Studio",
              description: "Hollywood-quality video production. Scenes, lighting, characters in one platform.",
            },
            {
              icon: "🎵",
              title: "Audio Lab",
              description: "Compose music with AI, generate sound effects, produce podcasts.",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="p-6 rounded-xl transition-all hover:scale-105"
              style={{ 
                backgroundColor: '#0A0A0C',
                border: '1px solid rgba(161, 161, 170, 0.2)'
              }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800 mt-24 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-400 text-sm">
          © 2025 Lumenfield. Where creativity comes to light. ✨
        </div>
      </footer>
    </div>
  );
}