"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

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
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Guten Tag, {name}!
          </h1>
          <p className="text-sm text-muted-foreground max-w-lg leading-relaxed">
            Selamat datang kembali. Lanjutkan pembelajaran Anda secara konsisten untuk melatih empat keterampilan bahasa Jerman menuju standar CEFR A1.
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-4 rounded-2xl bg-muted/30 p-4 border border-border/40">
          <div className="flex size-10 items-center justify-center rounded-xl bg-[#DD0000]/10 border border-[#DD0000]/20 text-[#DD0000]">
            <BookOpen className="size-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-foreground">Begrüßung & Alltag</p>
            <Link
              href="/dashboard/courses/begruessung"
              className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-[#DD0000] hover:underline"
            >
              Lanjutkan Belajar
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
