interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Simple markdown parser for basic formatting that preserves HTML blocks
  const parseMarkdown = (text: string) => {
    // First, extract HTML blocks (figure tags and their content) and replace with placeholders
    const htmlBlocks: string[] = [];
    let htmlBlockIndex = 0;
    
    // Match <figure>...</figure> blocks (including multi-line)
    text = text.replace(/<figure[\s\S]*?<\/figure>/gi, (match) => {
      const placeholder = `__HTML_BLOCK_${htmlBlockIndex}__`;
      htmlBlocks[htmlBlockIndex] = match;
      htmlBlockIndex++;
      return placeholder;
    });
    
    // Match self-closing img tags
    text = text.replace(/<img[^>]*\/?>/gi, (match) => {
      const placeholder = `__HTML_BLOCK_${htmlBlockIndex}__`;
      htmlBlocks[htmlBlockIndex] = match;
      htmlBlockIndex++;
      return placeholder;
    });
    
    // Convert headings
    text = text.replace(/^### (.*$)/gm, '<h3>$1</h3>');
    text = text.replace(/^## (.*$)/gm, '<h2>$1</h2>');
    text = text.replace(/^# (.*$)/gm, '<h1>$1</h1>');
    
    // Convert bold and italic
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Convert code blocks
    text = text.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
    text = text.replace(/`(.*?)`/g, '<code>$1</code>');
    
    // Convert links
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-pixel-teal hover:text-pixel-pink underline">$1</a>');
    
    // Convert lists
    text = text.replace(/^\- (.*$)/gm, '<li>$1</li>');
    
    // Wrap consecutive list items in ul tags
    text = text.replace(/(<li>.*<\/li>(?:\n<li>.*<\/li>)*)/gm, '<ul>$1</ul>');
    
    // Convert paragraphs - split by double newlines
    const paragraphs = text.split(/\n\n+/);
    const processedParagraphs = paragraphs.map(para => {
      para = para.trim();
      if (!para) return '';
      
      // Don't wrap HTML block placeholders, headings, lists, code blocks in paragraphs
      if (para.match(/^(__HTML_BLOCK_\d+__|<h[1-6]|<ul|<ol|<pre|<blockquote)/)) {
        return para;
      }
      return `<p>${para}</p>`;
    });
    
    text = processedParagraphs.join('');
    
    // Restore HTML blocks
    htmlBlocks.forEach((block, index) => {
      text = text.replace(`__HTML_BLOCK_${index}__`, block);
    });
    
    // Clean up empty paragraphs
    text = text.replace(/<p><\/p>/g, '');
    text = text.replace(/<p>(<h[1-6]>)/g, '$1');
    text = text.replace(/(<\/h[1-6]>)<\/p>/g, '$1');
    text = text.replace(/<p>(<ul>)/g, '$1');
    text = text.replace(/(<\/ul>)<\/p>/g, '$1');
    text = text.replace(/<p>(<pre>)/g, '$1');
    text = text.replace(/(<\/pre>)<\/p>/g, '$1');
    
    return text;
  };

  const htmlContent = parseMarkdown(content);

  return (
    <div 
      className="markdown-content prose prose-lg max-w-none"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
