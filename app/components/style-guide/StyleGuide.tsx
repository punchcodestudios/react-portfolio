import { ColorPalette } from "./sections/color-pallette";
import { TypographySection } from "./sections/typography-section";
import { SpacingSection } from "./sections/spacing-section";
import { ComponentsSection } from "./sections/component-section";
import { IconsSection } from "./sections/icon-section";
import { LayoutSection } from "./sections/layout-section";
import { ThemeToggle } from "./ThemeToggle";
import { ThemeDemo } from "./sections/theme-demo";

export function StyleGuide() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-6 py-8 flex items-start justify-between">
          <div>
            <h1 className="text-foreground">Portfolio Design System</h1>
            <p className="text-muted-foreground mt-2">
              A comprehensive style guide for building consistent and accessible
              interfaces
            </p>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 space-y-20">
        {/* Theme Demo */}
        <section id="themes">
          <div className="mb-8">
            <h2 className="text-foreground mb-2">Theming</h2>
            <p className="text-muted-foreground">
              Dynamic theme system with light, dark, and system preferences
            </p>
          </div>
          <ThemeDemo />
        </section>

        {/* Color Palette */}
        <section id="colors">
          <div className="mb-8">
            <h2 className="text-foreground mb-2">Color Palette</h2>
            <p className="text-muted-foreground">
              Our color system is built on semantic tokens for consistency and
              accessibility
            </p>
          </div>
          <ColorPalette />
        </section>

        {/* Typography */}
        <section id="typography">
          <div className="mb-8">
            <h2 className="text-foreground mb-2">Typography</h2>
            <p className="text-muted-foreground">
              Type scale and text styles for hierarchy and readability
            </p>
          </div>
          <TypographySection />
        </section>

        {/* Spacing */}
        <section id="spacing">
          <div className="mb-8">
            <h2 className="text-foreground mb-2">Spacing System</h2>
            <p className="text-muted-foreground">
              Consistent spacing scale for margins, padding, and gaps
            </p>
          </div>
          <SpacingSection />
        </section>

        {/* Icons */}
        <section id="icons">
          <div className="mb-8">
            <h2 className="text-foreground mb-2">Icons</h2>
            <p className="text-muted-foreground">
              Commonly used icons from Lucide React
            </p>
          </div>
          <IconsSection />
        </section>

        {/* Components */}
        <section id="components">
          <div className="mb-8">
            <h2 className="text-foreground mb-2">Components</h2>
            <p className="text-muted-foreground">
              Reusable UI components with variants and states
            </p>
          </div>
          <ComponentsSection />
        </section>

        {/* Layout */}
        <section id="layout">
          <div className="mb-8">
            <h2 className="text-foreground mb-2">Layout Examples</h2>
            <p className="text-muted-foreground">
              Common layout patterns for portfolio pages
            </p>
          </div>
          <LayoutSection />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card mt-20">
        <div className="container mx-auto px-6 py-8">
          <p className="text-muted-foreground text-center">
            Built with React, Tailwind CSS, and Shadcn UI
          </p>
        </div>
      </footer>
    </div>
  );
}
