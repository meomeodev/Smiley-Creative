const fs = require('fs');
const cheerio = require('cheerio');

let sourceHtml = fs.readFileSync('raw_body.html', 'utf8');
let targetHtml = fs.readFileSync('ve-Smiley Creative/index.html', 'utf8');

const $source = cheerio.load(sourceHtml);
const $target = cheerio.load(targetHtml);

function getTopContainerByText($, text) {
  let found = null;
  $('div[data-element_type="container"]').each((i, el) => {
    if ($(el).parent().attr('data-element_type') !== 'container') {
      if ($(el).text().includes(text)) {
        found = $(el);
      }
    }
  });
  return found;
}

let sourceSection1 = getTopContainerByText($source, 'BẢN SẮC định hình');
let sourceSection2 = getTopContainerByText($source, 'Case study');
if (!sourceSection2) sourceSection2 = getTopContainerByText($source, 'Học viên ứng dụng');

let targetSection1 = getTopContainerByText($target, 'Hiểu thật sâu để');
let targetSection2 = getTopContainerByText($target, 'Case study');

if (sourceSection1 && sourceSection2 && targetSection1 && targetSection2) {
  if (sourceSection1.attr('data-id') === sourceSection2.attr('data-id')) {
     console.log("Source sections are actually the SAME container:", sourceSection1.attr('data-id'));
  }
  
  // Replace target sections.
  // Wait, if targetSection1 and targetSection2 are consecutive, replacing them is easy.
  targetSection1.replaceWith(sourceSection1);
  targetSection2.replaceWith(sourceSection2);

  let newHtml = $target.html();
  newHtml = newHtml.replace(/https:\/\/coreviral\.vn\//g, '/');
  newHtml = newHtml.replace(/https:\/\/Smiley Creative\.vn\//g, '/');
  newHtml = newHtml.replace(/href="index\.html"/g, 'href="/"');
  newHtml = newHtml.replace(/href="ve-Smiley Creative\/index\.html"/g, 'href="/ve-Smiley Creative/"');
  
  fs.writeFileSync('ve-Smiley Creative/index.html', newHtml, 'utf8');
  console.log("Successfully synced sections by text matching!");
} else {
  console.log("Failed to find some elements by text:");
  console.log("sourceSection1 (BẢN SẮC):", !!sourceSection1);
  console.log("sourceSection2 (Case study):", !!sourceSection2);
  console.log("targetSection1 (Hiểu thật sâu):", !!targetSection1);
  console.log("targetSection2 (Case study):", !!targetSection2);
}
