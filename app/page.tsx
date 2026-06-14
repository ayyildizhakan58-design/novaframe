'use client';

import { useState } from 'react';

export default function NovaFrame() {
  const [activeTab, setActiveTab] = useState('memory');

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen font-sans">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-72 bg-black border-r border-zinc-800 p-5 flex flex-col">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-11 h-11 bg-gradient-to-br from-lime-400 to-cyan-400 rounded-2xl flex items-center justify-center text-3xl font-black text-black">
              N
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tighter">NovaFrame</h1>
              <p className="text-xs text-lime-400">AI Supercomputer</p>
            </div>
          </div>

          <nav className="flex-1 space-y-1">
            <button onClick={() => setActiveTab('memory')} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition ${activeTab === 'memory' ? 'bg-zinc-900 text-white' : 'hover:bg-zinc-900/70'}`}>
              🧠 Supercomputer Memory
            </button>
            <button onClick={() => setActiveTab('cinema')} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition ${activeTab === 'cinema' ? 'bg-zinc-900 text-white' : 'hover:bg-zinc-900/70'}`}>
              🎬 Cinema Studio
            </button>
            <button onClick={() => setActiveTab('image')} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition ${activeTab === 'image' ? 'bg-zinc-900 text-white' : 'hover:bg-zinc-900/70'}`}>
              🖼️ Image Studio
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-10 overflow-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold mb-2">
              {activeTab === 'memory' && 'Supercomputer Memory'}
              {activeTab === 'cinema' && 'Cinema Studio 3.5'}
              {activeTab === 'image' && 'Image Studio'}
            </h2>
            <p className="text-zinc-400 mb-12">Learning from every creation</p>

            {activeTab === 'memory' && (
              <div className="h-[520px] bg-gradient-to-br from-zinc-950 to-black border border-zinc-700 rounded-3xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-6">🌌</div>
                  <h3 className="text-4xl font-semibold">Memory Connected</h3>
                  <p className="text-lime-400 mt-4">Her generation ile öğreniyor</p>
                </div>
              </div>
            )}

            {activeTab === 'cinema' && (
              <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-10">
                <div className="mb-8">
                  <p className="text-sm text-zinc-400 mb-2">MODEL</p>
                  <div className="flex gap-3">
                    {['Cinema Studio 3.5', 'Seedance 2.0', 'Kling 3.0'].map((model) => (
                      <button key={model} className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-2xl transition">
                        {model}
                      </button>
                    ))}
                  </div>
                </div>

                <textarea 
                  className="w-full h-52 bg-black border border-zinc-700 rounded-2xl p-6 text-lg placeholder-zinc-500 focus:border-lime-400 focus:outline-none"
                  placeholder="Sahneyi detaylı tarif et..."
                />

                <div className="mt-8 flex justify-between items-center">
                  <button className="bg-lime-400 hover:bg-lime-500 text-black font-bold text-xl px-16 py-5 rounded-2xl transition flex items-center gap-3">
                    GENERATE 
                    <span className="text-2xl">⚡</span>
                  </button>
                  <div className="text-right">
                    <div className="text-sm">Credits Left</div>
                    <div className="text-2xl font-semibold text-lime-400">142</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
