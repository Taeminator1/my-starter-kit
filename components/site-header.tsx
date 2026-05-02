import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-30">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-4 h-12">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-heading text-base font-semibold">
            Calendar Starter
          </Link>
          <nav className="flex items-center gap-3 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              일정
            </Link>
            <Link href="/booking" className="hover:text-foreground">
              예약
            </Link>
          </nav>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
