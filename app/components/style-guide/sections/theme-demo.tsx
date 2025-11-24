import { useTheme } from "../ThemeProvider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Moon, Sun, Monitor } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Info } from "lucide-react";

export function ThemeDemo() {
  const { theme, actualTheme } = useTheme();

  return (
    <div className="space-y-6">
      {/* Current Theme Info */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Current Theme</AlertTitle>
        <AlertDescription>
          Selected: <Badge variant="outline">{theme}</Badge> | Active:{" "}
          <Badge variant="outline">{actualTheme}</Badge>
        </AlertDescription>
      </Alert>

      {/* Theme Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Light Theme Card */}
        <Card className="light">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Sun className="h-5 w-5" />
              <CardTitle>Light Theme</CardTitle>
            </div>
            <CardDescription>Clean and bright interface</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="h-8 bg-background rounded border" />
              <div className="h-8 bg-card rounded border" />
              <div className="h-8 bg-muted rounded" />
              <div className="h-8 bg-accent rounded" />
            </div>
            <div className="flex gap-2">
              <Button size="sm">Primary</Button>
              <Button size="sm" variant="secondary">
                Secondary
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Dark Theme Card */}
        <Card className="dark">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Moon className="h-5 w-5" />
              <CardTitle>Dark Theme</CardTitle>
            </div>
            <CardDescription>Easy on the eyes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="h-8 bg-background rounded border" />
              <div className="h-8 bg-card rounded border" />
              <div className="h-8 bg-muted rounded" />
              <div className="h-8 bg-accent rounded" />
            </div>
            <div className="flex gap-2">
              <Button size="sm">Primary</Button>
              <Button size="sm" variant="secondary">
                Secondary
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* System Theme Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Monitor className="h-5 w-5" />
              <CardTitle>System Theme</CardTitle>
            </div>
            <CardDescription>Matches OS preference</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground text-sm">
              Automatically switches between light and dark based on your system
              settings.
            </p>
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">
                Current system preference:
              </p>
              <Badge variant="outline">{actualTheme}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Implementation Guide */}
      <Card>
        <CardHeader>
          <CardTitle>Adding New Themes</CardTitle>
          <CardDescription>
            Extensible theming system for future customization
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4>To add a new theme:</h4>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground text-sm">
              <li>
                Define new CSS variables in{" "}
                <code className="bg-muted px-2 py-1 rounded">
                  /styles/globals.css
                </code>
              </li>
              <li>
                Add theme selector in{" "}
                <code className="bg-muted px-2 py-1 rounded">
                  ThemeProvider.tsx
                </code>
              </li>
              <li>Update theme toggle component with new option</li>
              <li>Apply theme class to document root</li>
            </ol>
          </div>
          <div className="bg-muted p-4 rounded-lg">
            <pre className="text-sm overflow-x-auto">
              <code>{`.theme-ocean {
  --background: 220 40% 5%;
  --foreground: 195 100% 95%;
  --primary: 195 90% 50%;
  /* ... other variables */
}`}</code>
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Color Token Reference */}
      <Card>
        <CardHeader>
          <CardTitle>Theme Color Tokens</CardTitle>
          <CardDescription>
            All available color variables adapt to the active theme
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              "background",
              "foreground",
              "card",
              "card-foreground",
              "primary",
              "primary-foreground",
              "secondary",
              "secondary-foreground",
              "muted",
              "muted-foreground",
              "accent",
              "accent-foreground",
              "destructive",
              "destructive-foreground",
              "border",
              "input",
              "ring",
            ].map((token) => (
              <div key={token} className="space-y-1">
                <div
                  className={`h-12 rounded border`}
                  style={{ backgroundColor: `hsl(var(--${token}))` }}
                />
                <code className="text-xs text-muted-foreground">--{token}</code>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

ThemeDemo.displayName = "ThemeDemo";
