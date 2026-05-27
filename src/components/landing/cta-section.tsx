import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CTASection() {
  return (
    <section className="relative min-h-[60vh] lg:min-h-[70vh] flex flex-col justify-center overflow-hidden border-b border-border bg-background bg-grid-pattern">
      <div className="absolute inset-y-0 left-[8%] w-px bg-border/30 pointer-events-none hidden xl:block" />
      <div className="absolute inset-y-0 right-[8%] w-px bg-border/30 pointer-events-none hidden xl:block" />
      <div className="mx-auto w-full max-w-4xl px-6 py-12 flex-1 flex flex-col justify-center relative z-10">
        <div className="relative overflow-hidden rounded-3xl border border-border/40 bg-card px-6 py-12 text-center shadow-xs md:py-16">
          <div className="absolute top-0 left-0 right-0 h-1.5 flex">
            <div className="h-full flex-1 bg-foreground" />
            <div className="h-full flex-1 bg-primary" />
            <div className="h-full flex-1 bg-secondary" />
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Siap Menguasai Bahasa Jerman?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            Daftar gratis hari ini dan mulai tingkatkan keterampilan bahasa Jerman Anda langkah demi langkah.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
            <Link
              href="/register"
              className={cn(
                buttonVariants({ variant: "secondary" }),
                "h-11 gap-2 px-6 text-sm font-bold rounded-xl shadow-md border border-secondary/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
              )}
            >
              Buat Akun Gratis
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-11 px-6 text-sm font-semibold rounded-xl border border-border bg-card hover:bg-muted shadow-sm transition-all hover:-translate-y-0.5 active:translate-y-0"
              )}
            >
              Masuk ke Dashboard
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
