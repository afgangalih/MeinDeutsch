import Link from "next/link";
import { BrandLogo } from "@/components/shared/brand-logo";

export function DashboardFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-card/65 py-4 mt-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row text-xs">
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <BrandLogo className="brightness-95" />
          <span className="hidden h-4 w-px bg-border sm:block" />
          <span className="text-muted-foreground font-medium">
            &copy; {currentYear} MeinDeutsch.
          </span>
        </div>

        <div className="flex items-center gap-6 text-muted-foreground font-semibold">
          <Link href="/privacy" className="hover:text-foreground transition-colors">
            Privasi & Ketentuan
          </Link>
          <Link href="/support" className="hover:text-foreground transition-colors">
            Bantuan
          </Link>
        </div>
      </div>
    </footer>
  );
}
