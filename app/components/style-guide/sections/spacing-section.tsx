import React, { forwardRef } from "react";

export const SpacingSection = forwardRef<HTMLDivElement>((props, ref) => {
  const spacingValues = [
    { name: "0.5", pixels: "2px", rem: "0.125rem" },
    { name: "1", pixels: "4px", rem: "0.25rem" },
    { name: "2", pixels: "8px", rem: "0.5rem" },
    { name: "3", pixels: "12px", rem: "0.75rem" },
    { name: "4", pixels: "16px", rem: "1rem" },
    { name: "5", pixels: "20px", rem: "1.25rem" },
    { name: "6", pixels: "24px", rem: "1.5rem" },
    { name: "8", pixels: "32px", rem: "2rem" },
    { name: "10", pixels: "40px", rem: "2.5rem" },
    { name: "12", pixels: "48px", rem: "3rem" },
    { name: "16", pixels: "64px", rem: "4rem" },
    { name: "20", pixels: "80px", rem: "5rem" },
  ];

  return (
    <div ref={ref} className="space-y-8" {...props}>
      {/* Spacing Scale */}
      <div className="space-y-4">
        <h3 className="text-muted-foreground">Spacing Scale</h3>
        <div className="bg-card border rounded-lg p-6">
          <div className="space-y-4">
            {spacingValues.map((spacing) => (
              <div key={spacing.name} className="flex items-center gap-4">
                <div className="w-20 text-muted-foreground text-sm">
                  {spacing.name}
                </div>
                <div
                  className="bg-primary h-6"
                  style={{ width: spacing.pixels }}
                />
                <div className="text-muted-foreground text-sm">
                  {spacing.pixels} / {spacing.rem}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Usage Examples */}
      <div className="space-y-4">
        <h3 className="text-muted-foreground">Usage Examples</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Padding */}
          <div className="bg-card border rounded-lg p-6 space-y-3">
            <h4>Padding</h4>
            <div className="bg-muted p-2 rounded">
              <div className="bg-background border p-2 rounded">p-2 (8px)</div>
            </div>
            <div className="bg-muted p-2 rounded">
              <div className="bg-background border p-4 rounded">p-4 (16px)</div>
            </div>
            <div className="bg-muted p-2 rounded">
              <div className="bg-background border p-6 rounded">p-6 (24px)</div>
            </div>
          </div>

          {/* Gaps */}
          <div className="bg-card border rounded-lg p-6 space-y-3">
            <h4>Gaps (Flexbox/Grid)</h4>
            <div className="flex gap-2 bg-muted p-2 rounded">
              <div className="bg-background border p-4 rounded flex-1 text-center text-sm">
                gap-2
              </div>
              <div className="bg-background border p-4 rounded flex-1 text-center text-sm">
                8px
              </div>
            </div>
            <div className="flex gap-4 bg-muted p-2 rounded">
              <div className="bg-background border p-4 rounded flex-1 text-center text-sm">
                gap-4
              </div>
              <div className="bg-background border p-4 rounded flex-1 text-center text-sm">
                16px
              </div>
            </div>
            <div className="flex gap-6 bg-muted p-2 rounded">
              <div className="bg-background border p-4 rounded flex-1 text-center text-sm">
                gap-6
              </div>
              <div className="bg-background border p-4 rounded flex-1 text-center text-sm">
                24px
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

SpacingSection.displayName = "SpacingSection";
