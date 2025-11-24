import {
  Home,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Star,
  Heart,
  Share2,
  Download,
  Upload,
  Search,
  Settings,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
  Globe,
  Code,
  Briefcase,
  GraduationCap,
  Award,
  CheckCircle,
  AlertCircle,
  Info,
  FileText,
} from "lucide-react";

export function IconsSection() {
  const iconCategories = [
    {
      name: "Navigation",
      icons: [
        { Icon: Home, name: "Home" },
        { Icon: Menu, name: "Menu" },
        { Icon: X, name: "X" },
        { Icon: ChevronRight, name: "ChevronRight" },
        { Icon: ChevronLeft, name: "ChevronLeft" },
        { Icon: ChevronUp, name: "ChevronUp" },
        { Icon: ChevronDown, name: "ChevronDown" },
        { Icon: ArrowRight, name: "ArrowRight" },
        { Icon: ArrowLeft, name: "ArrowLeft" },
      ],
    },
    {
      name: "Contact & Social",
      icons: [
        { Icon: User, name: "User" },
        { Icon: Mail, name: "Mail" },
        { Icon: Phone, name: "Phone" },
        { Icon: Github, name: "Github" },
        { Icon: Linkedin, name: "Linkedin" },
        { Icon: Twitter, name: "Twitter" },
        { Icon: Globe, name: "Globe" },
        { Icon: ExternalLink, name: "ExternalLink" },
      ],
    },
    {
      name: "Portfolio",
      icons: [
        { Icon: Code, name: "Code" },
        { Icon: Briefcase, name: "Briefcase" },
        { Icon: GraduationCap, name: "GraduationCap" },
        { Icon: Award, name: "Award" },
        { Icon: FileText, name: "FileText" },
      ],
    },
    {
      name: "Actions",
      icons: [
        { Icon: Download, name: "Download" },
        { Icon: Upload, name: "Upload" },
        { Icon: Search, name: "Search" },
        { Icon: Settings, name: "Settings" },
        { Icon: Share2, name: "Share2" },
        { Icon: Star, name: "Star" },
        { Icon: Heart, name: "Heart" },
      ],
    },
    {
      name: "Informational",
      icons: [
        { Icon: Calendar, name: "Calendar" },
        { Icon: Clock, name: "Clock" },
        { Icon: MapPin, name: "MapPin" },
        { Icon: CheckCircle, name: "CheckCircle" },
        { Icon: AlertCircle, name: "AlertCircle" },
        { Icon: Info, name: "Info" },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      {iconCategories.map((category) => (
        <div key={category.name} className="space-y-4">
          <h3 className="text-muted-foreground">{category.name}</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-4">
            {category.icons.map(({ Icon, name }) => (
              <div
                key={name}
                className="bg-card border rounded-lg p-4 flex flex-col items-center justify-center gap-2 hover:bg-accent transition-colors group"
              >
                <Icon className="w-6 h-6 text-foreground group-hover:text-accent-foreground" />
                <span className="text-xs text-muted-foreground text-center">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Size Examples */}
      <div className="space-y-4">
        <h3 className="text-muted-foreground">Icon Sizes</h3>
        <div className="bg-card border rounded-lg p-6">
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center gap-2">
              <Star className="w-4 h-4" />
              <span className="text-xs text-muted-foreground">w-4 h-4</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Star className="w-5 h-5" />
              <span className="text-xs text-muted-foreground">w-5 h-5</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Star className="w-6 h-6" />
              <span className="text-xs text-muted-foreground">w-6 h-6</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Star className="w-8 h-8" />
              <span className="text-xs text-muted-foreground">w-8 h-8</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Star className="w-10 h-10" />
              <span className="text-xs text-muted-foreground">w-10 h-10</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Star className="w-12 h-12" />
              <span className="text-xs text-muted-foreground">w-12 h-12</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
IconsSection.displayName = "IconsSection";
