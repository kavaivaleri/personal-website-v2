import requests
import re
import csv
from urllib.parse import urlparse

BASE = "https://learnprompting.org"
SITEMAP_URL = f"{BASE}/sitemap.xml"

def extract_all_blog_posts():
    """Quickly extract all blog post URLs from sitemap"""
    print("Extracting ALL blog posts from Learn Prompting...")
    print("=" * 50)
    
    print(f"Fetching sitemap: {SITEMAP_URL}")
    
    try:
        r = requests.get(SITEMAP_URL, timeout=20)
        if r.status_code != 200:
            print(f"❌ Failed to fetch sitemap: {r.status_code}")
            return []
        
        # Find all URLs containing 'blog'
        blog_urls = re.findall(r'<loc>([^<]*blog[^<]*)</loc>', r.text)
        
        # Filter to only include individual blog posts
        post_urls = []
        for url in blog_urls:
            # Skip main blog page and translations/docs
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
        
        print(f"✅ Found {len(post_urls)} individual blog posts")
        
        # Create basic data structure
        posts = []
        for i, url in enumerate(post_urls, 1):
            # Extract title from URL slug (basic fallback)
            slug = url.split('/')[-1]
            title_from_slug = slug.replace('-', ' ').replace('_', ' ').title()
            
            posts.append({
                'id': i,
                'title': title_from_slug,  # Will be improved if we do full extraction later
                'url': url,
                'slug': slug,
                'date': None,
                'excerpt': None
            })
        
        return posts
        
    except Exception as e:
        print(f"❌ Error: {e}")
        return []

def save_to_csv(posts, filename="all_learnprompting_posts.csv"):
    """Save posts to CSV file"""
    with open(filename, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=["id", "title", "url", "slug", "date", "excerpt"])
        w.writeheader()
        w.writerows(posts)
    
    print(f"💾 Saved {len(posts)} posts to {filename}")

def search_for_author(posts, author_names):
    """Search for posts that might be authored by specific names"""
    print(f"\n🔍 Searching for posts by: {', '.join(author_names)}")
    
    potential_matches = []
    
    for post in posts:
        # Search in URL slug and title
        text_to_search = f"{post['slug']} {post['title']}".lower()
        
        for name in author_names:
            if name.lower() in text_to_search:
                potential_matches.append({
                    'post': post,
                    'matched_name': name,
                    'match_location': 'title/url'
                })
                break
    
    if potential_matches:
        print(f"📝 Found {len(potential_matches)} potential matches:")
        for i, match in enumerate(potential_matches, 1):
            post = match['post']
            print(f"{i:2d}. {post['title']}")
            print(f"    URL: {post['url']}")
            print(f"    Matched: {match['matched_name']} in {match['match_location']}")
            print()
    else:
        print("❌ No obvious matches found in titles/URLs")
        print("💡 We may need to check individual post content for author information")
    
    return potential_matches

def main():
    # Extract all posts
    posts = extract_all_blog_posts()
    
    if not posts:
        print("❌ No posts found. Exiting.")
        return
    
    # Save to CSV
    save_to_csv(posts)
    
    # Search for Valeria's posts
    author_names = ['valeria', 'valeriia', 'kuka']
    matches = search_for_author(posts, author_names)
    
    print("=" * 50)
    print(f"✅ SUMMARY:")
    print(f"   Total posts found: {len(posts)}")
    print(f"   Potential authored posts: {len(matches)}")
    print(f"   Data saved to: all_learnprompting_posts.csv")
    print()
    print("💡 Next steps:")
    print("   1. Review the potential matches above")
    print("   2. If needed, run full extraction to get author details from each post")
    print("   3. Or manually check specific posts of interest")
    
    return posts

if __name__ == "__main__":
    posts = main()
