import { ThemeToggle } from "@/components/shared/ThemeToggle";

export default function Home() {
  return (
    <div className="flex flex-col h-full">
      <nav className="h-14 border-b border-border flex items-center justify-between px-4 bg-background">
        <span className="font-semibold text-foreground">Photo Frame Maker</span>
        <ThemeToggle />
      </nav>
      <main className="flex-1 flex items-center justify-center bg-muted text-muted-foreground text-sm">
        Canvas stage goes here — Step 3
      </main>
    </div>
  );
}
