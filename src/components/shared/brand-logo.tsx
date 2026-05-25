import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
};

export function BrandLogo({ className }: BrandLogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground">
        M
      </div>
      <span className="text-lg font-bold tracking-tight text-foreground">
        MeinDeutsch
      </span>
    </div>
  );
}
