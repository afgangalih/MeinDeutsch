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
    <Card className="rounded-3xl border border-border/40 bg-card p-6 md:p-8 shadow-xs">
      <CardContent className="p-0 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary/15 px-3.5 py-1 text-xs font-bold text-foreground">
            <CalendarDays className="size-3.5 text-secondary" aria-hidden="true" />
            Deutsch Sprint A1
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            Guten Tag, {name}!
          </h1>
          <p className="mt-2 text-sm text-muted-foreground max-w-xl">
            Hari ini cukup satu langkah yang jelas: lanjutkan modul A1 dan jaga ritme empat keterampilan belajar Anda tetap seimbang.
          </p>
        </div>
        
        <div className="shrink-0 flex items-center gap-3 rounded-2xl bg-muted p-4 border border-border/30">
          <div className="flex size-10 items-center justify-center rounded-xl bg-secondary text-secondary-foreground font-bold">
            <Sparkles className="size-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-foreground">Rekomendasi Belajar</p>
            <p className="text-xs text-muted-foreground">18 menit latihan hari ini</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
