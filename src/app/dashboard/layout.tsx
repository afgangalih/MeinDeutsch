import { DashboardSidebar } from "@/components/dashboard/layout/sidebar";
import { DashboardNavbar } from "@/components/dashboard/layout/navbar";
import { DashboardFooter } from "@/components/dashboard/layout/footer";
import { AuthGuard } from "@/components/shared/auth-guard";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-muted/30 flex">
        <DashboardSidebar />
        <main className="lg:pl-72 flex-1 flex flex-col min-h-screen">
          <DashboardNavbar />
          <div className="flex-1 mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            {children}
          </div>
          <DashboardFooter />
        </main>
      </div>
    </AuthGuard>
  );
}
