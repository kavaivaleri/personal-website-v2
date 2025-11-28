import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ExternalLink, Search, Calendar, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Publication } from "@shared/schema";

export default function Publications() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: publications = [], isLoading } = useQuery<Publication[]>({
    queryKey: ["/api/publications"],
  });

  const { data: searchResults = [], isLoading: isSearching } = useQuery<Publication[]>({
    queryKey: ["/api/publications/search", searchQuery],
    queryFn: async () => {
      if (!searchQuery.trim()) return [];
      const response = await fetch(`/api/publications/search?q=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) throw new Error("Failed to search");
      return response.json();
    },
    enabled: !!searchQuery.trim(),
  });

  const displayedPublications = searchQuery.trim() ? searchResults : publications;

  // Define custom category order
  const categoryOrder = [
    "Technical",
    "Guide, Prompt Engineering",
    "Guide, AI Safety",
    "Guide, AI Tools",
    "Newsletter",
    "Listicle",
    "News",
    "Announcement",
    "Company Profile"
  ];

  // Get featured articles
  const featuredPublications = displayedPublications.filter(pub => pub.featured === "true");
  const nonFeaturedPublications = displayedPublications.filter(pub => pub.featured !== "true");

  // Sort categories by custom order
  const categories = Array.from(new Set(nonFeaturedPublications.map(pub => pub.category)))
    .sort((a, b) => {
      const indexA = categoryOrder.indexOf(a);
      const indexB = categoryOrder.indexOf(b);
      if (indexA === -1 && indexB === -1) return a.localeCompare(b);
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });

  const groupedByCategory = categories.reduce((acc, category) => {
    acc[category] = nonFeaturedPublications.filter(pub => pub.category === category);
    return acc;
  }, {} as Record<string, Publication[]>);

  // Group by publication source
  const publicationSources = Array.from(new Set(publications.map(pub => pub.publication)));

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Published Work</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Articles I've written for various platforms, covering AI/ML research, technical guides, and industry insights.
        </p>
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search publications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="p-6 border rounded-lg">
          <div className="text-2xl font-bold">{publications.length}</div>
          <div className="text-sm text-muted-foreground">Total Articles</div>
        </div>
        <div className="p-6 border rounded-lg">
          <div className="text-2xl font-bold">{publicationSources.length}</div>
          <div className="text-sm text-muted-foreground">Publications</div>
        </div>
        <div className="p-6 border rounded-lg">
          <div className="text-2xl font-bold">{categories.length}</div>
          <div className="text-sm text-muted-foreground">Categories</div>
        </div>
      </div>

      {/* Featured Articles */}
      {featuredPublications.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Featured Articles</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredPublications.map((publication) => (
              <FeaturedPublicationCard key={publication.id} publication={publication} />
            ))}
          </div>
        </div>
      )}

      {/* Articles by Category */}
      <div className="space-y-10">
        {categories.map(category => (
          <div key={category} className="space-y-3">
            <h3 className="text-2xl font-semibold border-b pb-2">{category}</h3>
            <div className="grid gap-2 md:grid-cols-2">
              {groupedByCategory[category].map((publication) => (
                <PublicationListItem key={publication.id} publication={publication} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* No results message */}
      {displayedPublications.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No publications found.</p>
        </div>
      )}
    </div>
  );
}

function FeaturedPublicationCard({ publication }: { publication: Publication }) {
  return (
    <a
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
          <CardDescription className="line-clamp-6 text-base leading-relaxed">
            {publication.description}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {/* Publication Info */}
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
  );
}

function PublicationListItem({ publication }: { publication: Publication }) {
  return (
    <a
      href={publication.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
    >
      <div className="flex gap-3 p-3 rounded-lg border hover:bg-accent transition-colors">
        {/* Compact Thumbnail */}
        {publication.imageUrl && (
          <div className="w-20 h-20 flex-shrink-0 rounded overflow-hidden">
            <img
              src={publication.imageUrl}
              alt={publication.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        )}
        
        {/* Content */}
        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-medium text-sm leading-tight group-hover:text-primary transition-colors line-clamp-2">
              {publication.title}
            </h4>
            <ExternalLink className="h-3 w-3 text-muted-foreground flex-shrink-0 mt-0.5" />
          </div>
          
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="truncate">{publication.publication}</span>
            {publication.publishedAt && (
              <>
                <span>•</span>
                <span>
                  {new Date(publication.publishedAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short' 
                  })}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </a>
  );
}