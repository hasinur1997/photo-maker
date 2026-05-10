// Shown only when a text layer is selected (wired to store in Step 8)
export function PropertiesPanel() {
  return (
    <aside className="w-72 shrink-0 border-l border-border bg-background overflow-y-auto">
      <div className="p-4 text-sm text-muted-foreground">
        Select a text layer to edit its properties
      </div>
    </aside>
  );
}
