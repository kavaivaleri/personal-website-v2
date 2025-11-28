import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Building2 } from "lucide-react";
import { type Publication } from "@shared/schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface PublicationsGridProps {
  limit?: number;
  featured?: boolean;
}

export default function PublicationsGrid({ limit, featured = false }: PublicationsGridProps) {
  const { data: publications = [], isLoading } = useQuery<Publication[]>({
    queryKey: featured ? ["/api/publications/featured"] : ["/api/publications"],
    queryFn: async () => {
      const endpoint = featured ? "/api/publications/featured" : "/api/publications";
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error("Failed to fetch publications");
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: limit || 6 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <Skeleton className="aspect-video w-full" />
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!publications || publications.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-xl text-gray-600">No publications found.</p>
      </div>
    );
  }

  // If featured, the API already returns sorted featured publications
  // For non-featured, just use all publications
  const finalPublications = limit ? publications.slice(0, limit) : publications;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {finalPublications.map((publication) => (
        <a
          key={publication.id}
          href={publication.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block h-full"
        >
          <Card className="h-full hover:shadow-lg transition-shadow duration-200 group overflow-hidden cursor-pointer">
            {/* Cover Image */}
            {publication.imageUrl && (
              <div className="aspect-video overflow-hidden">
                <img
                  src={publication.imageUrl}
                  alt={publication.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
            )}
            
            <CardHeader className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                  {publication.title}
                </CardTitle>
                <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
              </div>
              <CardDescription className="line-clamp-3 text-base leading-relaxed">
                {publication.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Building2 className="h-3 w-3" />
                  <span>{publication.publication}</span>
                </div>
                <Badge variant="outline">{publication.category}</Badge>
              </div>
            </CardContent>
          </Card>
        </a>
      ))}
    </div>
  );
}

