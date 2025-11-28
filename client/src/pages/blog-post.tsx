import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import MarkdownRenderer from "@/components/markdown-renderer";
import { type BlogPost } from "@shared/schema";

export default function BlogPostPage() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug;

  const { data: post, isLoading, error } = useQuery<BlogPost>({
    queryKey: ["/api/blog-posts/slug", slug],
    queryFn: async () => {
      const response = await fetch(`/api/blog-posts/slug/${slug}`);
      if (!response.ok) {
        throw new Error('Blog post not found');
      }
      return response.json();
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-8 w-32 mb-8" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <div className="flex gap-4 mb-8">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-20" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-pixel-dark mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (date: Date | null) => {
    if (!date) return "Unknown";
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link href="/blog">
          <Button variant="ghost" className="mb-8 text-pixel-teal hover:text-pixel-pink">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </Link>

        {/* Cover Image */}
        {post.imageUrl && (
          <div className="mb-8 rounded-lg overflow-hidden shadow-pixel">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-auto max-h-96 object-cover"
              loading="lazy"
            />
          </div>
        )}

        {/* Post Header */}
        <div className="bg-white rounded-lg shadow-pixel p-8 mb-8">
          <h1 className="text-4xl font-bold text-pixel-dark mb-6">{post.title}</h1>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-6">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              <span>{post.readTime}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-pixel-light-pink text-pixel-dark">
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Post Content */}
        <div className="bg-white rounded-lg shadow-pixel p-8">
          <MarkdownRenderer content={post.content} />
        </div>

        {/* Back to Blog */}
        <div className="text-center mt-12">
          <Link href="/blog">
            <Button className="bg-pixel-pink text-white px-8 py-3 font-semibold shadow-pixel hover:shadow-pixel-hover transform hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Posts
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
