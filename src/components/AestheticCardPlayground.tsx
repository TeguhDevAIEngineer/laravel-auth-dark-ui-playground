import React, { useState, useEffect } from 'react';
import { CardSettings } from '../types';
import { 
  Sparkles, 
  Settings2, 
  RefreshCw, 
  ShieldCheck, 
  ArrowRight, 
  Laptop, 
  Check, 
  AlertTriangle, 
  Terminal, 
  Sliders, 
  Palette,
  Eye,
  EyeOff
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Predefined gorgeous aesthetics presets!
const PRESETS: { name: string; settings: CardSettings }[] = [
  {
    name: 'Cosmic Slate Glow (Rekomendasi)',
    settings: {
      bgBase: 'slate',
      glowColor: 'indigo',
      accentColor: 'indigo',
      glowIntensity: 4,
      blurAmount: '2xl',
      showGrid: true,
      cardOpacity: 90,
      borderContrast: 'medium',
      roundedCorner: '2xl',
    }
  },
  {
    name: 'Violet Nebula Deep',
    settings: {
      bgBase: 'zinc',
      glowColor: 'violet',
      accentColor: 'rose',
      glowIntensity: 6,
      blurAmount: '3xl',
      showGrid: false,
      cardOpacity: 80,
      borderContrast: 'low',
      roundedCorner: '3xl',
    }
  },
  {
    name: 'Minimal Charcoal',
    settings: {
      bgBase: 'stone',
      glowColor: 'amber',
      accentColor: 'amber',
      glowIntensity: 1,
      blurAmount: 'none',
      showGrid: false,
      cardOpacity: 100,
      borderContrast: 'high',
      roundedCorner: 'xl',
    }
  },
  {
    name: 'Nordic Aurora Glass',
    settings: {
      bgBase: 'neutral',
      glowColor: 'emerald',
      accentColor: 'emerald',
      glowIntensity: 5,
      blurAmount: 'lg',
      showGrid: true,
      cardOpacity: 70,
      borderContrast: 'medium',
      roundedCorner: '2xl',
    }
  }
];

export default function AestheticCardPlayground() {
  const [settings, setSettings] = useState<CardSettings>(PRESETS[0].settings);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Simulation States
  const [simulationStep, setSimulationStep] = useState<number | null>(null);
  const [simLog, setSimLog] = useState<string[]>([]);
  const [simStatus, setSimStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
  const [showCsrfInfo, setShowCsrfInfo] = useState(false);

  // Dynamic Tailwind Mappings
  const bgClasses = {
    slate: {
      body: 'bg-slate-950',
      card: 'bg-slate-900',
      input: 'bg-slate-950 border-slate-800/80 text-white placeholder-slate-600',
      textMuted: 'text-slate-400',
      label: 'text-slate-400',
    },
    zinc: {
      body: 'bg-zinc-950',
      card: 'bg-zinc-900',
      input: 'bg-zinc-950 border-zinc-800/80 text-white placeholder-zinc-600',
      textMuted: 'text-zinc-450 text-slate-450',
      label: 'text-zinc-400',
    },
    stone: {
      body: 'bg-stone-950',
      card: 'bg-stone-900',
      input: 'bg-stone-950 border-stone-800/80 text-white placeholder-stone-600',
      textMuted: 'text-stone-400',
      label: 'text-stone-400',
    },
    neutral: {
      body: 'bg-neutral-950',
      card: 'bg-neutral-900',
      input: 'bg-neutral-950 border-neutral-800/80 text-white placeholder-neutral-600',
      textMuted: 'text-neutral-400',
      label: 'text-neutral-400',
    }
  };

  const glowColorClasses = {
    indigo: 'bg-indigo-500',
    violet: 'bg-violet-500',
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500',
    cyan: 'bg-cyan-500',
  };

  const borderContrastClasses = {
    low: 'border-white/5',
    medium: 'border-slate-800/60',
    high: 'border-slate-700'
  };

  const roundedClasses = {
    none: 'rounded-none',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
  };

  const blurClasses = {
    none: 'blur-none',
    sm: 'blur-sm',
    md: 'blur-md',
    lg: 'blur-lg',
    xl: 'blur-xl',
    '2xl': 'blur-2xl',
    '3xl': 'blur-3xl',
  };

  const accentColorText = {
    indigo: 'text-indigo-400 hover:text-indigo-300',
    violet: 'text-violet-400 hover:text-violet-300',
    emerald: 'text-emerald-400 hover:text-emerald-300',
    amber: 'text-amber-400 hover:text-amber-300',
    rose: 'text-rose-400 hover:text-rose-300',
    cyan: 'text-cyan-400 hover:text-cyan-300',
  };

  const accentColorFocus = {
    indigo: 'focus:border-indigo-500 focus:ring-indigo-500/25 focus:ring-2',
    violet: 'focus:border-violet-500 focus:ring-violet-500/25 focus:ring-2',
    emerald: 'focus:border-emerald-500 focus:ring-emerald-500/25 focus:ring-2',
    amber: 'focus:border-amber-500 focus:ring-amber-500/25 focus:ring-2',
    rose: 'focus:border-rose-500 focus:ring-rose-500/25 focus:ring-2',
    cyan: 'focus:border-cyan-500 focus:ring-cyan-500/25 focus:ring-2',
  };

  const accentColorBtn = {
    indigo: 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/10 focus:ring-indigo-500',
    violet: 'bg-violet-600 hover:bg-violet-500 shadow-violet-600/10 focus:ring-violet-500',
    emerald: 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/10 focus:ring-emerald-500',
    amber: 'bg-amber-600 hover:bg-amber-500 shadow-amber-600/10 focus:ring-amber-500',
    rose: 'bg-rose-600 hover:bg-rose-500 shadow-rose-600/10 focus:ring-rose-500',
    cyan: 'bg-cyan-600 hover:bg-cyan-500 shadow-cyan-600/10 focus:ring-cyan-500',
  };

  const bgActiveColor = bgClasses[settings.bgBase];

  // Laravel backend login pipeline simulation!
  const runLaravelSimulation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Tulis email & password terlebih dahulu untuk melakukan simulasi!');
      return;
    }

    setSimStatus('running');
    setSimLog([]);
    setSimulationStep(0);

    const steps = [
      {
        message: '📡 [CLIENT] Request POST dikirim ke rute /login (routes/web.php)...',
        delay: 800,
      },
      {
        message: '🔒 [LARAVEL] Memvalidasi token @csrf (Cross-Site Request Forgery)... Token terverifikasi aman.',
        delay: 1000,
      },
      {
        message: `📋 [VALIDATION] Memulai rule validasi untuk email: "${email}". Format lolos & password terisi.`,
        delay: 1200,
      },
      {
        message: '🔑 [SECURITY] Memanggil Auth::attempt(). Mencari User dengan email di model DB & mencocokkan password via Bcrypt Hash...',
        delay: 1500,
      },
      {
        message: password === 'password123' 
          ? '✅ [SUCCESS] Password COCOK! Meregenerasi Session ID untuk mengamankan session hijack.'
          : '❌ [AUTH FAILED] Password SALAH! Bcrypt hash tidak sesuai di server.',
        isSuccess: password === 'password123',
        delay: 1000,
      },
      {
        message: password === 'password123'
          ? `🎉 [REDIRECT] Session tersimpan di backend! Mengarahkan user ke halaman /dashboard dengan aman.`
          : '⚠️ [ERRORS] Dikembalikan ke /login dengan withErrors(["email" => "Email atau password yang kamu masukkan salah."]).',
        delay: 600,
      }
    ];

    for (let i = 0; i < steps.length; i++) {
      setSimulationStep(i);
      setSimLog(prev => [...prev, steps[i].message]);
      await new Promise(resolve => setTimeout(resolve, steps[i].delay));
    }

    if (password === 'password123') {
      setSimStatus('success');
    } else {
      setSimStatus('error');
    }
  };

  const applyPreset = (presetSettings: CardSettings) => {
    setSettings(presetSettings);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8" id="aesthetic-card-playground">
      {/* LEFT SIDE: Visual Live Render with Settings Panel Toggle */}
      <div className="xl:col-span-7 flex flex-col gap-6">
        
        {/* Visual Showcase Box representing the Off-Black Area */}
        <div className={`relative flex flex-col justify-center items-center p-4 sm:p-12 min-h-[550px] ${bgActiveColor.body} border border-slate-800/60 rounded-3xl overflow-hidden transition-all duration-500`}>
          
          {/* Subtle grid background if enabled */}
          {settings.showGrid && (
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px]" />
          )}

          {/* Aesthetic outer glowing objects */}
          <div 
            className={`absolute -top-16 -right-16 w-48 h-48 ${glowColorClasses[settings.glowColor]} rounded-full ${blurClasses[settings.blurAmount]} transition-all duration-500`} 
            style={{ opacity: settings.glowIntensity / 25 }}
          />
          <div 
            className={`absolute -bottom-16 -left-16 w-48 h-48 ${glowColorClasses[settings.glowColor]} rounded-full ${blurClasses[settings.blurAmount]} transition-all duration-500`}
            style={{ opacity: settings.glowIntensity / 25 }}
          />

          <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 bg-slate-900/80 border border-slate-800 rounded-lg text-[10px] font-mono text-slate-400 z-10 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            LIVE RENDER (Beralih ke Dark Mode)
          </div>

          {/* Interactive Card Canvas */}
          <div 
            className={`w-full max-w-sm ${bgActiveColor.card} ${borderContrastClasses[settings.borderContrast]} border ${roundedClasses[settings.roundedCorner]} p-6 sm:p-8 shadow-2xl relative overflow-hidden transition-all duration-500`}
            style={{ backgroundColor: `${settings.bgBase === 'slate' ? '#0f172a' : settings.bgBase === 'zinc' ? '#18181b' : settings.bgBase === 'stone' ? '#1c1917' : '#171717'}${Math.round(settings.cardOpacity * 2.55).toString(16).padStart(2, '0')}` }}
          >
            {/* Ambient glows inside card */}
            <div 
              className={`absolute -top-8 -right-8 w-24 h-24 ${glowColorClasses[settings.glowColor]} rounded-full blur-xl transition-all duration-500`}
              style={{ opacity: (settings.glowIntensity / 40) }}
            />
            <div 
              className={`absolute -bottom-10 -left-10 w-24 h-24 ${glowColorClasses[settings.glowColor]} rounded-full blur-xl transition-all duration-500`}
              style={{ opacity: (settings.glowIntensity / 40) }}
            />

            {/* Title segment */}
            <div className="mb-6 relative">
              <h4 className="text-xl font-bold text-white tracking-tight">Selamat Datang Kembali</h4>
              <p className={`text-xs mt-1 leading-relaxed ${bgActiveColor.textMuted}`}>
                Silakan masuk ke akun Anda untuk melanjutkan.
              </p>
            </div>

            {/* Laravel CSRF Visual Representation */}
            <div className="mb-4 relative">
              <button 
                id="csrf-info-toggle"
                onClick={() => setShowCsrfInfo(!showCsrfInfo)}
                className="w-full py-1 px-3 bg-slate-950/60 hover:bg-slate-950 border border-slate-800/80 rounded-md flex items-center justify-between text-[11px] font-mono text-slate-400 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                  <span>@csrf token</span>
                </div>
                <span className="text-[10px] text-indigo-400 font-semibold uppercase">
                  {showCsrfInfo ? 'Sembunyikan' : 'Detail'}
                </span>
              </button>
              
              <AnimatePresence>
                {showCsrfInfo && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-2 p-2 bg-slate-950/90 border border-slate-800/60 rounded-md text-[10px] font-mono text-slate-400 leading-normal"
                  >
                    Setiap form POST di Laravel wajib memuat token <span className="text-yellow-400">@csrf</span> untuk mengamankan data:
                    <div className="mt-1 p-1 bg-slate-900 rounded select-all selection:bg-indigo-500 text-slate-300">
                      &lt;input type="hidden" name="_token" value="e8pX...zP"&gt;
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Active Simulation Error Message inside the preview card */}
            {simStatus === 'error' && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-450 text-xs">
                Email atau password yang kamu masukkan salah. <br />
                <span className="text-[10px] text-red-500/80 font-mono mt-1 block">(Petunjuk: Ketik password "password123")</span>
              </div>
            )}

            {simStatus === 'success' && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Berhasil autentikasi! Mengarahkan ke /dashboard...</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={runLaravelSimulation} className="space-y-4 relative">
              
              {/* Email */}
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5 select-none">
                  Alamat Email {email.includes('@') ? '✅' : ''}
                </label>
                <input 
                  type="email" 
                  id="preview-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@domain.com"
                  className={`w-full ${bgActiveColor.input} ${accentColorFocus[settings.accentColor]} rounded-xl px-3 py-2.5 text-xs transition-all duration-300`}
                  required
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 select-none">
                    Password {password.length >= 6 ? '✅' : ''}
                  </label>
                  <a href="#" className={`text-[10px] transition-colors ${accentColorText[settings.accentColor]}`}>Lupa password?</a>
                </div>
                
                <div className="relative">
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    id="preview-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full ${bgActiveColor.input} ${accentColorFocus[settings.accentColor]} rounded-xl px-3 py-2.5 pr-10 text-xs transition-all duration-300`}
                    required
                  />
                  
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="preview-remember"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className={`w-3.5 h-3.5 rounded bg-slate-950 border-slate-800 ${accentColorText[settings.accentColor]} focus:ring-offset-slate-900`}
                />
                <label htmlFor="preview-remember" className="ml-2 text-xs text-slate-400 select-none cursor-pointer">
                  Ingat saya di perangkat ini
                </label>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                id="preview-submit"
                disabled={simStatus === 'running'}
                className={`w-full text-white font-medium py-3 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 active:scale-[0.98] ${accentColorBtn[settings.accentColor]} ${simStatus === 'running' ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <span>{simStatus === 'running' ? 'Memverifikasi...' : 'Masuk ke Akun'}</span>
                {simStatus !== 'running' && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>

            <p className="text-center text-[11px] text-slate-500 mt-5 relative">
              Belum punya akun? <a href="#" className={`font-semibold ${accentColorText[settings.accentColor]}`}>Daftar sekarang</a>
            </p>
          </div>

          {/* Quick instructions clue */}
          <div className="absolute bottom-3 left-4 right-4 bg-slate-900/60 p-2 border border-slate-800 rounded-lg text-[10px] text-slate-400 text-center font-sans">
            💡 <span className="font-semibold text-white">Petunjuk Simulasi:</span> Ketik email apa saja dan password <span className="bg-slate-950 text-yellow-400 px-1 py-0.5 rounded font-mono border border-slate-800">password123</span> untuk skenario login sukses!
          </div>

        </div>

        {/* LOG CONSOLE: Showing the backend PHP compilation process */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 font-mono text-xs flex flex-col gap-2 relative">
          <div className="flex items-center justify-between border-b border-slate-900 pb-2 mb-2">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Terminal className="w-4 h-4 text-indigo-400" />
              <span className="font-semibold text-[11px] uppercase tracking-wider text-slate-300">Laravel Auth Execution Log</span>
            </div>
            {simLog.length > 0 && (
              <button 
                onClick={() => {
                  setSimStatus('idle');
                  setSimLog([]);
                  setSimulationStep(null);
                }}
                className="text-[10px] text-slate-500 hover:text-slate-300 flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" /> Bersihkan
              </button>
            )}
          </div>

          <div className="min-h-[140px] space-y-1.5">
            {simLog.length === 0 ? (
              <div className="text-slate-600 italic text-[11px] h-full flex flex-col justify-center items-center py-8">
                Isi form login di atas dan klik "Masuk ke Akun" untuk melihat visualisasi alur backend Laravel.
              </div>
            ) : (
              simLog.map((log, index) => {
                const isSelectedStep = index === simulationStep;
                return (
                  <div 
                    key={index} 
                    className={`transition-colors duration-300 p-1.5 rounded-lg text-[11px] leading-relaxed ${
                      isSelectedStep ? 'bg-indigo-950/30 text-indigo-300 border-l-2 border-indigo-500 pl-2 font-semibold' : 'text-slate-400'
                    }`}
                  >
                    {log}
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>

      {/* RIGHT SIDE: Customized Settings Control Form */}
      <div className="xl:col-span-5 flex flex-col gap-6">
        
        {/* Presets Grid */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Palette className="w-4 h-4 text-indigo-400" />
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Pilih Preset Tema Estetik</h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {PRESETS.map((preset, idx) => {
              const isActive = settings.bgBase === preset.settings.bgBase && 
                               settings.glowColor === preset.settings.glowColor && 
                               settings.accentColor === preset.settings.accentColor &&
                               settings.glowIntensity === preset.settings.glowIntensity;
              return (
                <button
                  key={idx}
                  id={`preset-${idx}`}
                  onClick={() => applyPreset(preset.settings)}
                  className={`px-3 py-2.5 rounded-xl text-left text-xs font-medium border cursor-pointer transition-all ${
                    isActive 
                      ? 'bg-indigo-950/20 border-indigo-500 text-white font-semibold shadow-md shadow-indigo-950/20' 
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {preset.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Controls */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Kustomisasi Parameter</h4>
            </div>
            
            <button 
              id="reset-settings-btn"
              onClick={() => setSettings(PRESETS[0].settings)}
              className="text-[10px] bg-slate-950 hover:bg-slate-800 text-slate-400 border border-slate-800 rounded px-2 py-0.5 cursor-pointer"
            >
              Reset
            </button>
          </div>

          {/* Background Bases */}
          <div className="space-y-2">
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              1. Pilihan Warna Dasar (Off-Black)
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {(['slate', 'zinc', 'stone', 'neutral'] as const).map((b) => (
                <button
                  key={b}
                  id={`bg-base-${b}`}
                  onClick={() => setSettings(prev => ({ ...prev, bgBase: b }))}
                  className={`py-1.5 text-[10px] font-mono rounded border capitalize cursor-pointer ${
                    settings.bgBase === b 
                      ? 'bg-blue-950/15 border-blue-500 text-white font-bold' 
                      : 'bg-slate-950 border-slate-850 border-slate-800 text-slate-400 hover:text-slate-100'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-slate-500">
              Jangan gunakan warna hitam pekat murni (#000). Slate memiliki rona biru sejuk, Zinc netral tenang, Stone terasa hangat bersahabat.
            </p>
          </div>

          {/* Accent Color */}
          <div className="space-y-2">
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              2. Warna Aksen & Tombol
            </label>
            <div className="grid grid-cols-6 gap-1">
              {(['indigo', 'violet', 'emerald', 'amber', 'rose', 'cyan'] as const).map((col) => (
                <button
                  key={col}
                  id={`accent-col-${col}`}
                  onClick={() => setSettings(prev => ({ ...prev, accentColor: col }))}
                  className={`w-full py-1 text-[9px] rounded border capitalize cursor-pointer ${
                    settings.accentColor === col 
                      ? 'border-white text-white font-bold' 
                      : 'border-slate-800 hover:border-slate-700 text-slate-400'
                  }`}
                  style={{ backgroundColor: `var(--color-${col}-950)`, color: `var(--color-${col}-350)` }}
                >
                  {col}
                </button>
              ))}
            </div>
          </div>

          {/* Glow Options */}
          <div className="space-y-2">
            <div className="flex justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <span>3. Intensitas Glow Belakang</span>
              <span className="text-white font-mono">{settings.glowIntensity * 10}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="10" 
              id="glow-intensity-range"
              value={settings.glowIntensity} 
              onChange={(e) => setSettings(prev => ({ ...prev, glowIntensity: parseInt(e.target.value) }))}
              className="w-full accent-indigo-500 h-1 bg-slate-950 rounded-lg cursor-pointer"
            />
          </div>

          {/* Card Blur */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Blur Ambient
              </label>
              <select 
                id="blur-amount-select"
                value={settings.blurAmount}
                onChange={(e) => setSettings(prev => ({ ...prev, blurAmount: e.target.value as any }))}
                className="w-full bg-slate-950 border border-slate-800 text-[11px] rounded-lg p-2 text-slate-300 focus:outline-none"
              >
                <option value="none">Tanpa Blur (Tajam)</option>
                <option value="lg">Soft Medium</option>
                <option value="2xl">2XL (Elegan)</option>
                <option value="3xl">3XL (Sangat Halus)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Lekukan Sudut
              </label>
              <select 
                id="border-rounded-select"
                value={settings.roundedCorner}
                onChange={(e) => setSettings(prev => ({ ...prev, roundedCorner: e.target.value as any }))}
                className="w-full bg-slate-950 border border-slate-800 text-[11px] rounded-lg p-2 text-slate-300 focus:outline-none"
              >
                <option value="none">Siku-siku</option>
                <option value="md">MD (Halus)</option>
                <option value="xl">XL (Modern)</option>
                <option value="2xl">2XL (Estetik)</option>
                <option value="3xl">3XL (Sangat Membulat)</option>
              </select>
            </div>
          </div>

          {/* Toggle options */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <label className="flex items-center gap-2 text-[11px] text-slate-400 cursor-pointer">
              <input 
                type="checkbox" 
                checked={settings.showGrid}
                onChange={(e) => setSettings(prev => ({ ...prev, showGrid: e.target.checked }))}
                className="rounded bg-slate-150 border-slate-800 text-indigo-600 focus:ring-indigo-500"
              />
              <span>Tampilkan Grid Pola</span>
            </label>

            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Opasitas Card:</span>
              <span className="text-[11px] font-mono text-white">{settings.cardOpacity}%</span>
            </div>
          </div>
          <input 
            type="range" 
            min="50" 
            max="100" 
            id="card-opacity-range"
            value={settings.cardOpacity} 
            onChange={(e) => setSettings(prev => ({ ...prev, cardOpacity: parseInt(e.target.value) }))}
            className="w-full accent-indigo-500 h-1 bg-slate-950 rounded-lg cursor-pointer"
          />

        </div>

        {/* Explain Card UI Theory */}
        <div className="bg-gradient-to-br from-indigo-950/20 to-slate-950/10 border border-indigo-900/40 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h5 className="font-bold text-white text-xs uppercase tracking-wider">
              Teori Desain Dark UI yang Estetik
            </h5>
          </div>

          <div className="space-y-2.5 text-xs text-slate-400 leading-relaxed font-sans">
            <p>
              1. <strong className="text-white">Warna Slate / Zinc:</strong> Latar berwarna abu-abu mendalam memiliki kontras rona warna tersaring, memangkas emisi cahaya biru yang berbahaya bagi retina mata.
            </p>
            <p>
              2. <strong className="text-white">Layering Elevasi:</strong> Card didesain sedikit lebih terang dari background. Hal ini mereplikasi dunia nyata di mana objek yang berada di depan memantulkan lebih banyak cahaya.
            </p>
            <p>
              3. <strong className="text-white">Sentuhan Border Lembut:</strong> Menggunakan garis transparan memberikan diferensiasi batas tepi yang anggun, melambangkan kemewahan modern visual premium.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
