const fs = require('fs');
const cheerio = require('cheerio');

let sourceHtml = fs.readFileSync('raw_body.html', 'utf8');
let targetHtml = fs.readFileSync('ve-Smiley Creative/index.html', 'utf8');

const $source = cheerio.load(sourceHtml);
const $target = cheerio.load(targetHtml);

// Target the top level containers using just [data-id] and picking the first one
// Because Elementor loop items might duplicate the data-id inside its children or itself,
// the first occurrence is usually the main section container.
let sourceSection1 = $source('[data-id="3e6df0a"]').first();
let sourceSection2 = $source('[data-id="365ad4b"]').first();

let targetSection1 = $target('[data-id="1d3840e"]').first();
let targetSection2 = $target('[data-id="f453aeb"]').first();

if (sourceSection1.length && sourceSection2.length && targetSection1.length && targetSection2.length) {
  targetSection1.replaceWith(sourceSection1);
  targetSection2.replaceWith(sourceSection2);
  
  let newHtml = $target.html();
  newHtml = newHtml.replace(/https:\/\/coreviral\.vn\//g, '/');
  newHtml = newHtml.replace(/https:\/\/Smiley Creative\.vn\//g, '/');
  newHtml = newHtml.replace(/href="index\.html"/g, 'href="/"');
  newHtml = newHtml.replace(/href="ve-Smiley Creative\/index\.html"/g, 'href="/ve-Smiley Creative/"');
  
  fs.writeFileSync('ve-Smiley Creative/index.html', newHtml, 'utf8');
  console.log("Successfully replaced sections with Cheerio!");
} else {
  console.log("Failed to find some elements in Cheerio:");
  console.log("3e6df0a", sourceSection1.length);
  console.log("365ad4b", sourceSection2.length);
  console.log("1d3840e", targetSection1.length);
  console.log("f453aeb", targetSection2.length);
}
