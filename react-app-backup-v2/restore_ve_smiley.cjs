const fs = require('fs');
const cheerio = require('cheerio');

let html = fs.readFileSync('ve-Smiley Creative/index.html', 'utf8');

// Basic replacements
html = html.replace(/CoreViral/g, 'Smiley Creative');
html = html.replace(/coreviral/g, 'smiley-creative');
html = html.replace(/COREVIRAL/g, 'SMILEY CREATIVE');
html = html.replace(/https:\/\/smiley-creative\.vn\//g, '/');
html = html.replace(/href="index\.html"/g, 'href="/"');
html = html.replace(/href="\\\/ve-Smiley Creative\\\/index\.html"/g, 'href="/ve-Smiley Creative/"');
html = html.replace(/href="ve-Smiley Creative\/index\.html"/g, 'href="/ve-Smiley Creative/"');

let ratingCssBlock = `
<link rel='stylesheet' id='widget-blockquote-css' href='/wp-content/plugins/elementor-pro/assets/css/widget-blockquote.mindb68.css' media='all' />
<link rel='stylesheet' id='widget-rating-css' href='/wp-content/plugins/elementor/assets/css/widget-rating.min3dd9.css' media='all' />
<script src="/wp-includes/js/jquery/jquery.min.js?ver=3.7.1" id="jquery-core-js"></script>
`;
html = html.replace('<script src="/wp-includes/js/jquery/jquery.min.js?ver=3.7.1" id="jquery-core-js"></script>', ratingCssBlock);

// Parse with cheerio
let $ = cheerio.load(html);

// Get real strings from homepage
let $raw = cheerio.load(fs.readFileSync('raw_body.html', 'utf8'));

let realTitleHtml = $raw('*:contains("BẢN SẮC định hình")').closest('.elementor-widget-container').html();
let realTextHtml = $raw('*:contains("SMILEY không đứng ngoài cuộc chơi")').closest('.elementor-widget-container').html();

// We know the structure has these exact strings on the ve-Smiley page
let oldTitleContainer = $('*:contains("Hiểu thật sâu để đơn giản hơn")').closest('.elementor-widget-container');
let oldTextContainer = $('*:contains("Triết lý “Hiểu thật sâu để đơn giản hơn” nhấn mạnh")').closest('.elementor-widget-container');

if (oldTitleContainer.length && realTitleHtml) oldTitleContainer.html(realTitleHtml);
if (oldTextContainer.length && realTextHtml) oldTextContainer.html(realTextHtml);

// Target Image 1 (Newton)
let newtonImg = $('img[src*="goc-re.webp"]');
let realImg1 = $raw('img[src*="anh3.png"]').first();
if (newtonImg.length && realImg1.length) {
    newtonImg.attr('src', '/wp-content/uploads/2024/10/anh3.png');
    newtonImg.attr('srcset', '');
}

// Target Image 2 (Signing ceremony)
let coreviralImg = $('img[src*="Screenshot_514.jpg"]');
let realImg2 = $raw('img[src*="anh4.png"]').first();
if (coreviralImg.length && realImg2.length) {
    coreviralImg.attr('src', '/wp-content/uploads/2024/10/anh4.png');
    coreviralImg.attr('srcset', '');
}

// For Case Study
// The case study swiper was synced fine last time... Wait! If I just restored the html from the internet, the case study section will be the old "CoreViral" one! I should replace the entire Case Study container from raw_body.html!
let oldCaseStudy = $('div[data-id="f453aeb"]').first();
let newCaseStudy = $raw('div[data-id="365ad4b"]').first();
if (oldCaseStudy.length && newCaseStudy.length) {
    oldCaseStudy.replaceWith(newCaseStudy);
}

fs.writeFileSync('ve-Smiley Creative/index.html', $.html().replace(/https:\/\/smiley-creative\.vn\//g, '/'), 'utf8');
console.log("Successfully restored and synced the page!");
