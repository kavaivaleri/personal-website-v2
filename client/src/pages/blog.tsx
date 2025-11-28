import BlogGrid from "@/components/blog-grid";

export default function Blog() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-pixel-dark mb-4">Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Personal insights and reflections. If you're looking for my previous work, published on other platforms, check out <a href="/publications" className="text-pixel-teal hover:text-pixel-pink underline">Published Work</a>.
          </p>
        </div>

        <BlogGrid />
      </div>
    </div>
  );
}
