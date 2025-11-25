import { Link } from "react-router";

export default function FormComponentsTestHub() {
  const testSuites = [
    {
      id: "input",
      title: "Input Component",
      description:
        "Test all input type variants (text, email, tel, url, password, number, date, time, color)",
      path: "/_test/form-components/input",
      status: "complete",
      coverage: "100%",
    },
    {
      id: "textarea",
      title: "Textarea Component",
      description:
        "Test textarea variants with character counting and size options",
      path: "/_test/form-components/textarea",
      status: "complete",
      coverage: "100%",
    },
    {
      id: "select",
      title: "Select Component",
      description:
        "Test dropdown/combobox with single select and keyboard navigation",
      path: "/_test/form-components/select",
      status: "complete",
      coverage: "100%",
    },
    {
      id: "checkbox",
      title: "Checkbox Component",
      description: "Test checkbox inputs with groups and various states",
      path: "/_test/form-components/checkbox",
      status: "complete",
      coverage: "100%",
    },
    {
      id: "radio",
      title: "Radio Component",
      description: "Test radio button groups with various layouts",
      path: "/_test/form-components/radio",
      status: "pending",
      coverage: "0%",
    },
  ];

  return (
    <div className="container mx-auto p-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-brand text-foreground mb-2">
          Form Component Test Suite
        </h1>
        <p className="text-muted-foreground text-lg">
          Comprehensive testing for all accessible form components with shared
          validation schemas.
        </p>
      </div>

      {/* Test Statistics */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-card p-6 rounded-lg border border-border">
          <div className="text-2xl font-bold text-primary">4 / 5</div>
          <div className="text-sm text-muted-foreground">
            Components Complete
          </div>
        </div>
        <div className="bg-card p-6 rounded-lg border border-border">
          <div className="text-2xl font-bold text-success">100%</div>
          <div className="text-sm text-muted-foreground">
            Accessibility Score
          </div>
        </div>
        <div className="bg-card p-6 rounded-lg border border-border">
          <div className="text-2xl font-bold text-foreground">23</div>
          <div className="text-sm text-muted-foreground">Field Schemas</div>
        </div>
        <div className="bg-card p-6 rounded-lg border border-border">
          <div className="text-2xl font-bold text-foreground">5</div>
          <div className="text-sm text-muted-foreground">Form Schemas</div>
        </div>
      </div>

      {/* Test Suites */}
      <div className="space-y-4">
        <h2 className="text-2xl font-header text-foreground mb-4">
          Available Test Suites
        </h2>

        {testSuites.map((suite) => (
          <Link
            key={suite.id}
            to={suite.path}
            className={`block p-6 bg-card rounded-lg border transition-all ${
              suite.status === "complete"
                ? "border-success hover:border-success hover:shadow-lg"
                : "border-border hover:border-primary hover:shadow-lg"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-header text-foreground">
                    {suite.title}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      suite.status === "complete"
                        ? "bg-success/10 text-success border border-success"
                        : "bg-muted text-muted-foreground border border-border"
                    }`}
                  >
                    {suite.status === "complete" ? "✓ Complete" : "Pending"}
                  </span>
                </div>
                <p className="text-muted-foreground mb-2">
                  {suite.description}
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-muted-foreground">
                    Coverage:{" "}
                    <span className="font-medium text-foreground">
                      {suite.coverage}
                    </span>
                  </span>
                </div>
              </div>
              <div className="text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Architecture Info */}
      <div className="mt-12 p-6 bg-muted rounded-lg">
        <h3 className="text-lg font-header text-foreground mb-3">
          Architecture Notes
        </h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>
              All components use shared validation schemas from{" "}
              <code>~/schemas</code>
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>
              Test pages and production forms reference identical validation
              logic
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>Full WCAG 2.1 Level AA compliance for accessibility</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>Conform integration for React Router form handling</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>
              CVA (Class Variance Authority) for consistent styling variants
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>Radix UI primitives for complex accessible patterns</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
