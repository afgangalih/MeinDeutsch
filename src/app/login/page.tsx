"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertCircle, LogIn, ArrowLeft } from "lucide-react";
import Image from "next/image";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      setError("Email atau password belum cocok. Coba periksa kembali data masukmu.");
      return;
    }

    router.replace(searchParams.get("redirectTo") || "/dashboard");
    router.refresh();
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
            Willkommen zurück
          </h2>
          <p className="mt-1.5 text-xs text-muted-foreground">
            Masuk dengan akun yang terdaftar untuk melanjutkan belajar
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="size-4" aria-hidden="true" />
            <AlertDescription className="text-xs">{error}</AlertDescription>
          </Alert>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
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
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              placeholder="Masukkan password"
              className="h-10 border-border bg-background px-3 text-sm rounded-xl"
            />
          </div>
          <Button
            type="submit"
            className="h-11 w-full text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/95 rounded-xl gap-2 mt-2 transition-all"
            disabled={loading}
          >
            <LogIn className="size-4" aria-hidden="true" />
            {loading ? "Memproses..." : "Masuk ke Platform"}
          </Button>
        </form>

        <div className="mt-6 border-t border-border pt-5 text-center">
          <p className="text-xs text-muted-foreground">
            Belum punya akun?{" "}
            <Link href="/register" className="font-bold text-primary hover:underline">
              Daftar gratis
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
