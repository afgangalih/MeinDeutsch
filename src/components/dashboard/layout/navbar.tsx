"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Bell, Globe, Menu, Search } from "lucide-react";

import { SidebarContent } from "./sidebar";
import { BrandLogo } from "@/components/shared/brand-logo";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { supabase } from "@/lib/supabase";

function getInitials(name: string, email: string) {
  const source = name || email || "MD";
  return source
    .split(/[ @._-]/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function DashboardNavbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUserEmail(data.user.email ?? "");
        supabase
          .from("users")
          .select("full_name, name")
          .eq("id", data.user.id)
          .maybeSingle()
          .then(({ data: userData }) => {
            if (userData) {
              setUserName(userData.full_name || userData.name || "Siswa");
            } else {
              setUserName("Siswa");
            }
          });
      }
    });
  }, []);

  const pageTitle = (() => {
    if (pathname.startsWith("/dashboard/courses")) return "Materi Pembelajaran";
    if (pathname.startsWith("/dashboard/four-skills")) return "Latihan Keterampilan";
    if (pathname.startsWith("/dashboard/vocabulary")) return "Kamus Kosakata";
    if (pathname.startsWith("/dashboard/grammar")) return "Referensi Tata Bahasa";
    if (pathname.startsWith("/dashboard/smart-review")) return "Smart Review";
    return "Dashboard Utama";
  })();

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border/40 bg-card/95 px-6 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger
            render={
              <button
                type="button"
                className="inline-flex size-9 items-center justify-center rounded-xl border border-border bg-background text-foreground transition-colors hover:bg-muted lg:hidden"
                aria-label="Buka menu navigasi"
              />
            }
          >
            <Menu className="size-4" aria-hidden="true" />
          </SheetTrigger>
          <SheetContent side="left" className="w-80 max-w-[86vw] p-0" showCloseButton={false}>
            <SheetHeader className="sr-only">
              <SheetTitle>Menu navigasi dashboard</SheetTitle>
            </SheetHeader>
            <SidebarContent onNavigate={() => setMobileOpen(false)} />
          </SheetContent>
        </Sheet>

        <div className="flex items-center gap-2 lg:hidden">
          <BrandLogo />
        </div>

        <div className="hidden flex-col lg:flex">
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            MeinDeutsch Platform
          </p>
          <h2 className="text-sm font-extrabold text-foreground">{pageTitle}</h2>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden w-64 md:block">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari materi belajar..."
            className="h-9 w-full rounded-full border border-border bg-background/50 pl-9 pr-4 text-xs outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-full border border-border bg-background px-3 py-1 text-[10px] font-bold text-foreground">
            <Globe className="size-3.5 text-[#FFCC00]" />
            <span>DE / ID</span>
          </div>

          <Button type="button" variant="ghost" size="icon" className="size-9 rounded-full relative">
            <Bell className="size-4 text-foreground/80" />
            <span className="absolute right-2 top-2 size-2 rounded-full bg-primary" />
          </Button>

          <div className="h-4 w-px bg-border/60" />

          <div className="flex items-center gap-3 rounded-full border border-border/60 bg-muted/20 pl-2 pr-3.5 py-1.5">
            <Avatar className="size-7">
              <AvatarFallback className="text-[10px] font-extrabold bg-[#DD0000]/10 text-[#DD0000] border border-[#DD0000]/20">
                {getInitials(userName, userEmail)}
              </AvatarFallback>
            </Avatar>
            <div className="hidden flex-col md:flex">
              <span className="text-xs font-extrabold leading-none text-foreground">
                {userName || "Siswa"}
              </span>
              <span className="mt-0.5 text-[9px] font-medium leading-none text-muted-foreground">
                {userEmail}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
