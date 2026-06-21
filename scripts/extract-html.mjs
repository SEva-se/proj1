// Extracts raw HTML between two block IDs (keeps tags for structure analysis)
import { readFileSync } from 'fs';

const [,, blockStart, blockEnd] = process.argv;
const html = readFileSync('Сайт новый.html', 'utf8');
const i = html.indexOf(`id="${blockStart}"`);
const j = blockEnd ? html.indexOf(`id="${blockEnd}"`, i) : html.length;
if (i === -1) { console.error(`Block ${blockStart} not found`); process.exit(1); }
let slice = html.slice(i, j === -1 ? undefined : j);
// Strip base64 images and SVG content to reduce noise
slice = slice
  .replace(/data:image\/[^"]+/g, 'IMG')
  .replace(/<svg[\s\S]*?<\/svg>/g, '[SVG]');
console.log(slice);
