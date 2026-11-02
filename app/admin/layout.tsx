import Link from "next/link";
import { logoutAction } from "./actions";
import { ExternalLink, LogOut, Terminal, Layers } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      {/* Admin Header */}
      <header className="border-b-4 border-primary bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-1 border-2 border-primary bg-background">
              <Terminal className="w-5 h-5 text-primary" />
            </div>
            <div>
              <Link href="/admin" className="font-bold text-sm md:text-base text-primary tracking-wide">
                PORTFOLIO ADMIN
              </Link>
              <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span>TURSO CLOUD SQLITE CONNECTED</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="retro-button text-xs py-1.5 px-3 bg-secondary text-secondary-foreground border-secondary-foreground flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View Live Site</span>
            </Link>

            <form action={logoutAction}>
              <button
                type="submit"
                className="retro-button text-xs py-1.5 px-3 bg-destructive text-destructive-foreground border-destructive-foreground flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Admin Content */}
      <main className="flex-1 container mx-auto px-4 py-8">{children}</main>

      {/* Admin Footer */}
      <footer className="border-t-2 border-primary/40 py-3 text-center text-[10px] text-muted-foreground">
        Admin Panel — Powered by Next.js 15, Turso & Cloudinary
      </footer>
    </div>
  );
}

