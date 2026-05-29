import { Award, CheckCircle2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function CertificateMilestone() {
  return (
    <Card className="rounded-3xl border border-border/40 bg-card/95 p-6 shadow-xs flex flex-col justify-between">
      <div>
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Pencapaian Akhir
            </p>
            <h3 className="text-xl font-extrabold text-foreground">Sertifikat Kelulusan</h3>
          </div>
          <Award className="size-6 text-muted-foreground/40" />
        </div>

        <CardContent className="space-y-4 p-0">
          <div className="relative rounded-2xl border border-dashed border-border/60 bg-muted/20 p-4 text-center">
            <Lock className="absolute right-3 top-3 size-4 text-muted-foreground/60" />
            <Award className="mx-auto size-8 text-muted-foreground/30" />
            <p className="mt-2 text-sm font-extrabold text-muted-foreground/75">
              Sertifikat CEFR A1
            </p>
            <p className="text-[10px] text-muted-foreground">Terkunci hingga semua syarat terpenuhi</p>
          </div>

          <div className="space-y-2 text-xs font-bold">
            <div className="flex items-center gap-2 text-foreground">
              <CheckCircle2 className="size-4 text-primary" />
              <span>Selesaikan 3 Modul Utama (2/3)</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Lock className="size-4 text-muted-foreground/50" />
              <span>Lulus Mini Exam A1 (Terkunci)</span>
            </div>
          </div>
        </CardContent>
      </div>

      <Button type="button" disabled className="mt-6 h-10 w-full rounded-xl text-xs font-bold">
        Unduh Sertifikat A1
      </Button>
    </Card>
  );
}
