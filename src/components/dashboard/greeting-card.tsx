"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Sparkles } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";

async function getDisplayName(userId: string, fallbackEmail?: string) {
  const usersResult = await supabase
    .from("users")
    .select("full_name,name")
    .eq("id", userId)
    .maybeSingle();

  if (usersResult.data?.full_name || usersResult.data?.name) {
    return usersResult.data.full_name || usersResult.data.name;
  }

  const profilesResult = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", userId)
    .maybeSingle();

  return profilesResult.data?.full_name || fallbackEmail?.split("@")[0] || "Siswa";
}

export function GreetingCard() {
  const [name, setName] = useState("Siswa");

  useEffect(() => {
    let active = true;

    supabase.auth.getUser().then(async ({ data }) => {
      if (!active || !data.user) {
        return;
      }

      const displayName = await getDisplayName(data.user.id, data.user.email);

      if (active && displayName) {
        setName(displayName);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  return (
    <Card className="rounded-lg border-0 bg-[#111827] py-0 text-white ring-0">
      <CardContent className="relative overflow-hidden px-5 py-6 sm:px-7 sm:py-8">
        <div className="absolute right-0 top-0 h-full w-1/3 bg-[linear-gradient(135deg,rgba(221,0,0,0.9),rgba(255,204,0,0.92))]" />
        <div className="relative max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
            <CalendarDays className="size-3.5" aria-hidden="true" />
            Deutsch Sprint A1
          </div>
          <h1 className="text-2xl font-semibold tracking-normal sm:text-3xl">
            Guten Tag, {name}.
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-white/75">
            Hari ini cukup satu langkah yang jelas: lanjutkan modul A1 dan jaga ritme empat
            keterampilan tetap seimbang.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#FFCC00]">
            <Sparkles className="size-4" aria-hidden="true" />
            18 menit latihan direkomendasikan
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
