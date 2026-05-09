const fs = require('fs');
['index.html', 've-Smiley Creative/index.html'].forEach(f => {
  let html = fs.readFileSync(f, 'utf8');
  html = html.replace(/href="index\.html"/g, 'href="/"');
  html = html.replace(/href="ve-Smiley Creative\/index\.html"/g, 'href="/ve-Smiley Creative/"');
  fs.writeFileSync(f, html, 'utf8');
});
console.log('Fixed links 2');
