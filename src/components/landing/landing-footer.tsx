import Link from "next/link";

import { BrandLogo } from "@/components/shared/brand-logo";

const footerLinks = [
  {
    group: "Platform",
    links: [
      { label: "Level A1", href: "#levels" },
      { label: "Empat Skills", href: "#features" },
      { label: "Cara Kerja", href: "#how-it-works" },
    ],
  },
  {
    group: "Akun",
    links: [
      { label: "Daftar", href: "/register" },
      { label: "Login", href: "/login" },
    ],
  },
  {
    group: "Referensi",
    links: [
      { label: "CEFR", href: "https://www.coe.int/en/web/common-european-framework-reference-languages/level-descriptions", target: "_blank" },
      { label: "Goethe-Institut", href: "https://www.goethe.de/ins/id/en/index.html", target: "_blank" },
    ],
  },
];

export function LandingFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <BrandLogo />
            <p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">
              Platform belajar bahasa Jerman terstruktur berbasis CEFR untuk pelajar Indonesia.
            </p>
          </div>

          {footerLinks.map((col) => (
            <div key={col.group}>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-foreground">
                {col.group}
              </p>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target={"target" in link ? link.target : undefined}
                      rel={"target" in link ? "noopener noreferrer" : undefined}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} MeinDeutsch. Platform pembelajaran bahasa Jerman.
          </p>
          <p className="text-xs text-muted-foreground">
            Mengacu pada standar{" "}
            <span className="font-medium text-foreground">CEFR</span> &{" "}
            <span className="font-medium text-foreground">Goethe-Institut</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
