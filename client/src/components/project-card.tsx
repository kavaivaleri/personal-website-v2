import { Github, ExternalLink, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type Project } from "@shared/schema";
import { Link } from "wouter";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "web development":
        return "💻";
      case "game development":
        return "🎮";
      case "mobile development":
        return "📱";
      default:
        return "🚀";
    }
  };

  const getCategoryGradient = (category: string) => {
    switch (category.toLowerCase()) {
      case "web development":
        return "from-pixel-teal to-blue-400";
      case "game development":
        return "from-purple-500 to-pixel-purple";
      case "mobile development":
        return "from-orange-400 to-red-400";
      default:
        return "from-pixel-pink to-pixel-light-pink";
    }
  };

  return (
    <Card className="bg-white border-2 border-gray-200 shadow-pixel hover:shadow-pixel-hover transform hover:-translate-y-2 transition-all duration-300 cursor-pointer group">
      <div className={`aspect-video bg-gradient-to-br ${getCategoryGradient(project.category)} p-6 flex items-center justify-center`}>
        <div className="text-white text-center">
          <div className="text-4xl mb-2">{getCategoryIcon(project.category)}</div>
          <div className="text-sm font-medium">{project.category}</div>
        </div>
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-pixel-dark mb-2">{project.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="bg-pixel-light-pink text-pixel-dark">
              {tech}
            </Badge>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <Link href={`/project/${project.id}`}>
            <Button
              variant="ghost"
              className="text-pixel-teal hover:text-pixel-pink transition-colors duration-200 font-medium p-0"
            >
              View Details <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
          
          <div className="flex space-x-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pixel-teal transition-colors duration-200"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pixel-teal transition-colors duration-200"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
