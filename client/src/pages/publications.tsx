import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ExternalLink, Search, Calendar, Tag, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

  // Group publications by category
  const categories = [...new Set(publications.map(pub => pub.category))];
  const groupedByCategory = categories.reduce((acc, category) => {
    acc[category] = publications.filter(pub => pub.category === category);
    return acc;
  }, {} as Record<string, Publication[]>);

  // Group by publication source
  const publicationSources = [...new Set(publications.map(pub => pub.publication))];

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
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Publications</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          External articles and technical content published across various platforms, 
          covering AI/ML research, technical implementation guides, and industry insights.
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

      {/* Content Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Articles</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="categories">By Category</TabsTrigger>
          <TabsTrigger value="sources">By Source</TabsTrigger>
        </TabsList>

        {/* All Articles */}
        <TabsContent value="all">
          <PublicationGrid 
            publications={displayedPublications} 
            isLoading={isSearching && !!searchQuery} 
          />
        </TabsContent>

        {/* Featured Articles */}
        <TabsContent value="featured">
          <PublicationGrid 
            publications={publications.filter(pub => pub.featured === "true")} 
            isLoading={false}
          />
        </TabsContent>

        {/* By Category */}
        <TabsContent value="categories">
          <div className="space-y-8">
            {categories.map(category => (
              <div key={category}>
                <h3 className="text-2xl font-semibold mb-4">{category}</h3>
                <PublicationGrid 
                  publications={groupedByCategory[category]} 
                  isLoading={false}
                />
              </div>
            ))}
          </div>
        </TabsContent>

        {/* By Source */}
        <TabsContent value="sources">
          <div className="space-y-8">
            {publicationSources.map(source => (
              <div key={source}>
                <h3 className="text-2xl font-semibold mb-4">{source}</h3>
                <PublicationGrid 
                  publications={publications.filter(pub => pub.publication === source)} 
                  isLoading={false}
                />
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function PublicationGrid({ publications, isLoading }: { publications: Publication[], isLoading: boolean }) {
  if (isLoading) {
    return (
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
    );
  }

  if (publications.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No publications found.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {publications.map((publication) => (
        <PublicationCard key={publication.id} publication={publication} />
      ))}
    </div>
  );
}

function PublicationCard({ publication }: { publication: Publication }) {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200 group">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
            {publication.title}
          </CardTitle>
          <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
        </div>
        <CardDescription className="line-clamp-3">
          {publication.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Publication Info */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Building2 className="h-3 w-3" />
            <span>{publication.publication}</span>
          </div>
          {publication.readTime && (
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{publication.readTime}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {publication.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Category and Date */}
        <div className="flex items-center justify-between text-sm text-muted-foreground pt-2 border-t">
          <Badge variant="outline">{publication.category}</Badge>
          <span>
            {publication.publishedAt ? 
              new Date(publication.publishedAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short' 
              }) : 
              'Date not available'
            }
          </span>
        </div>

        {/* Action */}
        <a
          href={publication.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          Read Article <ExternalLink className="h-3 w-3" />
        </a>
      </CardContent>
    </Card>
  );
}