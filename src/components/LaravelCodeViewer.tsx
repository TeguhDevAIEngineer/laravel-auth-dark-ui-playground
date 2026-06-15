import React, { useState } from 'react';
import { laravelSnippets } from '../data/laravelCode';
import { Code, BookOpen, Layers, Check, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function LaravelCodeViewer() {
  const [activeTab, setActiveTab] = useState<'controller' | 'routes' | 'view'>('controller');
  const [copied, setCopied] = useState<string | null>(null);
  const [selectedStep, setSelectedStep] = useState<number | null>(null);

  const currentSnippet = laravelSnippets.find((s) => s.id === activeTab)!;

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const codeLines = currentSnippet.code.split('\n');

  // Check if a line is within the selected step range
  const isLineHighlighted = (index: number) => {
    if (selectedStep === null) return false;
    const step = currentSnippet.steps[selectedStep];
    const lineNum = index + 1;
    return lineNum >= step.lineStart && lineNum <= step.lineEnd;
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl" id="laravel-code-viewer">
      {/* Tab Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-800 bg-slate-900/50 p-4 gap-3">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-400" />
          <h3 className="font-semibold text-white text-sm uppercase tracking-wider font-sans">
            File Struktur Laravel Backend
          </h3>
        </div>
        
        {/* Tabs switcher */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800/80">
          {(['controller', 'routes', 'view'] as const).map((tab) => {
            const snip = laravelSnippets.find((s) => s.id === tab)!;
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                id={`tab-${tab}`}
                onClick={() => {
                  setActiveTab(tab);
                  setSelectedStep(null);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10'
                    : 'text-slate-400 hover:text-slate-100'
                }`}
              >
                {snip.filename.split('/').pop()}
              </button>
            );
          })}
        </div>
      </div>

      {/* Description Panel */}
      <div className="p-5 bg-slate-950/40 border-b border-slate-800/60">
        <p className="text-slate-400 text-sm leading-relaxed">
          {currentSnippet.description}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-[10px] font-mono font-semibold uppercase px-2 py-0.5 bg-slate-800 text-indigo-400 rounded-sm">
            PATH: {currentSnippet.filename}
          </span>
          <span className="text-[10px] font-mono font-semibold uppercase px-2 py-0.5 bg-slate-800 text-cyan-400 rounded-sm">
            TIPE: {currentSnippet.language}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
        {/* Left Side: Interaktif Guided Steps */}
        <div className="lg:col-span-5 p-5 bg-slate-900/20 max-h-[500px] overflow-y-auto">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-4 h-4 text-violet-400" />
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-sans">
              Panduan Baris Kode Penting
            </h4>
          </div>

          <div className="space-y-3">
            {currentSnippet.steps.map((step, idx) => {
              const isSelected = selectedStep === idx;
              return (
                <button
                  key={idx}
                  id={`step-btn-${idx}`}
                  onClick={() => setSelectedStep(isSelected ? null : idx)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all duration-300 group cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-950/30 border-indigo-500/50 shadow-md shadow-indigo-950/10'
                      : 'bg-slate-950/40 border-slate-800 hover:border-slate-700 hover:bg-slate-950/80'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-bold text-indigo-400 font-mono bg-indigo-950/60 border border-indigo-900/50 px-2 py-0.5 rounded-md">
                      Line {step.lineStart}-{step.lineEnd}
                    </span>
                    <span className={`text-[10px] uppercase font-mono px-1.5 py-0.5 rounded transition-all duration-200 ${
                      isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-500 group-hover:text-slate-300'
                    }`}>
                      {isSelected ? 'Melihat' : 'Klik'}
                    </span>
                  </div>
                  <h5 className={`text-sm font-semibold mt-2 transition-colors duration-200 ${
                    isSelected ? 'text-white' : 'text-slate-200 group-hover:text-white'
                  }`}>
                    {step.title}
                  </h5>
                  <p className="text-xs text-slate-400 mt-1 lines-relaxed leading-relaxed font-sans">
                    {step.explanation}
                  </p>
                </button>
              );
            })}
          </div>

          {selectedStep !== null && (
            <button
              id="reset-line-btn"
              onClick={() => setSelectedStep(null)}
              className="mt-4 w-full py-2 bg-slate-950 hover:bg-slate-900 text-slate-400 hover:text-slate-200 text-xs font-medium rounded-xl border border-slate-800 transition-colors cursor-pointer"
            >
              Reset Sorotan Kode
            </button>
          )}
        </div>

        {/* Right Side: Code Editor Container */}
        <div className="lg:col-span-7 flex flex-col bg-slate-950">
          {/* Editor Header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-slate-900 bg-slate-950/80">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
              <span className="text-xs font-mono text-slate-500 ml-2">{currentSnippet.filename.split('/').pop()}</span>
            </div>
            
            <button
              id={`copy-btn-${currentSnippet.id}`}
              onClick={() => handleCopy(currentSnippet.code, currentSnippet.id)}
              className="p-1 px-2 flex items-center gap-1.5 hover:bg-slate-900 text-slate-400 hover:text-white rounded-lg border border-slate-800/80 text-xs transition-all cursor-pointer"
              title="Salin Kode"
            >
              {copied === currentSnippet.id ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-400" />
                  <span className="text-[10px] text-green-400 font-medium">Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-medium">Salin</span>
                </>
              )}
            </button>
          </div>

          {/* Editor code area */}
          <div className="p-4 overflow-x-auto max-h-[460px] overflow-y-auto font-mono text-[13px] leading-relaxed select-text">
            <table className="w-full border-collapse">
              <tbody>
                {codeLines.map((line, index) => {
                  const highlighted = isLineHighlighted(index);
                  return (
                    <tr
                      key={index}
                      className={`transition-colors duration-200 ${
                        highlighted ? 'bg-indigo-950/20 text-indigo-200' : 'hover:bg-slate-900/30'
                      }`}
                    >
                      {/* Line Number */}
                      <td className={`w-8 pr-4 text-right select-none border-r border-slate-900 text-xs ${
                        highlighted ? 'text-indigo-400 font-bold' : 'text-slate-600'
                      }`}>
                        {index + 1}
                      </td>
                      {/* Code Content */}
                      <td className="pl-4 whitespace-pre">
                        <span className={highlighted ? 'text-indigo-300 font-medium' : 'text-slate-300'}>
                          {/* Sederhana syntax styling dengan text replacement */}
                          {line.split(/(public function|function|class|namespace|route|return|if|@csrf|@if|@endif|else|method|use|extends)/i).map((part, pIdx) => {
                            const lPart = part.toLowerCase();
                            const isKeyword = ['public function', 'function', 'class', 'namespace', 'return', 'if', 'else', 'use', 'extends'].includes(lPart);
                            const isBladeKeyword = ['@csrf', '@if', '@endif'].includes(lPart);
                            
                            if (isKeyword) {
                              return <span key={pIdx} className="text-pink-400 font-semibold">{part}</span>;
                            } else if (isBladeKeyword) {
                              return <span key={pIdx} className="text-amber-400 font-semibold">{part}</span>;
                            } else if (part.startsWith('//') || part.startsWith('/*') || part.startsWith('*')) {
                              return <span key={pIdx} className="text-slate-500 italic">{part}</span>;
                            } else if (part.startsWith('Route::')) {
                              return <span key={pIdx} className="text-cyan-400">{part}</span>;
                            } else if (part.includes('Auth::')) {
                              return <span key={pIdx} className="text-emerald-400 font-semibold">{part}</span>;
                            }
                            return part;
                          })}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
