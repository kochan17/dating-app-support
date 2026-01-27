import re
import html

input_file = 'with_references/view-source_https___with.is_messages_5815250546.html'
output_file = 'with_references/index.html'

def extract_html():
    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Pattern to match content inside <td class="line-content">...</td>
        # Using dotall to match across newlines if any (though usually one line per cell)
        pattern = re.compile(r'<td class="line-content">(.*?)</td>', re.DOTALL)
        matches = pattern.findall(content)
        
        cleaned_lines = []
        for match in matches:
            # Remove span tags usually found in syntax highlighting, e.g. <span class="html-tag">
            # We want the text content of the cell, but be careful.
            # actually, the view-source uses HTML entities for the code itself.
            # e.g. <span class="html-tag">&lt;div&gt;</span>
            # So we should validly just unescape the whole string after stripping specific view-source formatting tags?
            # Or simpler: extracting the text content of the cell is roughly correct, then unescape.
            
            # Let's simple remove all HTML tags *within* the captured group first, 
            # effectively getting the "text" which is the escaped HTML source code.
            # However, looking at the source: <span class="html-tag">&lt;!DOCTYPE html&gt;</span>
            # If we remove tags, we get &lt;!DOCTYPE html&gt; which is correct.
            
            clean_text = re.sub(r'<[^>]+>', '', match)
            decoded_text = html.unescape(clean_text)
            cleaned_lines.append(decoded_text)
            
        processed_lines = []
        for line in cleaned_lines:
            # Replace CSS link
            line = line.replace('//cdn.with.is/assets/application-0755f4dcb5dfcb9603bca9d0fbf2a594799c4800cb64410885a03b576b3292d5.css', './assets/application.css')
            # Replace image paths
            line = line.replace('//cdn.with.is/assets/', './assets/')
            line = line.replace('//cdn.with.is/uploads/', './assets/uploads/')
            processed_lines.append(line)

        with open(output_file, 'w', encoding='utf-8') as f:
            f.write('\n'.join(processed_lines))
            
        print(f"Successfully extracted {len(cleaned_lines)} lines to {output_file}")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == '__main__':
    extract_html()
