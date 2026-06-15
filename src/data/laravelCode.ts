import { LaravelCodeSnippet } from '../types';

export const laravelSnippets: LaravelCodeSnippet[] = [
  {
    id: 'controller',
    filename: 'app/Http/Controllers/AuthController.php',
    language: 'php',
    description: 'Controller Laravel untuk memproses autentikasi (login, logout, registrasi). Di sini logic utama login diletakkan, termasuk validasi, hash matching, dan session management.',
    code: `<?php

namespace App\Http\Controllers;

use Illuminate\\Http\\Request;
use Illuminate\\Support\\Facades\\Auth;

class AuthController extends Controller
{
    // 1. Menampilkan halaman login
    public function showLogin()
    {
        return view('auth.login');
    }

    // 2. Memproses request login
    public function login(Request $request)
    {
        // Validasi input dari user agar aman dari SQL Injection & data kosong
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        // Coba autentikasi menggunakan Auth::attempt
        // Laravel otomatis mencocokkan password dengan Bcrypt hash di database
        if (Auth::attempt($credentials, $request->remember)) {
            
            // Regenerasi session ID untuk mencegah serangan Session Fixation
            $request->session()->regenerate();

            // Redirect ke halaman sebelumnya (intended) atau dashboard default
            return redirect()->intended('dashboard');
        }

        // Jika login gagal, return back dengan pesan error
        return back()->withErrors([
            'email' => 'Email atau password yang kamu masukkan salah.',
        ])->onlyInput('email');
    }

    // 3. Memproses logout secara aman
    public function logout(Request $request)
    {
        Auth::logout();
        
        // Hapus data session aktif
        $request->session()->invalidate();
        
        // Regenerasi CSRF Token agar tidak bisa dieksploitasi
        $request->session()->regenerateToken();

        return redirect('/login');
    }
}`,
    steps: [
      {
        lineStart: 10,
        lineEnd: 14,
        title: 'Tampilkan Form View',
        explanation: 'Mengembalikan view Blade yang berlokasi di `resources/views/auth/login.blade.php`.'
      },
      {
        lineStart: 19,
        lineEnd: 24,
        title: 'Validasi Input',
        explanation: 'Mengecek apakah email terisi dengan format valid dan password tidak kosong. Jika gagal, otomatis melompat balik ke form dengan pesan error.'
      },
      {
        lineStart: 26,
        lineEnd: 34,
        title: 'Auth::attempt & Session Security',
        explanation: 'Metode bawaan Laravel untuk memverifikasi kecocokan email & password terenkripsi. Session ID direhabilitasi (`regenerate()`) untuk menetralisir pembajakan sesi (Session Fixation).'
      },
      {
        lineStart: 36,
        lineEnd: 41,
        title: 'Pencegahan Kebocoran info',
        explanation: 'Mengembalikan respon error spesifik untuk email/password namun tidak berlebihan, mempertahankan isian email semula (`onlyInput`) agar user tidak capek mengetik ulang.'
      },
      {
        lineStart: 44,
        lineEnd: 55,
        title: 'Protokol Logout Aman',
        explanation: 'Keamanan ekstra: Session di-invalidate, dan token CSRF dibuat ulang (`regenerateToken()`) untuk menghentikan ancaman replay session.'
      }
    ]
  },
  {
    id: 'routes',
    filename: 'routes/web.php',
    language: 'php',
    description: 'Routing file di Laravel untuk mendaftarkan URL login, logout, dan membatasi akses menggunakan middleware guest dan auth.',
    code: `<?php

use App\\Http\\Controllers\\AuthController;
use Illuminate\\Support\\Facades\\Route;

// Grouping router untuk user yang BELUM LOGIN (guest)
Route::middleware('guest')->group(function () {
    
    // Halaman form login (GET)
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    
    // Eksekusi proses login saat tombol submit ditekan (POST)
    Route::post('/login', [AuthController::class, 'login']);
});

// Route untuk user yang SUDAH LOGIN (auth)
Route::post('/logout', [AuthController::class, 'logout'])
    ->name('logout')
    ->middleware('auth');
`,
    steps: [
      {
        lineStart: 6,
        lineEnd: 14,
        title: 'Middleware Guest',
        explanation: 'Hanya memperbolehkan pengguna anonim (belum login) untuk mengakses halaman login. Jika sudah login, otomatis diredirect ke halaman dashboard.'
      },
      {
        lineStart: 16,
        lineEnd: 19,
        title: 'Middleware Auth',
        explanation: 'Membatasi rute logout atau halaman dalam lainnya hanya jika pengguna telah terotentikasi. Melindungi dari request logout ilegal.'
      }
    ]
  },
  {
    id: 'view',
    filename: 'resources/views/auth/login.blade.php',
    language: 'html',
    description: 'Halaman template Blade Laravel yang berisi form login yang distyle menggunakan utility class Tailwind CSS bertema Dark Mode estetik.',
    code: `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Masuk - My App</title>
    <!-- Import Tailwind -->
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen flex items-center justify-center p-6 selection:bg-indigo-500 selection:text-white">

    <div class="w-full max-w-md bg-slate-900 border border-slate-800/80 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        
        <!-- Efek Glow di Layout Belakang (Aesthetic Outer Glows) -->
        <div class="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl"></div>
        <div class="absolute -bottom-10 -left-10 w-32 h-32 bg-violet-500/10 rounded-full blur-2xl"></div>

        <!-- Header -->
        <div class="mb-8 relative">
            <h2 class="text-2xl font-bold text-white tracking-tight">Selamat Datang Kembali</h2>
            <p class="text-sm text-slate-400 mt-1">Silakan masuk ke akun Anda untuk melanjutkan.</p>
        </div>

        <!-- Pesan Error Laravel (Jika Validasi Gagal) -->
        @if ($errors->any())
            <div class="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {{ $errors->first() }}
            </div>
        @endif

        <!-- Form Login -->
        <form action="{{ route('login') }}" method="POST" class="space-y-5 relative">
            @csrf <!-- Proteksi Cross-Site Request Forgery (Wajib di Laravel!) -->
            
            <!-- Email Field -->
            <div>
                <label class="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Alamat Email</label>
                <input type="email" name="email" id="email" value="{{ old('email') }}" required
                    class="w-full bg-slate-950 border border-slate-800/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
                    placeholder="nama@email.com">
            </div>

            <!-- Password Field -->
            <div>
                <div class="flex justify-between items-center mb-2">
                    <label class="block text-xs font-semibold uppercase tracking-wider text-slate-400">Password</label>
                    <a href="#" class="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">Lupa password?</a>
                </div>
                <input type="password" name="password" id="password" required
                    class="w-full bg-slate-950 border border-slate-800/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
                    placeholder="••••••••">
            </div>

            <!-- Remember Me -->
            <div class="flex items-center">
                <input type="checkbox" name="remember" id="remember" 
                    class="rounded bg-slate-950 border-slate-800 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-900">
                <label for="remember" class="ml-2 text-sm text-slate-400">Ingat saya di perangkat ini</label>
            </div>

            <!-- Button Submit -->
            <button type="submit" 
                class="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 px-4 rounded-xl shadow-lg shadow-indigo-600/20 hover:shadow-indigo-500/30 active:scale-[0.98] transition-all duration-200">
                Masuk ke Akun
            </button>
        </form>
    </div>
</body>
</html>`,
    steps: [
      {
        lineStart: 13,
        lineEnd: 15,
        title: 'Backdrop Ambient Blur',
        explanation: 'Menggunakan elemen lingkaran absolute di ujung-ujung card yang diberi opasitas rendah (`/10`) dan efek `blur-2xl` untuk memancarkan cahaya halus di belakang form login.'
      },
      {
        lineStart: 23,
        lineEnd: 27,
        title: 'Error Display Kompatibel',
        explanation: 'Mengecek keberadaan error validasi dari controller Laravel. Bergaya red-glassmorphism yang sesuai tema dark mode.'
      },
      {
        lineStart: 31,
        lineEnd: 31,
        title: 'Token CSRF Laravel',
        explanation: 'Direktif `@csrf` menyisipkan token acak tersembunyi. Penting untuk melindungi request POST dari serangan pemalsuan rujukan/asal (Cross-Site Request Forgery).'
      },
      {
        lineStart: 34,
        lineEnd: 41,
        title: 'Form Input Modern',
        explanation: 'Inputan diberi border tipis (`border-slate-800/80`) dengan background ultra gelap (`bg-slate-950`). Saat diklik, transisi border mengubah warna ke `indigo-500`.'
      },
      {
        lineStart: 59,
        lineEnd: 63,
        title: 'Efek Tombol Taktil',
        explanation: 'Aktivasi `active:scale-[0.98]` menimbulkan sensasi feedback fisik / taktil elastis yang estetik saat mouse diklik.'
      }
    ]
  }
];
