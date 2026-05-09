const fs = require('fs');

let sourceHtml = fs.readFileSync('raw_body.html', 'utf8');
let targetHtml = fs.readFileSync('ve-Smiley Creative/index.html', 'utf8');

function getElementorContainerHtml(html, dataId) {
  let searchStr = 'data-id="' + dataId + '"';
  let idx = html.indexOf(searchStr);
  if (idx === -1) return null;
  
  // Find the start of the container div
  let startIdx = html.lastIndexOf('<div class="elementor-element elementor-element-' + dataId, idx);
  if (startIdx === -1) return null;
  
  // Find the closing </div> of this container.
  // Since it's a huge minified string, we can count open/close divs.
  let openCount = 0;
  let currIdx = startIdx;
  while(currIdx < html.length) {
    let nextOpen = html.indexOf('<div', currIdx + 1);
    let nextClose = html.indexOf('</div', currIdx + 1);
    
    if (nextClose === -1) break; // Should not happen
    
    if (nextOpen !== -1 && nextOpen < nextClose) {
      openCount++;
      currIdx = nextOpen;
    } else {
      openCount--;
      currIdx = nextClose;
      if (openCount === 0) {
        // We found the matching closing div
        return html.substring(startIdx, nextClose + 6);
      }
    }
  }
  return null;
}

let sourceContainer1 = getElementorContainerHtml(sourceHtml, '3e6df0a');
let sourceContainer2 = getElementorContainerHtml(sourceHtml, '365ad4b');

let targetContainer1 = getElementorContainerHtml(targetHtml, '1d3840e');
let targetContainer2 = getElementorContainerHtml(targetHtml, 'f453aeb');

if (sourceContainer1 && sourceContainer2 && targetContainer1 && targetContainer2) {
  targetHtml = targetHtml.replace(targetContainer1, sourceContainer1);
  targetHtml = targetHtml.replace(targetContainer2, sourceContainer2);
  fs.writeFileSync('ve-Smiley Creative/index.html', targetHtml, 'utf8');
  console.log("Successfully synced 'Triết lý thương hiệu' and 'Case study' sections!");
} else {
  console.log("Failed to find some containers:");
  console.log("Source1:", !!sourceContainer1);
  console.log("Source2:", !!sourceContainer2);
  console.log("Target1:", !!targetContainer1);
  console.log("Target2:", !!targetContainer2);
}
