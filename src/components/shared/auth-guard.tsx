"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Session } from "@supabase/supabase-js";

import { BrandLogo } from "@/components/shared/brand-logo";
import { supabase } from "@/lib/supabase";

type AuthGuardProps = {
  children: React.ReactNode;
};

export function AuthGuard({ children }: AuthGuardProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let active = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!active) {
        return;
      }

      setSession(data.session);
      setChecking(false);

      if (!data.session) {
        router.replace(`/login?redirectTo=${encodeURIComponent(pathname)}`);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);

      if (!nextSession) {
        router.replace("/login");
      }
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [pathname, router]);

  if (checking || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/40 px-6">
        <div className="flex flex-col items-center gap-5 text-center">
          <BrandLogo />
          <div className="h-1.5 w-44 overflow-hidden rounded-full bg-border">
            <div className="h-full w-1/2 animate-[pulse_1s_ease-in-out_infinite] rounded-full bg-primary" />
          </div>
          <p className="text-sm text-muted-foreground">Memeriksa sesi belajar...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
