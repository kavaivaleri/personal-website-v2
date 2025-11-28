import { Github, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function HeroSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="py-20 bg-gradient-to-br from-pixel-light-pink to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-pixel-dark leading-tight">
                Hi, I'm <span className="text-pixel-pink">Valeriia</span> <span className="text-gray-500 text-4xl">(Val)</span>
                <span className="block text-pixel-teal">Content Manager @ DataTalks.Club</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                I'm a content manager and technical writer specializing in AI/ML. I write, edit, and grow content to help people learn about machine learning and AI.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/publications">
                <Button className="bg-pixel-pink text-white px-8 py-3 font-semibold shadow-pixel hover:shadow-pixel-hover transform hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200">
                  Read My Writing
                </Button>
              </Link>
            </div>

            <div className="flex space-x-6">
              <a
                href="https://github.com/kavaivaleri"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pixel-teal hover:text-pixel-pink transition-colors duration-200"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/valeriia-kuka"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pixel-teal hover:text-pixel-pink transition-colors duration-200"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com/valeria_kuka"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pixel-teal hover:text-pixel-pink transition-colors duration-200"
              >
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-80 rounded-lg shadow-pixel overflow-hidden">
                <img
                  src="/images/photo2.jpg"
                  alt="Valeriia Kuka"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating pixel elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-pixel-teal opacity-50"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-pixel-pink opacity-50"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
