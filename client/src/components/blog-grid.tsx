import { useQuery } from "@tanstack/react-query";
import { type BlogPost } from "@shared/schema";
import BlogCard from "./blog-card";
import { Skeleton } from "@/components/ui/skeleton";

interface BlogGridProps {
  limit?: number;
}

export default function BlogGrid({ limit }: BlogGridProps) {
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts"],
    queryFn: async () => {
      const response = await fetch('/api/blog-posts');
      if (!response.ok) throw new Error('Failed to fetch posts');
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: limit || 6 }).map((_, i) => (
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

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-xl text-gray-600">No blog posts found.</p>
      </div>
    );
  }

  const displayedPosts = limit ? posts.slice(0, limit) : posts;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {displayedPosts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}

