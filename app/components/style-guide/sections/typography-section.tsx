import React, { forwardRef } from "react";

export const TypographySection = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div ref={ref} className="space-y-8" {...props}>
      {/* Headings */}
      <div className="space-y-4">
        <h3 className="text-muted-foreground">Headings</h3>
        <div className="space-y-4 bg-card border rounded-lg p-6">
          <div>
            <h1>Heading 1</h1>
            <code className="text-muted-foreground text-xs bg-muted px-2 py-1 rounded mt-1 inline-block">
              {`<h1>`}
            </code>
          </div>
          <div>
            <h2>Heading 2</h2>
            <code className="text-muted-foreground text-xs bg-muted px-2 py-1 rounded mt-1 inline-block">
              {`<h2>`}
            </code>
          </div>
          <div>
            <h3>Heading 3</h3>
            <code className="text-muted-foreground text-xs bg-muted px-2 py-1 rounded mt-1 inline-block">
              {`<h3>`}
            </code>
          </div>
          <div>
            <h4>Heading 4</h4>
            <code className="text-muted-foreground text-xs bg-muted px-2 py-1 rounded mt-1 inline-block">
              {`<h4>`}
            </code>
          </div>
        </div>
      </div>

      {/* Body Text */}
      <div className="space-y-4">
        <h3 className="text-muted-foreground">Body Text</h3>
        <div className="space-y-4 bg-card border rounded-lg p-6">
          <div>
            <p className="text-foreground">
              This is a paragraph of body text. It should be easy to read and
              maintain good contrast with the background. Body text is the
              foundation of content hierarchy.
            </p>
            <code className="text-muted-foreground text-xs bg-muted px-2 py-1 rounded mt-2 inline-block">
              {`<p className="text-foreground">`}
            </code>
          </div>
          <div>
            <p className="text-muted-foreground">
              This is muted text, typically used for secondary information,
              captions, or supporting content that should be less prominent.
            </p>
            <code className="text-muted-foreground text-xs bg-muted px-2 py-1 rounded mt-2 inline-block">
              {`<p className="text-muted-foreground">`}
            </code>
          </div>
          <div>
            <small className="text-muted-foreground">
              Small text for fine print, legal notices, or supplementary
              information.
            </small>
            <code className="text-muted-foreground text-xs bg-muted px-2 py-1 rounded mt-2 inline-block">
              {`<small>`}
            </code>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="space-y-4">
        <h3 className="text-muted-foreground">Links</h3>
        <div className="space-y-4 bg-card border rounded-lg p-6">
          <div className="space-x-4">
            <a
              href="#"
              className="text-primary underline underline-offset-4 hover:text-primary/80"
            >
              Standard Link
            </a>
            <a
              href="#"
              className="text-foreground hover:text-primary transition-colors"
            >
              Hover Link
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Subtle Link
            </a>
          </div>
        </div>
      </div>

      {/* Code */}
      <div className="space-y-4">
        <h3 className="text-muted-foreground">Code</h3>
        <div className="space-y-4 bg-card border rounded-lg p-6">
          <div>
            <p className="mb-2">
              Inline code:{" "}
              <code className="bg-muted px-2 py-1 rounded text-sm">
                const example = true;
              </code>
            </p>
          </div>
          <div>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`function example() {
  return "Hello, World!";
}`}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
});

TypographySection.displayName = "TypographySection";
