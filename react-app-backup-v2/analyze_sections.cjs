const fs = require('fs');
const cheerio = require('cheerio');

function analyse(file) {
  let a = fs.readFileSync(file, 'utf8');
  let $a = cheerio.load(a);
  let res = [];
  $a('div[data-element_type="container"]').each((i, el) => {
    // top level containers under the page
    if ($a(el).parent().attr('data-element_type') !== 'container') {
      let txt = $a(el).text().substring(0, 150).replace(/\s+/g, ' ').trim();
      res.push($a(el).attr('data-id') + ' - ' + txt);
    }
  });
  console.log("=== " + file + " ===");
  console.log(res.join('\n'));
}

analyse('ve-Smiley Creative/index.html');
analyse('raw_body.html');
