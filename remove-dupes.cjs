const fs = require('fs');

function removeBlock(html, id) {
    let startStr = 'data-id="' + id + '"';
    let startIdx = html.indexOf(startStr);
    if (startIdx === -1) return html;
    
    // backtrack to the start of the div
    let divStart = html.lastIndexOf('<div', startIdx);
    
    // count open and close div tags to find matching close tag
    let count = 0;
    let pos = divStart;
    while(pos < html.length) {
        let nextOpen = html.indexOf('<div', pos + 1);
        let nextClose = html.indexOf('</div', pos + 1);
        
        if (nextClose === -1) break;
        
        if (nextOpen !== -1 && nextOpen < nextClose) {
            count++;
            pos = nextOpen;
        } else {
            count--;
            pos = nextClose;
            if (count === 0) {
                // found matching close
                let endPos = html.indexOf('>', pos) + 1;
                console.log('Removing from', divStart, 'to', endPos);
                return html.substring(0, divStart) + html.substring(endPos);
            }
        }
    }
    return html;
}

let html = fs.readFileSync('index.html', 'utf8');
html = removeBlock(html, '281102f');
html = removeBlock(html, 'e963ac4');
fs.writeFileSync('index.html', html);

let html2 = fs.readFileSync('raw_body.html', 'utf8');
html2 = removeBlock(html2, '281102f');
html2 = removeBlock(html2, 'e963ac4');
fs.writeFileSync('raw_body.html', html2);

console.log('Removed successfully.');
