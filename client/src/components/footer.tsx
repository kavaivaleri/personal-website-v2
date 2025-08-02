import { Github, Linkedin, Twitter, Dribbble } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-pixel-dark text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <h3 className="text-2xl font-bold text-pixel-pink mb-4">Valeria.</h3>
            <p className="text-gray-300 max-w-md mb-6">
              AI/ML Content Strategist passionate about making cutting-edge research accessible. 
              Building bridges between complex technical concepts and practical understanding.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-pixel-pink transition-colors duration-200"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-pixel-pink transition-colors duration-200"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-pixel-pink transition-colors duration-200"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://dribbble.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-pixel-pink transition-colors duration-200"
              >
                <Dribbble className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <a className="text-gray-300 hover:text-pixel-pink transition-colors duration-200">
                    Home
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/portfolio">
                  <a className="text-gray-300 hover:text-pixel-pink transition-colors duration-200">
                    Portfolio
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <a className="text-gray-300 hover:text-pixel-pink transition-colors duration-200">
                    Blog
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-gray-300 hover:text-pixel-pink transition-colors duration-200">
                    Contact
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2">
              <li><span className="text-gray-300">Technical Writing</span></li>
              <li><span className="text-gray-300">Content Strategy</span></li>
              <li><span className="text-gray-300">AI/ML Research</span></li>
              <li><span className="text-gray-300">Community Building</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Valeria Kuka. All rights reserved. Built with love and lots of pixels.
          </p>
        </div>
      </div>
    </footer>
  );
}
