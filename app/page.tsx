// app/page.tsx
import { useState } from 'react';

export default function NovaFrame() {
  const [activeTab, setActiveTab] = useState('memory');

  return (
    <div className="bg-[#050505] text-white min-h-screen font-sans">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-72 bg-black border-r border-zinc-800 p-6 z-50">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-lime-400 text-black font-bold rounded-2xl flex items-center justify-center text-2xl">
            N
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tighter">NovaFrame</h1>
            <p className="text-lime-400 text-sm -mt-1">Supercomputer</p>
          </div>
        </div>

        <nav className="space-y-2">
          {[
            { id: 'memory', label: 'Supercomputer Memory', icon: '🧠' },
            { id: 'cinema', label: 'Cinema Studio', icon: '🎥' },
            { id: 'image', label: 'Image Studio', icon: '🖼️' },
            { id: 'soul', label: 'My Soul', icon: '👤' },
            { id: 'market', label: 'Marketplace', icon: '🛒' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl text-left transition-all ${
                activeTab === item.id 
                  ? 'bg-zinc-900 text-lime-400' 
                  : 'hover:bg-zinc-900/50'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="glass border border-zinc-700 rounded-2xl p-4 text-sm">
            <div className="text-lime-400 font-medium">124 Credits</div>
            <div className="text-xs text-zinc-500 mt-1">30% OFF active</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-72 p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-5xl font-bold tracking-tight">
                {activeTab === 'memory' && 'Supercomputer Memory'}
                {activeTab === 'cinema' && 'Cinema Studio 3.5'}
                {activeTab === 'image' && 'Image Studio'}
              </h2>
              <p className="text-zinc-400 mt-2">
                {activeTab === 'memory' && 'Learning from every generation'}
              </p>
            </div>
            <button className="bg-white text-black px-8 py-3 rounded-2xl font-semibold flex items-center gap-2 hover:bg-lime-400 transition">
              <span>✦</span> New Generation
            </button>
          </div>

          {/* Memory / Central Area */}
          {activeTab === 'memory' && (
            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl h-[520px] flex items-center justify-center relative overflow-hidden">
              <div className="text-center z-10">
                <div className="text-8xl mb-6">🌌</div>
                <h3 className="text-4xl font-bold mb-3">Connected Memory</h3>
                <p className="text-lime-400 text-xl">Always learning from your creations</p>
              </div>
              {/* Decorative nodes */}
              <div className="absolute inset-0 opacity-30 pointer-events-none">
                <div className="absolute top-1/3 left-1/4 w-6 h-6 bg-lime-400 rounded-full"></div>
                <div className="absolute bottom-1/3 right-1/4 w-8 h-8 bg-purple-500 rounded-full"></div>
              </div>
            </div>
          )}

          {/* Cinema Studio Panel */}
          {activeTab === 'cinema' && (
            <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-8">
              <div className="flex gap-4 mb-8">
                {['Cinema Studio 3.5', 'Seedance 2.0', 'Kling 3.0'].map((model) => (
                  <button key={model} className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-2xl transition">
                    {model}
                  </button>
                ))}
              </div>

              <textarea 
                className="w-full h-40 bg-black border border-zinc-700 rounded-2xl p-6 text-lg placeholder-zinc-500 focus:outline-none"
                placeholder="Bir sahne tarif et... Örnek: Kırmızı spor araba gece yağmurda Tokyo sokaklarında ilerliyor..."
              />

              <div className="mt-8 flex items-center justify-between">
                <button 
                  onClick={() => alert('Generate başlatıldı! (Simülasyon)')}
                  className="bg-lime-400 hover:bg-lime-500 text-black font-bold text-xl px-12 py-5 rounded-2xl flex items-center gap-3 transition"
                >
                  GENERATE
                  <span className="text-2xl">⚡</span>
                </button>
                <div className="text-sm text-zinc-400">Credits remaining: <span className="text-white">124</span></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
