'use client';

import { useState } from 'react';

export default function NovaFrame() {
  const [activeTab, setActiveTab] = useState('memory');

  return (
    <div className="bg-[#050505] text-white min-h-screen">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-72 bg-black border-r border-zinc-800 p-6 z-50 overflow-y-auto">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-lime-400 text-black font-bold rounded-2xl flex items-center justify-center text-2xl">
            N
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tighter">NovaFrame</h1>
            <p className="text-lime-400 text-sm">Supercomputer</p>
          </div>
        </div>

        <nav className="space-y-1">
          {[
            { id: 'memory', label: 'Supercomputer Memory', icon: '🧠' },
            { id: 'cinema', label: 'Cinema Studio', icon: '🎥' },
            { id: 'image', label: 'Image Studio', icon: '🖼️' },
            { id: 'soul', label: 'My Soul', icon: '👤' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl text-left transition-all hover:bg-zinc-900 ${
                activeTab === item.id ? 'bg-zinc-900 text-lime-400' : ''
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-72 p-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl font-bold mb-2">
            {activeTab === 'memory' && 'Supercomputer Memory'}
            {activeTab === 'cinema' && 'Cinema Studio'}
            {activeTab === 'image' && 'Image Studio'}
            {activeTab === 'soul' && 'My Soul'}
          </h2>
          <p className="text-zinc-400 mb-10">
            {activeTab === 'memory' && 'Learning from every generation'}
          </p>

          {/* Memory Tab */}
          {activeTab === 'memory' && (
            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl h-[500px] flex items-center justify-center relative">
              <div className="text-center">
                <div className="text-7xl mb-6">🌌</div>
                <h3 className="text-4xl font-bold">Connected Memory</h3>
                <p className="text-lime-400 mt-3">Always learning from your creations</p>
              </div>
            </div>
          )}

          {/* Cinema Studio Tab */}
          {activeTab === 'cinema' && (
            <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-8">
              <div className="flex gap-3 mb-8 flex-wrap">
                {['Cinema Studio 3.5', 'Seedance 2.0', 'Kling 3.0'].map((m) => (
                  <button key={m} className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-2xl transition">
                    {m}
                  </button>
                ))}
              </div>

              <textarea
                className="w-full h-40 bg-black border
