import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Switch } from "../ui/switch";
import { Checkbox } from "../ui/checkbox";
import { Slider } from "../ui/slider";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Separator } from "../ui/separator";
import { Progress } from "../ui/progress";
import { Mail, AlertCircle, Info, CheckCircle } from "lucide-react";
import React, { forwardRef } from "react";

export const ComponentsSection = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div className="space-y-12" ref={ref}>
      {/* Buttons */}
      <div className="space-y-4">
        <h3 className="text-muted-foreground">Buttons</h3>
        <div className="bg-card border rounded-lg p-6 space-y-4">
          <div className="flex flex-wrap gap-3">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
          <Separator />
          <div className="flex flex-wrap gap-3 items-center">
            <Button size="sm">Small</Button>
            <Button>Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">
              <Mail className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="space-y-4">
        <h3 className="text-muted-foreground">Badges</h3>
        <div className="bg-card border rounded-lg p-6">
          <div className="flex flex-wrap gap-3">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        </div>
      </div>

      {/* Form Elements */}
      <div className="space-y-4">
        <h3 className="text-muted-foreground">Form Elements</h3>
        <div className="bg-card border rounded-lg p-6 space-y-6 max-w-md">
          <div className="space-y-2">
            <label className="text-sm">Input</label>
            <Input placeholder="Enter text..." />
          </div>
          <div className="space-y-2">
            <label className="text-sm">Textarea</label>
            <Textarea placeholder="Enter longer text..." rows={3} />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label htmlFor="terms" className="text-sm">
              Accept terms and conditions
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="notifications" />
            <label htmlFor="notifications" className="text-sm">
              Enable notifications
            </label>
          </div>
          <div className="space-y-2">
            <label className="text-sm">Slider</label>
            <Slider defaultValue={[50]} max={100} step={1} />
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="space-y-4">
        <h3 className="text-muted-foreground">Cards</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card description or subtitle</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This is the card content area where you can place any content
                you need.
              </p>
            </CardContent>
            <CardFooter>
              <Button>Action</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Project Card</CardTitle>
              <CardDescription>Example portfolio project</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Badge>React</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                  <Badge variant="outline">Tailwind</Badge>
                </div>
                <p className="text-muted-foreground text-sm">
                  A sample project showcasing modern web development practices.
                </p>
              </div>
            </CardContent>
            <CardFooter className="gap-2">
              <Button variant="outline" size="sm">
                View Project
              </Button>
              <Button variant="ghost" size="sm">
                GitHub
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Alerts */}
      <div className="space-y-4">
        <h3 className="text-muted-foreground">Alerts</h3>
        <div className="space-y-4">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Information</AlertTitle>
            <AlertDescription>
              This is an informational alert message to provide context to
              users.
            </AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Something went wrong. Please try again later.
            </AlertDescription>
          </Alert>
        </div>
      </div>

      {/* Avatars */}
      <div className="space-y-4">
        <h3 className="text-muted-foreground">Avatars</h3>
        <div className="bg-card border rounded-lg p-6">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Avatar className="h-12 w-12">
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
            <Avatar className="h-16 w-16">
              <AvatarFallback>CD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-4">
        <h3 className="text-muted-foreground">Progress</h3>
        <div className="bg-card border rounded-lg p-6 space-y-4 max-w-md">
          <Progress value={33} />
          <Progress value={66} />
          <Progress value={100} />
        </div>
      </div>
    </div>
  );
});

ComponentsSection.displayName = "ComponentsSection";
