import { Code, Github, Linkedin, Twitter, Dribbble } from "lucide-react";
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
                Hi, I'm <span className="text-pixel-pink">Val</span>
                <span className="block text-pixel-teal">Digital Creative</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                I create digital experiences that blend technology with creativity. From pixel art to modern web applications, I bring ideas to life through code and design.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/portfolio">
                <Button className="bg-pixel-pink text-white px-8 py-3 font-semibold shadow-pixel hover:shadow-pixel-hover transform hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200">
                  View My Work
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="bg-white text-pixel-dark border-2 border-pixel-teal px-8 py-3 font-semibold shadow-pixel hover:shadow-pixel-hover transform hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200"
                >
                  Get in Touch
                </Button>
              </Link>
            </div>

            <div className="flex space-x-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pixel-teal hover:text-pixel-pink transition-colors duration-200"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pixel-teal hover:text-pixel-pink transition-colors duration-200"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pixel-teal hover:text-pixel-pink transition-colors duration-200"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="https://dribbble.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pixel-teal hover:text-pixel-pink transition-colors duration-200"
              >
                <Dribbble className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Pixel Art Avatar Representation */}
              <div className="w-80 h-80 bg-gradient-to-br from-pixel-pink to-pixel-light-pink rounded-lg shadow-pixel p-8 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 bg-pixel-teal rounded-lg mx-auto flex items-center justify-center shadow-lg">
                    <Code className="text-white w-12 h-12" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-white rounded w-32 mx-auto opacity-75"></div>
                    <div className="h-4 bg-white rounded w-24 mx-auto opacity-50"></div>
                    <div className="h-4 bg-white rounded w-28 mx-auto opacity-75"></div>
                  </div>
                  <div className="flex justify-center space-x-2">
                    <div className="w-3 h-3 bg-white rounded opacity-75"></div>
                    <div className="w-3 h-3 bg-white rounded opacity-50"></div>
                    <div className="w-3 h-3 bg-white rounded opacity-75"></div>
                  </div>
                </div>
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
