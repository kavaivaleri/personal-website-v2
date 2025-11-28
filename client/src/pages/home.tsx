import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import HeroSection from "@/components/hero-section";
import BlogGrid from "@/components/blog-grid";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Blog Section */}
      <section id="blog" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-pixel-dark mb-4">Blog</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              New articles and insights I'm writing here. For my previous published work on other platforms, see <Link href="/publications" className="text-pixel-teal hover:text-pixel-pink underline">Published Work</Link>.
            </p>
          </div>

          <BlogGrid limit={3} />

          <div className="text-center mt-12">
            <Link href="/blog">
              <Button className="bg-pixel-pink text-white px-8 py-3 font-semibold shadow-pixel hover:shadow-pixel-hover transform hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200">
                View All Posts <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
