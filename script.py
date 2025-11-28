import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import csv

BASE = "https://learnprompting.org"
INDEX = f"{BASE}/blog"

r = requests.get(INDEX, timeout=20)
soup = BeautifulSoup(r.text, "html.parser")

rows = []
for card in soup.select("a[href^='/blog/']"):
    href = urljoin(BASE, card["href"])
    # Each card may have nested tags for title, date, excerpt
    title = card.get_text(strip=True)
    # Adjust selectors depending on site structure
    date = card.find("time")["datetime"] if card.find("time") else None
    excerpt = None
    if card.find("p"):
        excerpt = card.find("p").get_text(strip=True)
    rows.append({
        "title": title,
        "url": href,
        "date": date,
        "excerpt": excerpt
    })

# Save to CSV
with open("learnprompting_blog_index.csv","w",newline="",encoding="utf-8") as f:
    w = csv.DictWriter(f, fieldnames=["title","url","date","excerpt"])
    w.writeheader()
    w.writerows(rows)

print(f"Extracted {len(rows)} posts")
