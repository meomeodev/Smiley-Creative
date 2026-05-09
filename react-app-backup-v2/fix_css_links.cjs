const fs = require('fs');
let rootHtml = fs.readFileSync('index.html', 'utf8');
let pageHtml = fs.readFileSync('ve-Smiley Creative/index.html', 'utf8');

// The block we want to extract starts with <link rel='stylesheet' id='hello-elementor-css' and ends before the first script tag that loads jquery.
let rootLinksMatch = rootHtml.match(/<link rel='stylesheet' id='hello-elementor-css'[\s\S]*?<script src=".*?jquery.*?" id="jquery-core-js"><\/script>/);

if (rootLinksMatch) {
  let rootLinks = rootLinksMatch[0];
  let pageLinksPattern = /<link rel='stylesheet' id='hello-elementor-css'[\s\S]*?<script src=".*?jquery.*?" id="jquery-core-js"><\/script>/;
  
  // Replace the block in the page html with the block from root html + post-1589.css
  let replacement = rootLinks + "\n<link rel='stylesheet' id='elementor-post-1589-css' href='/wp-content/uploads/elementor/css/post-1589.css' media='all' />\n";
  pageHtml = pageHtml.replace(pageLinksPattern, replacement);
  
  // also fix url for jquery in that replacement block from coreviral to local if it has it in rootHtml
  // Wait, index.html might have https://coreviral.vn/wp-includes/js/jquery/jquery.min.js
  pageHtml = pageHtml.replace(/https:\/\/coreviral\.vn\/wp-includes\//g, '/wp-includes/');
  pageHtml = pageHtml.replace(/https:\/\/coreviral\.vn\/wp-content\//g, '/wp-content/');

  fs.writeFileSync('ve-Smiley Creative/index.html', pageHtml, 'utf8');
  console.log('Successfully replaced CSS links.');
} else {
  console.log('Failed to match CSS links in index.html');
}
