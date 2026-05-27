"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";

import { BrandLogo } from "@/components/shared/brand-logo";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Levels", href: "#levels" },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
];

export function LandingNavbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/95 backdrop-blur-md py-4 shadow-sm"
          : "border-b border-transparent bg-transparent py-5"
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <BrandLogo className="transition-all duration-300" />

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors",
                scrolled ? "text-muted-foreground hover:text-foreground" : "text-white/80 hover:text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <Link
            href="/login"
            className={cn(
              "text-sm font-semibold transition-colors",
              scrolled ? "text-foreground hover:text-foreground/80" : "text-white hover:text-white/80"
            )}
          >
            Login
          </Link>
          <Link
            href="/register"
            className="h-10 px-5 text-xs font-bold rounded-full inline-flex items-center justify-center gap-1 bg-[#DD0000] hover:bg-[#C00000] text-white shadow-sm transition-all hover:scale-105"
          >
            Mulai Gratis
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        <button
          className={cn(
            "rounded-md p-1.5 transition-colors md:hidden",
            scrolled ? "text-foreground hover:bg-muted" : "text-white hover:bg-white/10"
          )}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background px-6 pb-6 pt-4 md:hidden shadow-md">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2">
              <Link
                href="/login"
                className="h-10 rounded-full border border-border text-foreground flex items-center justify-center text-sm font-medium hover:bg-muted transition-colors"
                onClick={() => setOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/register"
                className="h-10 rounded-full bg-[#DD0000] hover:bg-[#C00000] text-white flex items-center justify-center text-sm font-bold transition-all"
                onClick={() => setOpen(false)}
              >
                Mulai Gratis
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
