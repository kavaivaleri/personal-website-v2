export function parseMarkdown(content: string): string {
  let html = content;

  // Convert headings
  html = html.replace(/^### (.*$)/gm, '<h3 class="text-xl font-medium mb-3 text-pixel-dark">$1</h3>');
  html = html.replace(/^## (.*$)/gm, '<h2 class="text-2xl font-semibold mb-4 text-pixel-dark">$1</h2>');
  html = html.replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mb-6 text-pixel-dark">$1</h1>');

  // Convert bold and italic
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');

  // Convert code blocks
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto mb-4"><code>$2</code></pre>');
  html = html.replace(/`(.*?)`/g, '<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">$1</code>');

  // Convert links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-pixel-teal hover:text-pixel-pink underline transition-colors duration-200">$1</a>');

  // Convert unordered lists
  html = html.replace(/^\- (.+)$/gm, '<li class="mb-1">$1</li>');
  html = html.replace(/(<li class="mb-1">.*<\/li>)/gs, '<ul class="mb-4 list-disc list-inside space-y-2">$1</ul>');

  // Convert ordered lists
  html = html.replace(/^\d+\. (.+)$/gm, '<li class="mb-1">$1</li>');

  // Convert blockquotes
  html = html.replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-pixel-teal pl-4 py-2 bg-gray-50 italic mb-4">$1</blockquote>');

  // Convert line breaks to paragraphs
  const paragraphs = html.split('\n\n').filter(p => p.trim() !== '');
  html = paragraphs.map(p => {
    // Don't wrap headings, lists, blockquotes, or code blocks in paragraphs
    if (p.match(/^<(h[1-6]|ul|ol|blockquote|pre)/)) {
      return p;
    }
    return `<p class="mb-4 leading-relaxed text-gray-700">${p}</p>`;
  }).join('');

  return html;
}

export function extractExcerpt(content: string, maxLength: number = 150): string {
  // Remove markdown formatting for excerpt
  let text = content
    .replace(/#{1,6}\s+/g, '') // Remove headings
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/`(.*?)`/g, '$1') // Remove inline code
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links, keep text
    .replace(/^\- /gm, '') // Remove list markers
    .replace(/^\d+\. /gm, '') // Remove numbered list markers
    .replace(/^> /gm, '') // Remove blockquote markers
    .trim();

  if (text.length <= maxLength) {
    return text;
  }

  // Find the last complete word within the limit
  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return truncated.substring(0, lastSpace) + '...';
}
