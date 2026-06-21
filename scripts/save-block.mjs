// Extracts raw HTML for a block and saves to file
import { readFileSync, writeFileSync } from 'fs';

const [,, blockStart, blockEnd, outFile] = process.argv;
const html = readFileSync('Сайт новый.html', 'utf8');
const i = html.indexOf(`id="${blockStart}"`);
const j = blockEnd ? html.indexOf(`id="${blockEnd}"`, i) : html.length;
if (i === -1) { console.error(`Block ${blockStart} not found`); process.exit(1); }
let slice = html.slice(i, j === -1 ? undefined : j);
slice = slice
  .replace(/data:image\/[^"]+/g, 'IMG')
  .replace(/<svg[\s\S]*?<\/svg>/g, '[SVG]');
writeFileSync(outFile || `scripts/_${blockStart}.html`, slice);
console.log('Done, length:', slice.length);
