import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { type BlogPost } from "@shared/schema";
import BlogCard from "./blog-card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

interface BlogGridProps {
  limit?: number;
}

export default function BlogGrid({ limit }: BlogGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: searchQuery ? ["/api/blog-posts/search"] : ["/api/blog-posts"],
    queryFn: async () => {
      if (searchQuery) {
        const response = await fetch(`/api/blog-posts/search?q=${encodeURIComponent(searchQuery)}`);
        if (!response.ok) throw new Error('Failed to search posts');
        return response.json();
      }
      const response = await fetch('/api/blog-posts');
      if (!response.ok) throw new Error('Failed to fetch posts');
      return response.json();
    },
  });

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="max-w-md mx-auto">
          <Skeleton className="h-12 w-full" />
        </div>
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
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="space-y-8">
        <div className="max-w-md mx-auto">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search blog posts..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-12 py-3 border-2 border-gray-200 focus:border-pixel-teal"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>
        <div className="text-center py-16">
          <p className="text-xl text-gray-600">
            {searchQuery ? `No posts found for "${searchQuery}"` : "No blog posts found."}
          </p>
        </div>
      </div>
    );
  }

  const displayedPosts = limit ? posts.slice(0, limit) : posts;

  return (
    <div className="space-y-8">
      <div className="max-w-md mx-auto">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search blog posts..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-12 py-3 border-2 border-gray-200 focus:border-pixel-teal"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
