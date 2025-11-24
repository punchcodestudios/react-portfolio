import React from "react";

export function ColorPalette() {
  const colors = [
    {
      name: "Background",
      variable: "--background",
      description: "Main background color",
      class: "bg-background border",
    },
    {
      name: "Foreground",
      variable: "--foreground",
      description: "Primary text color",
      class: "bg-foreground",
    },
    {
      name: "Card",
      variable: "--card",
      description: "Card background color",
      class: "bg-card border",
    },
    {
      name: "Card Foreground",
      variable: "--card-foreground",
      description: "Text on card surfaces",
      class: "bg-card-foreground",
    },
    {
      name: "Primary",
      variable: "--primary",
      description: "Primary brand color",
      class: "bg-primary",
    },
    {
      name: "Primary Foreground",
      variable: "--primary-foreground",
      description: "Text on primary color",
      class: "bg-primary-foreground",
    },
    {
      name: "Secondary",
      variable: "--secondary",
      description: "Secondary color",
      class: "bg-secondary",
    },
    {
      name: "Secondary Foreground",
      variable: "--secondary-foreground",
      description: "Text on secondary color",
      class: "bg-secondary-foreground",
    },
    {
      name: "Muted",
      variable: "--muted",
      description: "Muted backgrounds",
      class: "bg-muted",
    },
    {
      name: "Muted Foreground",
      variable: "--muted-foreground",
      description: "Muted text color",
      class: "bg-muted-foreground",
    },
    {
      name: "Accent",
      variable: "--accent",
      description: "Accent color",
      class: "bg-accent",
    },
    {
      name: "Accent Foreground",
      variable: "--accent-foreground",
      description: "Text on accent color",
      class: "bg-accent-foreground",
    },
    {
      name: "Destructive",
      variable: "--destructive",
      description: "Destructive actions",
      class: "bg-destructive",
    },
    {
      name: "Destructive Foreground",
      variable: "--destructive-foreground",
      description: "Text on destructive color",
      class: "bg-destructive-foreground",
    },
    {
      name: "Border",
      variable: "--border",
      description: "Border color",
      class: "bg-border",
    },
    {
      name: "Input",
      variable: "--input",
      description: "Input border color",
      class: "bg-input",
    },
    {
      name: "Ring",
      variable: "--ring",
      description: "Focus ring color",
      class: "bg-ring",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {colors.map((color) => (
        <div key={color.name} className="space-y-3">
          <div className={`h-24 rounded-lg ${color.class}`} />
          <div>
            <p className="text-foreground">{color.name}</p>
            <p className="text-muted-foreground text-sm">{color.description}</p>
            <code className="text-muted-foreground text-xs bg-muted px-2 py-1 rounded mt-1 inline-block">
              {color.variable}
            </code>
          </div>
        </div>
      ))}
    </div>
  );
}

ColorPalette.displayName = "ColorPalette";
