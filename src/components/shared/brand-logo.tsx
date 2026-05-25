import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
};

export function BrandLogo({ className }: BrandLogoProps) {
  return (
    <div className={cn("flex items-center", className)}>
      <Image
        src="/logo-md.png"
        alt="MeinDeutsch Logo"
        width={180}
        height={48}
        priority
        style={{ height: "40px", width: "auto" }}
        className="object-contain"
      />
    </div>
  );
}

