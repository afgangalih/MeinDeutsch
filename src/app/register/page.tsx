"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, CheckCircle2, Star, UserPlus } from "lucide-react";

import { BrandLogo } from "@/components/shared/brand-logo";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          name: fullName,
        },
      },
    });

    setLoading(false);

    if (signUpError) {
      setError("Pendaftaran belum berhasil. Pastikan email valid dan password minimal 6 karakter.");
      return;
    }

    if (data.session) {
      router.replace("/dashboard");
      router.refresh();
      return;
    }

    setMessage("Akun dibuat. Jika verifikasi email aktif, cek inbox sebelum masuk.");
  }

  return (
    <main className="min-h-screen bg-[#f7f8fb]">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-6">
        <header className="flex items-center justify-between border-b border-[#eaecf0] pb-5">
          <BrandLogo />
          <nav className="flex items-center gap-2">
            <Link
              href="/"
              className="hidden rounded-lg px-3 py-2 text-sm font-medium text-[#667085] transition-colors hover:bg-white hover:text-[#101828] sm:inline-flex"
            >
              Beranda
            </Link>
            <Link
              href="/login"
              className="rounded-lg border border-border bg-white px-3 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted"
            >
              Masuk
            </Link>
          </nav>
        </header>

        <section className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[1fr_440px] lg:gap-16">
          <div className="hidden max-w-xl lg:block">
            <div className="mb-6 inline-flex items-center gap-2 rounded-lg border bg-white px-3 py-2 text-sm font-medium text-muted-foreground shadow-sm">
              <Star className="size-4 fill-[#FFCC00] text-[#d29b00]" aria-hidden="true" />
              Mulai belajar dengan akun pribadi
            </div>
            <h1 className="text-5xl font-semibold leading-tight tracking-normal text-[#101828]">
              Buat akun untuk menyimpan progres belajar bahasa Jermanmu.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-[#475467]">
              MeinDeutsch membantu kamu belajar kosakata, grammar, dan keterampilan komunikasi
              dengan jalur yang terstruktur tanpa terpaku pada satu level saja.
            </p>

            <div className="mt-9 grid max-w-lg gap-3">
              {[
                "Dashboard pribadi untuk memantau perkembangan",
                "Materi dan latihan yang bisa dilanjutkan kapan saja",
                "Belajar bertahap sesuai kebutuhan dan kemampuan",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm font-medium text-[#344054]">
                  <CheckCircle2 className="size-5 text-primary" aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mx-auto w-full max-w-[440px] animate-fade-up">
            <div className="rounded-lg border border-[#e4e7ec] bg-white p-7 shadow-[0_18px_45px_rgba(16,24,40,0.08)] sm:p-8">
              <div className="mb-7">
                <div className="mb-6 rounded-lg border border-[#eaecf0] bg-[#fcfcfd] px-4 py-3">
                  <BrandLogo />
                </div>
                <h2 className="text-2xl font-semibold tracking-normal text-[#101828]">
                  Daftar akun
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#667085]">
                  Isi data singkat untuk mulai menggunakan dashboard MeinDeutsch.
                </p>
              </div>

              {error ? (
                <Alert variant="destructive" className="mb-5">
                  <AlertCircle className="size-4" aria-hidden="true" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              ) : null}

              {message ? (
                <Alert className="mb-5 border-secondary/60 bg-secondary/15">
                  <AlertDescription>{message}</AlertDescription>
                </Alert>
              ) : null}

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="full-name" className="text-[#344054]">
                    Nama Lengkap
                  </Label>
                  <Input
                    id="full-name"
                    autoComplete="name"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    required
                    placeholder="Nama lengkap"
                    className="h-11 border-[#d0d5dd] bg-white px-3 shadow-xs"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#344054]">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    placeholder="nama@email.com"
                    className="h-11 border-[#d0d5dd] bg-white px-3 shadow-xs"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-[#344054]">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    minLength={6}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    placeholder="Minimal 6 karakter"
                    className="h-11 border-[#d0d5dd] bg-white px-3 shadow-xs"
                  />
                </div>
                <Button type="submit" className="h-11 w-full text-sm" disabled={loading}>
                  <UserPlus className="size-4" aria-hidden="true" />
                  {loading ? "Mendaftarkan..." : "Daftar"}
                </Button>
              </form>

              <div className="mt-6 border-t border-[#eaecf0] pt-6">
                <p className="text-center text-sm text-[#667085]">
                  Sudah punya akun?{" "}
                  <Link href="/login" className="font-semibold text-primary hover:underline">
                    Masuk
                  </Link>
                </p>
              </div>
            </div>

            <p className="mt-5 text-center text-xs leading-5 text-[#98a2b3]">
              Dengan mendaftar, progres belajar kamu dapat tersimpan di MeinDeutsch.
            </p>
          </div>
        </section>

        <footer className="flex flex-col items-center justify-between gap-3 border-t border-[#eaecf0] pt-5 text-xs text-[#667085] sm:flex-row">
          <p>© {new Date().getFullYear()} MeinDeutsch. Belajar bahasa Jerman lebih terstruktur.</p>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-[#101828]">
              Beranda
            </Link>
            <Link href="/login" className="hover:text-[#101828]">
              Masuk
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
