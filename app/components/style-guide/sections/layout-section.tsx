import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Mail, MapPin, Briefcase } from "lucide-react";

export function LayoutSection() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="space-y-4">
        <h3 className="text-muted-foreground">Hero Section</h3>
        <Card>
          <CardContent className="p-12 text-center space-y-6">
            <Avatar className="h-24 w-24 mx-auto">
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <h1>John Doe</h1>
              <h3 className="text-muted-foreground">Full Stack Developer</h3>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Passionate about creating beautiful and functional web
              applications with modern technologies. Specializing in React,
              TypeScript, and Node.js.
            </p>
            <div className="flex gap-3 justify-center">
              <Button>View Projects</Button>
              <Button variant="outline">Contact Me</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Grid */}
      <div className="space-y-4">
        <h3 className="text-muted-foreground">Project Grid</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <div className="h-48 bg-muted" />
              <CardHeader>
                <CardTitle>Project {i}</CardTitle>
                <CardDescription>
                  A brief description of the project
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 flex-wrap">
                  <Badge>React</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                  <Badge variant="outline">Tailwind</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* About Section */}
      <div className="space-y-4">
        <h3 className="text-muted-foreground">About Section</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="space-y-2">
                <h4>Experience</h4>
                <p className="text-muted-foreground">
                  5+ years of professional development
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center">
                <MapPin className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="space-y-2">
                <h4>Location</h4>
                <p className="text-muted-foreground">San Francisco, CA</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center">
                <Mail className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="space-y-2">
                <h4>Contact</h4>
                <p className="text-muted-foreground">hello@example.com</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Timeline Layout */}
      <div className="space-y-4">
        <h3 className="text-muted-foreground">Timeline Layout</h3>
        <Card>
          <CardHeader>
            <CardTitle>Work Experience</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {[
              {
                title: "Senior Developer",
                company: "Tech Company",
                period: "2022 - Present",
                description: "Leading frontend development for key products",
              },
              {
                title: "Developer",
                company: "Startup Inc",
                period: "2020 - 2022",
                description: "Full stack development and architecture",
              },
              {
                title: "Junior Developer",
                company: "Agency Co",
                period: "2018 - 2020",
                description: "Web development for client projects",
              },
            ].map((job, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="h-3 w-3 rounded-full bg-primary" />
                  {i < 2 && <div className="w-px h-full bg-border mt-2" />}
                </div>
                <div className="flex-1 pb-6">
                  <h4>{job.title}</h4>
                  <p className="text-muted-foreground">{job.company}</p>
                  <p className="text-muted-foreground text-sm">{job.period}</p>
                  <p className="text-muted-foreground text-sm mt-2">
                    {job.description}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Skills Grid */}
      <div className="space-y-4">
        <h3 className="text-muted-foreground">Skills Section</h3>
        <Card>
          <CardHeader>
            <CardTitle>Technical Skills</CardTitle>
            <CardDescription>
              Technologies and tools I work with
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                "React",
                "TypeScript",
                "Node.js",
                "Tailwind CSS",
                "Next.js",
                "GraphQL",
                "PostgreSQL",
                "Docker",
              ].map((skill) => (
                <div
                  key={skill}
                  className="bg-muted rounded-lg p-4 text-center hover:bg-accent transition-colors"
                >
                  <p>{skill}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

LayoutSection.displayName = "LayoutSection";
