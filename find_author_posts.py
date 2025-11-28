import csv
import requests
from bs4 import BeautifulSoup
import time

def search_for_valeria_posts():
    """Search through extracted posts and check for author information"""
    print("Searching for posts authored by Valeria/Valeriia Kuka...")
    print("=" * 60)
    
    # Read the extracted posts
    posts = []
    with open("learnprompting_sitemap_posts.csv", "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        posts = list(reader)
    
    print(f"Loaded {len(posts)} posts from extraction")
    
    # Search for potential matches in titles and excerpts first
    potential_matches = []
    author_keywords = ['valeria', 'valeriia', 'kuka', 'by valeria', 'by valeriia']
    
    for post in posts:
        text_to_search = f"{post['title']} {post['excerpt'] or ''}".lower()
        
        for keyword in author_keywords:
            if keyword in text_to_search:
                potential_matches.append({
                    'post': post,
                    'keyword': keyword,
                    'found_in': 'title/excerpt'
                })
                break
    
    print(f"Found {len(potential_matches)} potential matches in titles/excerpts")
    
    # If no obvious matches, we need to check the actual content of posts
    if len(potential_matches) == 0:
        print("No matches in titles/excerpts. Checking post content...")
        print("This will take a while as we need to visit each post...")
        
        valeria_posts = []
        
        for i, post in enumerate(posts, 1):
            if i % 20 == 0:
                print(f"Progress: {i}/{len(posts)} ({i/len(posts)*100:.1f}%)")
            
            try:
                # Fetch the post content
                r = requests.get(post['url'], timeout=10)
                if r.status_code == 200:
                    soup = BeautifulSoup(r.text, "html.parser")
                    
                    # Look for author information in various places
                    page_text = soup.get_text().lower()
                    
                    # Check if any of our keywords appear in the page
                    for keyword in author_keywords:
                        if keyword in page_text:
                            # Try to extract more context around the author mention
                            lines = page_text.split('\n')
                            author_context = []
                            
                            for line in lines:
                                if keyword in line and len(line.strip()) > 0:
                                    author_context.append(line.strip()[:100])
                            
                            valeria_posts.append({
                                'post': post,
                                'keyword': keyword,
                                'context': author_context[:3],  # First 3 relevant lines
                                'found_in': 'page_content'
                            })
                            print(f"✅ Found match in: {post['title'][:60]}...")
                            break
                
                # Be respectful to the server
                time.sleep(0.5)
                
            except Exception as e:
                print(f"❌ Error checking {post['url']}: {e}")
        
        potential_matches = valeria_posts
    
    # Display results
    print("\n" + "=" * 60)
    print("RESULTS:")
    
    if potential_matches:
        print(f"🎯 Found {len(potential_matches)} posts authored by Valeria/Valeriia:")
        print()
        
        for i, match in enumerate(potential_matches, 1):
            post = match['post']
            print(f"{i}. {post['title']}")
            print(f"   URL: {post['url']}")
            print(f"   Date: {post['date'] or 'No date'}")
            print(f"   Matched keyword: '{match['keyword']}' in {match['found_in']}")
            
            if 'context' in match:
                print(f"   Context:")
                for ctx in match['context']:
                    print(f"     - {ctx}")
            
            print()
        
        # Save results to CSV
        valeria_posts_data = []
        for match in potential_matches:
            post = match['post']
            valeria_posts_data.append({
                'title': post['title'],
                'url': post['url'],
                'date': post['date'],
                'excerpt': post['excerpt'],
                'matched_keyword': match['keyword'],
                'found_in': match['found_in']
            })
        
        with open("valeria_authored_posts.csv", "w", newline="", encoding="utf-8") as f:
            w = csv.DictWriter(f, fieldnames=["title", "url", "date", "excerpt", "matched_keyword", "found_in"])
            w.writeheader()
            w.writerows(valeria_posts_data)
        
        print(f"💾 Saved results to valeria_authored_posts.csv")
    
    else:
        print("❌ No posts found authored by Valeria/Valeriia")
        print("💡 This could mean:")
        print("   - The posts don't include author information in the HTML")
        print("   - The author information is loaded dynamically with JavaScript")
        print("   - The posts might be under a different name/attribution")
    
    return potential_matches

if __name__ == "__main__":
    matches = search_for_valeria_posts()
