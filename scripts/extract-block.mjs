// Extracts text content between two block IDs from the source HTML
import { readFileSync } from 'fs';

const [,, blockStart, blockEnd] = process.argv;
const html = readFileSync('Сайт новый.html', 'utf8');
const i = html.indexOf(`id="${blockStart}"`);
const j = blockEnd ? html.indexOf(`id="${blockEnd}"`, i) : html.length;
if (i === -1) { console.error(`Block ${blockStart} not found`); process.exit(1); }
const slice = html.slice(i, j === -1 ? undefined : j);
// Strip SVGs and base64 images, then strip tags
const clean = slice
  .replace(/<svg[\s\S]*?<\/svg>/g, '[SVG]')
  .replace(/data:image\/[^"]+/g, 'IMG')
  .replace(/></g, '>\n<')
  .replace(/<[^>]+>/g, ' ')
  .replace(/\n\s*\n/g, '\n')
  .replace(/^\s+/gm, '')
  .trim();
console.log(clean);
