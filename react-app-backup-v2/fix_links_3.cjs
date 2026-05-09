const fs = require('fs');

let mainHtml = fs.readFileSync('index.html', 'utf8');
let veHtml = fs.readFileSync('ve-Smiley Creative/index.html', 'utf8');

const mainMatch = mainHtml.match(/<link rel=['"]stylesheet['"] id=['"]hello-elementor-css['"][\s\S]*?<script src=['"][^'"]*?jquery\.min\.js[^'"]*?['"] id=['"]jquery-core-js['"]><\/script>/i);
if (!mainMatch) { console.error("main match failed"); process.exit(1); }

const veMatch = veHtml.match(/<link rel=['"]stylesheet['"] id=['"]hello-elementor-css['"][\s\S]*?<script src=['"][^'"]*?jquery\.min\.js[^'"]*?['"] id=['"]jquery-core-js['"]><\/script>/i);
if (!veMatch) { console.error("ve match failed"); process.exit(1); }

let replacement = mainMatch[0];
replacement = replacement.replace(/https:\/\/coreviral\.vn/g, '');
replacement += '\n<link rel="stylesheet" id="elementor-post-1589-css" href="/wp-content/uploads/elementor/css/post-1589.css" media="all">';

fs.writeFileSync('ve-Smiley Creative/index.html', veHtml.replace(veMatch[0], replacement));
console.log("Replaced CSS in ve-Smiley Creative/index.html");
