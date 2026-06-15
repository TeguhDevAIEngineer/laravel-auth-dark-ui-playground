import React, { useState, useEffect } from 'react';
import AestheticCardPlayground from './components/AestheticCardPlayground';
import LaravelCodeViewer from './components/LaravelCodeViewer';
import { 
  GraduationCap, 
  Code, 
  Terminal, 
  KeyRound, 
  ShieldAlert, 
  HelpCircle, 
  BookOpen, 
  Calendar,
  Sparkles,
  Layers,
  Activity,
  Heart,
  ChevronDown
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'playground' | 'code' | 'theory'>('playground');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Time state to make the board feel incredibly alive and responsive:
  const [currentTime, setCurrentTime] = useState<Date>(new Date('2026-06-15T06:05:11-07:00'));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(prev => new Date(prev.getTime() + 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatLocalDate = (date: Date) => {
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatLocalTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  const faqData = [
    {
      q: "Bagaimana Laravel mengamankan password di database secara otomatis?",
      a: "Laravel menggunakan algoritma hashing Bcrypt atau Argon2 melalui facade Hash secara default. Saat Anda memanggil `Auth::attempt($credentials)`, Laravel secara otomatis mencocokkan password mentah dari form input dengan Bcrypt string acak yang tersimpan di database menggunakan PHP password_verify(). Password mentah tidak pernah disimpan dan tidak pernah dibandingkan secara langsung tanpa hashing."
    },
    {
      q: "Mengapa laravel mewajibkan direktif @csrf di setiap file form html blade?",
      a: "CSRF (Cross-Site Request Forgery) adalah serangan di mana situs asing memaksa browser korban mengirimkan request ilegal ke server Anda. Dengan menyisipkan `@csrf`, Laravel meletakkan token rahasia acak unik sesi di dalam form. Saat data disubmit, middleware VerifyCsrfToken memverifikasi token tersebut. Jika tidak cocok atau absen, server langsung melempar respon HTTP 419 (Page Expired)."
    },
    {
      q: "Apa guna meletakkan 'regenerate()' sesaat setelah berhasil login?",
      a: "Ini untuk memitigasi serangan 'Session Fixation'. Peretas terkadang menanamkan Session ID buatan mereka ke browser calon korban. Jika korban login menggunakan Session ID yang sama, peretas dapat mengakses akun korban. Memanggil `$request->session()->regenerate()` memastikan ID sesi langsung diganti baru sesaat setelah autentikasi sukses berganti status."
    },
    {
      q: "Mengapa warna hitam pekat murni (#000000) dilarang dalam estetika Dark UI?",
      a: "Hitam murni (#000) memaksa kontras teks putih murni menjadi terlalu ekstrim (kontras 21:1). Hal ini berefek pendaran tajam pada mata yang mempercepat lelah (eye strain). Memanfaatkan warna dasar seperti Slate-950 atau Zinc-950 mengurangi rasio kontras ekstrem ke level sehat (sekitar 15:1 s/d 18:1) sekaligus memberikan rona kedalaman modern."
    },
    {
      q: "Bagaimana cara beralih dari manual auth ke starter kit Laravel?",
      a: "Rekomendasi terbaik Laravel adalah menggunakan Laravel Breeze. Anda hanya perlu menjalankan `composer require laravel/breeze --dev`, diikuti dengan `php artisan breeze:install` (pilih opsi Blade, Livewire, atau React), lalu jalankan `php artisan migrate`. Ini langsung menyiapkan fungsi login, daftar, lupa password, verifikasi email, dan UI responsive yang estetik!"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white font-sans" id="app-root">
      
      {/* Background Decorative Lighting Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[300px] bg-violet-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Primary Container */}
      <div className="w-full max-w-7xl mx-auto px-4 py-6 flex-1 flex flex-col gap-6 relative z-10">
        
        {/* Top Navbar / Branding Area */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-6 bg-slate-900/40 border border-slate-800/80 rounded-2xl gap-4 backdrop-blur-sm shadow-lg shadow-black/20" id="main-header">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/20">
              <KeyRound className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-extrabold text-white tracking-tight">
                  Laravel Auth &amp; Dark UI
                </h1>
                <span className="text-[10px] font-mono bg-indigo-950 border border-indigo-900 text-indigo-400 font-semibold px-2 py-0.5 rounded">
                  PLAYGROUND v2.0
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Media Pendidikan Interaktif: Backend Laravel &amp; Estetika Frontend
              </p>
            </div>
          </div>

          {/* Time & User Info Panel */}
          <div className="flex items-center gap-3 self-start sm:self-center">
            <div className="text-right hidden md:block">
              <span className="text-[10px] font-mono text-slate-500 uppercase block tracking-wider">
                Waktu Sistem (UTC-7)
              </span>
              <span className="text-xs font-mono font-semibold text-slate-300">
                {formatLocalDate(currentTime)} • {formatLocalTime(currentTime)}
              </span>
            </div>
            <div className="h-8 w-px bg-slate-800 hidden md:block"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 text-xs font-mono font-bold text-indigo-300 uppercase">
                RT
              </div>
              <div className="text-left">
                <span className="text-[10px] text-slate-500 block leading-tight">Pengguna</span>
                <span className="text-xs font-medium text-slate-300">rahayuteguh953</span>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Segment */}
        <section className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 to-indigo-950/40 border border-slate-805 border-slate-800/80 rounded-2xl relative overflow-hidden shadow-xl" id="hero-banner">
          <div className="absolute right-0 top-0 w-1/3 h-full bg-indigo-600/5 blur-3xl rounded-full pointer-events-none" />
          
          <div className="max-w-2xl relative">
            <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Gabungan Logika &amp; Desain Estetik</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans leading-tight">
              Belajar Autentikasi Laravel Sekaligus Merancang Visual UI yang Nyaman di Mata 
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-3 leading-relaxed">
              Selamat datang di sandbox pembelajaran interaktif. Di sini, kamu bisa menguji bagaimana logic PHP Laravel (Controller, Routing, Token CSRF) bekerja beriringan dengan formulir UI gelap modern yang didukung utility Tailwind CSS yang elegan.
            </p>
          </div>
        </section>

        {/* Main Tab Controller Navigation */}
        <nav className="flex items-center border-b border-slate-800 bg-slate-950 text-sm gap-1 pt-1 overflow-x-auto scroller-hidden" id="navigation-tabs">
          <button
            id="tab-btn-playground"
            onClick={() => setActiveTab('playground')}
            className={`px-5 py-3 font-semibold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer border-b-2 ${
              activeTab === 'playground'
                ? 'border-indigo-500 text-indigo-400 bg-indigo-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>1. Interaktif Playground</span>
          </button>
          
          <button
            id="tab-btn-code"
            onClick={() => setActiveTab('code')}
            className={`px-5 py-3 font-semibold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer border-b-2 ${
              activeTab === 'code'
                ? 'border-indigo-500 text-indigo-400 bg-indigo-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>2. File Kode Laravel PHP</span>
          </button>

          <button
            id="tab-btn-theory"
            onClick={() => setActiveTab('theory')}
            className={`px-5 py-3 font-semibold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer border-b-2 ${
              activeTab === 'theory'
                ? 'border-indigo-500 text-indigo-400 bg-indigo-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>3. Tanya Jawab Keamanan &amp; Desain</span>
          </button>
        </nav>

        {/* Tab Content Router */}
        <div className="flex-1 mt-2">
          {activeTab === 'playground' && (
            <div id="content-playground" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">Form Login &amp; Parameter Simulator</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Semua perubahan parameter di sebelah kanan langsung diaplikasikan ke login form di sebelah kiri.</p>
                </div>
              </div>
              <AestheticCardPlayground />
            </div>
          )}

          {activeTab === 'code' && (
            <div id="content-code" className="space-y-6">
              <div className="mb-4">
                <h3 className="text-base font-bold text-white tracking-tight">Penjelajah Kode Sumber (Source Code Explorer)</h3>
                <p className="text-xs text-slate-400 mt-0.5">Pilih file tab dan sorot bagian baris panduan di panel sebelah kiri untuk mempelajari setiap fungsi krusial.</p>
              </div>
              <LaravelCodeViewer />
            </div>
          )}

          {activeTab === 'theory' && (
            <div id="content-theory" className="space-y-6 max-w-4xl mx-auto py-2">
              <div className="text-center max-w-2xl mx-auto mb-8">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-3 text-indigo-400">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">Kunci Keamanan Backend &amp; Estetika Frontend</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Mempelajari cara merakit autentikasi yang tangguh terhadap eksploitasi sekaligus menyajikan antar muka dark mode dengan visual kelas dunia.
                </p>
              </div>

              {/* FAQ Accordion Lists */}
              <div className="space-y-3" id="faq-lists">
                {faqData.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div 
                      key={idx}
                      className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden transition-all duration-300"
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        id={`faq-btn-${idx}`}
                        className="w-full p-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-900/80"
                      >
                        <span className="text-sm font-semibold text-slate-200 hover:text-white transition-colors">
                          {idx + 1}. {faq.q}
                        </span>
                        <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-indigo-400' : ''}`} />
                      </button>

                      {isOpen && (
                        <div className="p-4 pt-1 border-t border-slate-900 bg-slate-950/40 text-xs text-slate-400 leading-relaxed font-sans">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Security Advisory Panel */}
              <div className="p-4 bg-yellow-500/5 border border-yellow-500/10 rounded-xl mt-6 flex gap-3">
                <ShieldAlert className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-yellow-400 uppercase tracking-wide">Pemberitahuan Praktik Terbaik (Best Practice)</h5>
                  <p className="text-[11px] text-slate-400 mt-1 leading-normal font-sans">
                    Di lingkungan produksi (production), selalu simpan variabel kredensial sensitif seperti APP_KEY dan DB_PASSWORD di dalam file <span className="text-yellow-400">.env</span> (dan pastikan file tersebut terdaftar di gitignore agar tidak ter-commit ke repositori publik). Selalu gunakan HTTPS untuk merantai data autentikasi login terenkripsi dari jangkauan penyerang Man-In-The-Middle.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Area */}
        <footer className="mt-8 border-t border-slate-900 pt-6 pb-4 text-center text-xs text-slate-500" id="main-footer">
          <p>© 2026 Laravel Auth &amp; Aesthetic Dark UI Playground • Pembelajaran Kode Kreatif</p>
          <p className="mt-1 flex items-center justify-center gap-1">
            Dibuat penuh ketelitian dengan <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />  menggunakan React &amp; Tailwind CSS.
          </p>
        </footer>

      </div>
    </div>
  );
}
