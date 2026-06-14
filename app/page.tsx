'use client';

import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('memory');

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-72 bg-zinc-950 border-r border-zinc-800 h-screen fixed p-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-9 h-9 bg-green-400 text-black font-bold rounded-xl flex items-center justify-center">N</div>
            <h1 className="text-2xl font-bold">NovaFrame</h1>
          </div>

          <div className="space-y-2">
            <button onClick={() => setActiveTab('memory')} className={`w-full text-left px-4 py-3 rounded-xl ${activeTab === 'memory' ? 'bg-zinc-800 text-green-400' : 'hover:bg-zinc-900'}`}>
              🧠 Supercomputer Memory
            </button>
            <button onClick={() => setActiveTab('cinema')} className={`w-full text-left px-4 py-3 rounded-xl ${activeTab === 'cinema' ? 'bg-zinc-800 text-green-400' : 'hover:bg-zinc-900'}`}>
              🎥 Cinema Studio
            </button>
          </div>
        </div>

        {/* Main Area */}
        <div className="ml-72 flex-1 p-10">
          <h1 className="text-4xl font-bold mb-8">
            {activeTab === 'memory' ? 'Supercomputer Memory' : 'Cinema Studio'}
          </h1>

          {activeTab === 'memory' && (
            <div className="bg-zinc-900 border border-zinc-700 rounded-3xl h-96 flex items-center justify-center">
              <div className="text-center">
                <p className="text-6xl mb-4">🌌</p>
                <p className="text-2xl">Higgsfield tarzı Memory Arayüzü</p>
              </div>
            </div>
          )}

          {activeTab === 'cinema' && (
            <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-8 max-w-3xl">
              <textarea 
                className="w-full h-48 bg-black border border-zinc-700 rounded-2xl p-6 text-white placeholder-zinc-500"
                placeholder="Sahne tarifini buraya yaz..."
              />
              <button className="mt-6 bg-green-400 text-black font-bold px-10 py-4 rounded-2xl">
                GENERATE
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
