import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Linkedin, Twitter, ExternalLink } from "lucide-react";
import MarkdownRenderer from "@/components/markdown-renderer";

interface AboutInfo {
  metadata: {
    name: string;
    title: string;
    email: string;
    location: string;
    linkedin: string;
    twitter: string;
  };
  content: string;
}

async function fetchAboutInfo(): Promise<AboutInfo> {
  const response = await fetch("/api/about.json");
  if (!response.ok) {
    throw new Error("Failed to fetch about information");
  }
  return response.json();
}

export default function About() {
  const { data: aboutInfo, isLoading, error } = useQuery({
    queryKey: ["about"],
    queryFn: fetchAboutInfo,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-red-200">
            <CardContent className="p-6">
              <p className="text-red-600">Failed to load about information. Please try again later.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!aboutInfo) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-pixel-dark mb-4">{aboutInfo.metadata.name}</h1>
          <p className="text-xl text-gray-600 mb-6">{aboutInfo.metadata.title}</p>
          
          {/* Contact Info */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge variant="outline" className="flex items-center gap-2 px-3 py-2">
              <MapPin className="w-4 h-4" />
              {aboutInfo.metadata.location}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-2 px-3 py-2">
              <Mail className="w-4 h-4" />
              {aboutInfo.metadata.email}
            </Badge>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4">
            <Button 
              variant="outline" 
              size="sm" 
              asChild
              className="hover:bg-pixel-teal hover:text-white transition-colors"
            >
              <a href={aboutInfo.metadata.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
                <ExternalLink className="w-3 h-3 ml-2" />
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              asChild
              className="hover:bg-pixel-pink hover:text-white transition-colors"
            >
              <a href={aboutInfo.metadata.twitter} target="_blank" rel="noopener noreferrer">
                <Twitter className="w-4 h-4 mr-2" />
                Twitter
                <ExternalLink className="w-3 h-3 ml-2" />
              </a>
            </Button>
          </div>
        </div>

        {/* About Content */}
        <Card className="shadow-pixel hover:shadow-pixel-hover transition-shadow duration-200">
          <CardContent className="p-8">
            <div className="markdown-content">
              <MarkdownRenderer content={aboutInfo.content} />
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <div className="text-center mt-12">
          <Card className="bg-gray-50 border-gray-200">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-pixel-dark mb-4">Get in Touch</h2>
              <p className="text-gray-700 mb-6">
                Available for content strategy and technical writing projects.
              </p>
              <Button 
                size="lg"
                className="bg-pixel-teal text-white px-8 py-3 font-semibold shadow-pixel hover:shadow-pixel-hover transform hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200"
                asChild
              >
                <a href="mailto:kavaivaleri@gmail.com">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Me
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
