const fs = require('fs');
const cheerio = require('cheerio');
let $ = cheerio.load(fs.readFileSync('raw_body.html', 'utf8'));
let imgs = [];
$('img').each((i, el)=>{
  let src=$(el).attr('src');
  if(src && src.includes('uploads')) imgs.push(src.split('/').pop());
});
console.log(imgs);
