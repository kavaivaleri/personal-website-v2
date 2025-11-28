import { Calendar, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type BlogPost } from "@shared/schema";
import { Link } from "wouter";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const getCategoryIcon = (tags: string[] | undefined) => {
    if (!tags || tags.length === 0) return "✍️";
    if (tags.some(tag => tag.toLowerCase().includes('design'))) return "🎨";
    if (tags.some(tag => tag.toLowerCase().includes('web'))) return "💻";
    if (tags.some(tag => tag.toLowerCase().includes('tutorial'))) return "📚";
    return "✍️";
  };

  const getCategoryGradient = (tags: string[] | undefined) => {
    if (!tags || tags.length === 0) return "from-green-400 to-pixel-teal";
    if (tags.some(tag => tag.toLowerCase().includes('design'))) return "from-pixel-pink to-pixel-light-pink";
    if (tags.some(tag => tag.toLowerCase().includes('web'))) return "from-pixel-teal to-blue-400";
    if (tags.some(tag => tag.toLowerCase().includes('tutorial'))) return "from-purple-500 to-pixel-purple";
    return "from-green-400 to-pixel-teal";
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "Unknown";
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  };

  return (
    <Link href={`/blog/${post.slug}`} className="block">
      <Card className="bg-white shadow-pixel hover:shadow-pixel-hover transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group h-full">
        {post.imageUrl ? (
          <div className="aspect-video overflow-hidden">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
        ) : (
          <div className={`aspect-video bg-gradient-to-br ${getCategoryGradient(post.tags)} p-6 flex items-center justify-center`}>
            <div className="text-white text-center">
              <div className="text-3xl mb-2">{getCategoryIcon(post.tags)}</div>
              <div className="text-sm font-medium">{post.tags?.[0] || "Article"}</div>
            </div>
          </div>
        )}
        <CardContent className="p-6">
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{formatDate(post.publishedAt)}</span>
            <span className="mx-2">•</span>
            <Clock className="w-4 h-4 mr-1" />
            <span>{post.readTime}</span>
          </div>
          
          <h3 className="text-xl font-semibold text-pixel-dark mb-3 group-hover:text-pixel-pink transition-colors duration-200">
            {post.title}
          </h3>
          
          <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
          
          <div className="flex flex-wrap gap-2">
            {post.tags?.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-gray-100 text-gray-700">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
