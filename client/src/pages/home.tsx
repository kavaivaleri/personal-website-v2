import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import HeroSection from "@/components/hero-section";
import BlogGrid from "@/components/blog-grid";
import PublicationsGrid from "@/components/publications-grid";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Published Work Section */}
      <section id="publications" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-pixel-dark mb-4">Published Work</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Pieces I've written for platforms like Turing Post, Learn Prompting, and others.
            </p>
          </div>

          <PublicationsGrid featured={true} limit={3} />

          <div className="text-center mt-12">
            <Link href="/publications">
              <Button className="bg-pixel-pink text-white px-8 py-3 font-semibold shadow-pixel hover:shadow-pixel-hover transform hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200">
                View All Publications <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-pixel-dark mb-4">Blog</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Personal insights and reflections. If you're looking for my previous work, published on other platforms, check out <a href="/publications" className="text-pixel-teal hover:text-pixel-pink underline">Published Work</a>.
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
