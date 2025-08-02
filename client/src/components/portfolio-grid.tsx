import { useQuery } from "@tanstack/react-query";
import { type Project } from "@shared/schema";
import ProjectCard from "./project-card";
import { Skeleton } from "@/components/ui/skeleton";

interface PortfolioGridProps {
  featured?: boolean;
  limit?: number;
}

export default function PortfolioGrid({ featured = false, limit }: PortfolioGridProps) {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: featured ? ["/api/projects/featured"] : ["/api/projects"],
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="aspect-video w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-xl text-gray-600">No projects found.</p>
      </div>
    );
  }

  const displayedProjects = limit ? projects.slice(0, limit) : projects;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {displayedProjects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
