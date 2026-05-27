"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BookOpen,
  Gauge,
  GraduationCap,
  LogOut,
  Menu,
  MessageSquareText,
} from "lucide-react";

import { BrandLogo } from "@/components/shared/brand-logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

type Profile = {
  full_name?: string | null;
  name?: string | null;
  email?: string | null;
  avatar_url?: string | null;
};

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: Gauge },
  { label: "Materi", href: "/dashboard/courses", icon: BookOpen },
  { label: "Vocabulary", href: "/dashboard/vocabulary", icon: MessageSquareText },
  { label: "Grammar", href: "/dashboard/grammar", icon: GraduationCap },
];

async function fetchProfile(userId: string): Promise<Profile | null> {
  const usersResult = await supabase
    .from("users")
    .select("full_name,name,email,avatar_url")
    .eq("id", userId)
    .maybeSingle();

  if (usersResult.data) {
    return usersResult.data;
  }

  const profilesResult = await supabase
    .from("profiles")
    .select("full_name,avatar_url")
    .eq("id", userId)
    .maybeSingle();

  return profilesResult.data;
}

function getInitials(name?: string | null, email?: string | null) {
  const source = name || email || "MD";
  return source
    .split(/[ @._-]/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [email, setEmail] = useState<string>("");
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    let active = true;

    supabase.auth.getUser().then(async ({ data }) => {
      if (!active || !data.user) {
        return;
      }

      setEmail(data.user.email ?? "");
      const nextProfile = await fetchProfile(data.user.id);

      if (active) {
        setProfile(nextProfile);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  const displayName = useMemo(
    () => profile?.full_name || profile?.name || email || "Siswa MeinDeutsch",
    [email, profile]
  );

  async function handleLogout() {
    setLoggingOut(true);
    await supabase.auth.signOut();
    router.replace("/");
    router.refresh();
  }

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="border-b border-sidebar-border px-5 py-5">
        <BrandLogo />
      </div>

      <nav className="flex-1 space-y-1 px-3 py-5">
        {navItems.map((item) => {
          const active =
            item.href === "/dashboard"
              ? pathname === item.href
              : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                active && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
              )}
            >
              <Icon className="size-4" aria-hidden="true" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-sidebar-border p-4">
        <div className="mb-3 flex min-w-0 items-center gap-3 rounded-lg bg-muted/60 p-3">
          <Avatar>
            {profile?.avatar_url ? <AvatarImage src={profile.avatar_url} alt="" /> : null}
            <AvatarFallback>{getInitials(displayName, email)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{displayName}</p>
            <p className="truncate text-xs text-muted-foreground">{email}</p>
          </div>
        </div>
        <Button
          type="button"
          variant="outline"
          className="w-full justify-start"
          onClick={handleLogout}
          disabled={loggingOut}
        >
          <LogOut className="size-4" aria-hidden="true" />
          {loggingOut ? "Keluar..." : "Abmelden"}
        </Button>
      </div>
    </div>
  );
}

export function DashboardSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-sidebar-border bg-sidebar lg:block">
        <SidebarContent />
      </aside>

      <div className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur lg:hidden">
        <BrandLogo />
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <button
                type="button"
                className={buttonVariants({ variant: "outline", size: "icon" })}
                aria-label="Buka menu dashboard"
              />
            }
          >
            <Menu className="size-4" aria-hidden="true" />
          </SheetTrigger>
          <SheetContent side="left" className="w-80 max-w-[86vw] p-0" showCloseButton={false}>
            <SheetHeader className="sr-only">
              <SheetTitle>Menu dashboard</SheetTitle>
            </SheetHeader>
            <SidebarContent onNavigate={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
