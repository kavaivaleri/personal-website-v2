import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import csv
import time
import re

BASE = "https://learnprompting.org"
SITEMAP_URL = f"{BASE}/sitemap.xml"

def get_blog_urls_from_sitemap():
    """Extract all blog URLs from the sitemap"""
    print(f"Fetching sitemap: {SITEMAP_URL}")
    
    try:
        r = requests.get(SITEMAP_URL, timeout=20)
        if r.status_code != 200:
            print(f"❌ Failed to fetch sitemap: {r.status_code}")
            return []
        
        # Find all URLs containing 'blog' in the sitemap
        blog_urls = re.findall(r'<loc>([^<]*blog[^<]*)</loc>', r.text)
        
        # Filter to only include individual blog posts (not the main blog page)
        post_urls = []
        for url in blog_urls:
            # Skip the main blog page and docs/translations
            if (url.endswith('/blog') or 
                '/docs/' in url or 
                '/ar/' in url or 
                '/es/' in url or 
                '/fr/' in url or
                '/pt/' in url or
                '/zh/' in url):
                continue
            
            # Only include URLs that look like individual blog posts
            if '/blog/' in url and url.count('/') >= 4:
                post_urls.append(url)
        
        print(f"✅ Found {len(post_urls)} blog post URLs in sitemap")
        return post_urls
        
    except Exception as e:
        print(f"❌ Error fetching sitemap: {e}")
        return []

def extract_post_details(url):
    """Extract details from a single blog post URL"""
    try:
        r = requests.get(url, timeout=15)
        if r.status_code != 200:
            return None
        
        soup = BeautifulSoup(r.text, "html.parser")
        
        # Extract title - try different selectors
        title = None
        title_selectors = ['h1', 'title', '.post-title', '.article-title']
        for selector in title_selectors:
            element = soup.select_one(selector)
            if element:
                title = element.get_text(strip=True)
                break
        
        # Extract date - try different selectors
        date = None
        date_selectors = ['time', '.date', '.post-date', '[datetime]']
        for selector in date_selectors:
            element = soup.select_one(selector)
            if element:
                date = element.get('datetime') or element.get_text(strip=True)
                break
        
        # Extract excerpt/description - try meta description first
        excerpt = None
        meta_desc = soup.find('meta', attrs={'name': 'description'})
        if meta_desc:
            excerpt = meta_desc.get('content', '').strip()
        
        # If no meta description, try to get first paragraph
        if not excerpt:
            first_p = soup.find('p')
            if first_p:
                excerpt = first_p.get_text(strip=True)[:200] + "..." if len(first_p.get_text(strip=True)) > 200 else first_p.get_text(strip=True)
        
        return {
            'title': title or 'No title found',
            'url': url,
            'date': date,
            'excerpt': excerpt
        }
        
    except Exception as e:
        print(f"  ❌ Error extracting {url}: {e}")
        return None

def main():
    print("Starting sitemap-based extraction of Learn Prompting blog posts...")
    print("=" * 70)
    
    # Get all blog URLs from sitemap
    blog_urls = get_blog_urls_from_sitemap()
    
    if not blog_urls:
        print("❌ No blog URLs found. Exiting.")
        return
    
    print(f"📝 Extracting details from {len(blog_urls)} blog posts...")
    print("This may take a while to be respectful to the server...")
    
    all_posts = []
    
    for i, url in enumerate(blog_urls, 1):
        print(f"[{i:3d}/{len(blog_urls)}] {url}")
        
        post_details = extract_post_details(url)
        if post_details:
            all_posts.append(post_details)
            print(f"  ✅ {post_details['title'][:60]}...")
        else:
            print(f"  ❌ Failed to extract details")
        
        # Be very respectful to the server
        time.sleep(2)
        
        # Progress indicator every 10 posts
        if i % 10 == 0:
            print(f"  📊 Progress: {i}/{len(blog_urls)} ({i/len(blog_urls)*100:.1f}%)")
    
    print("=" * 70)
    print(f"✅ Extraction complete! Successfully extracted {len(all_posts)} out of {len(blog_urls)} posts")
    
    # Save to CSV
    filename = "learnprompting_sitemap_posts.csv"
    with open(filename, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=["title", "url", "date", "excerpt"])
        w.writeheader()
        w.writerows(all_posts)
    
    print(f"💾 Saved all posts to {filename}")
    
    # Show some stats
    dates = [post['date'] for post in all_posts if post['date']]
    if dates:
        print(f"📅 Date range: {min(dates)} to {max(dates)}")
    
    return all_posts

if __name__ == "__main__":
    posts = main()
