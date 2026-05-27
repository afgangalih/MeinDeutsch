"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, UserPlus, ArrowLeft } from "lucide-react";
import Image from "next/image";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";

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
      console.error("Sign up error:", signUpError);
      setError(signUpError.message || "Pendaftaran belum berhasil. Coba periksa kembali data pendaftaranmu.");
      return;
    }

    if (data.session) {
      router.replace("/dashboard");
      router.refresh();
      return;
    }

    setMessage("Akun berhasil dibuat! Silakan masuk menggunakan email dan password Anda.");
  }

  return (
    <main className="min-h-screen bg-background flex flex-col justify-center items-center px-4 py-12 relative">
      <div className="absolute top-6 left-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          Kembali ke Beranda
        </Link>
      </div>

      <div className="relative w-full max-w-[420px] overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-md">
        <div className="absolute top-0 left-0 right-0 h-1.5 flex">
          <div className="h-full flex-1 bg-foreground" />
          <div className="h-full flex-1 bg-primary" />
          <div className="h-full flex-1 bg-secondary" />
        </div>

        <div className="flex justify-center mb-6">
          <Image
            src="/logo-md.png"
            alt="MeinDeutsch Logo"
            width={220}
            height={60}
            priority
            style={{ height: "50px", width: "auto" }}
            className="object-contain"
          />
        </div>

        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Daftar Akun
          </h2>
          <p className="mt-1.5 text-xs text-muted-foreground">
            Buat akun untuk merekam perjalanan belajar bahasa Jermanmu
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="size-4" aria-hidden="true" />
            <AlertDescription className="text-xs">{error}</AlertDescription>
          </Alert>
        )}

        {message && (
          <Alert className="mb-4 border-secondary/60 bg-secondary/15">
            <AlertDescription className="text-xs text-foreground font-semibold">{message}</AlertDescription>
          </Alert>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1.5">
            <Label htmlFor="full-name" className="text-xs font-semibold text-foreground">
              Nama Lengkap
            </Label>
            <Input
              id="full-name"
              type="text"
              autoComplete="name"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              required
              placeholder="Nama lengkap Anda"
              className="h-10 border-border bg-background px-3 text-sm rounded-xl"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-xs font-semibold text-foreground">
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
              className="h-10 border-border bg-background px-3 text-sm rounded-xl"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-xs font-semibold text-foreground">
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
              className="h-10 border-border bg-background px-3 text-sm rounded-xl"
            />
          </div>
          <Button
            type="submit"
            className="h-11 w-full text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/95 rounded-xl gap-2 mt-2 transition-all"
            disabled={loading}
          >
            <UserPlus className="size-4" aria-hidden="true" />
            {loading ? "Mendaftarkan..." : "Daftar Akun Baru"}
          </Button>
        </form>

        <div className="mt-6 border-t border-border pt-5 text-center">
          <p className="text-xs text-muted-foreground">
            Sudah punya akun?{" "}
            <Link href="/login" className="font-bold text-primary hover:underline">
              Masuk disini
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
