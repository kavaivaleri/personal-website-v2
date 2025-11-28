import { JSDOM } from 'jsdom';

export interface ExtractedImageInfo {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
}

export class ImageExtractor {
  private cache = new Map<string, ExtractedImageInfo | null>();
  
  async extractImageFromUrl(url: string): Promise<ExtractedImageInfo | null> {
    // Check cache first
    if (this.cache.has(url)) {
      return this.cache.get(url) || null;
    }

    try {
      // Fetch the webpage
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });

      if (!response.ok) {
        console.warn(`Failed to fetch ${url}: ${response.status}`);
        this.cache.set(url, null);
        return null;
      }

      const html = await response.text();
      const dom = new JSDOM(html);
      const document = dom.window.document;

      // Try different meta tag strategies in order of preference
      const strategies = [
        // Open Graph image
        () => document.querySelector('meta[property="og:image"]')?.getAttribute('content'),
        // Twitter card image
        () => document.querySelector('meta[name="twitter:image"]')?.getAttribute('content'),
        // Schema.org image
        () => document.querySelector('meta[property="image"]')?.getAttribute('content'),
        // Generic meta image
        () => document.querySelector('meta[name="image"]')?.getAttribute('content'),
        // Article image (for news sites)
        () => document.querySelector('meta[property="article:image"]')?.getAttribute('content'),
        // First image in content (fallback)
        () => {
          const img = document.querySelector('article img, .content img, .post img, main img');
          return img?.getAttribute('src');
        }
      ];

      let imageUrl: string | null = null;
      let alt: string | undefined;

      for (const strategy of strategies) {
        const result = strategy();
        if (result) {
          imageUrl = result;
          break;
        }
      }

      if (!imageUrl) {
        this.cache.set(url, null);
        return null;
      }

      // Convert relative URLs to absolute
      if (imageUrl.startsWith('/')) {
        const urlObj = new URL(url);
        imageUrl = `${urlObj.protocol}//${urlObj.host}${imageUrl}`;
      } else if (imageUrl.startsWith('./') || !imageUrl.includes('://')) {
        imageUrl = new URL(imageUrl, url).href;
      }

      // Get additional metadata
      alt = document.querySelector('meta[property="og:image:alt"]')?.getAttribute('content') ||
            document.querySelector('meta[name="twitter:image:alt"]')?.getAttribute('content') || undefined;

      const width = document.querySelector('meta[property="og:image:width"]')?.getAttribute('content');
      const height = document.querySelector('meta[property="og:image:height"]')?.getAttribute('content');

      const result: ExtractedImageInfo = {
        url: imageUrl,
        alt,
        width: width ? parseInt(width) : undefined,
        height: height ? parseInt(height) : undefined
      };

      // Cache the result
      this.cache.set(url, result);
      return result;

    } catch (error) {
      console.error(`Error extracting image from ${url}:`, error);
      this.cache.set(url, null);
      return null;
    }
  }

  // Clear cache for a specific URL (useful for testing or cache invalidation)
  clearCache(url?: string) {
    if (url) {
      this.cache.delete(url);
    } else {
      this.cache.clear();
    }
  }

  // Get cache stats
  getCacheStats() {
    return {
      size: this.cache.size,
      entries: Array.from(this.cache.keys())
    };
  }
}

export const imageExtractor = new ImageExtractor();
