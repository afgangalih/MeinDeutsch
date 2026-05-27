import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { AuthGuard } from "@/components/shared/auth-guard";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-muted/40">
        <DashboardSidebar />
        <main className="lg:pl-72">
          <div className="mx-auto min-h-[calc(100vh-4rem)] max-w-6xl px-4 py-6 sm:px-6 lg:min-h-screen lg:px-8 lg:py-8">
            {children}
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
