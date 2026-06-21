import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const html = readFileSync('страница заявки.html', 'utf8');
const re = /data:image\/(png|jpe?g|jpg|webp|gif|svg\+xml);base64,([A-Za-z0-9+/=]+)/g;

let m = re.exec(html);
if (m) {
  const b64 = m[2];
  const buf = Buffer.from(b64, 'base64');
  const hash = createHash('md5').update(buf).digest('hex').slice(0, 8);
  const name = `img-quiz-final-${hash}.jpg`;
  writeFileSync(`src/assets/img/${name}`, buf);
  console.log(`Extracted: src/assets/img/${name} (${buf.length} bytes)`);
} else {
  console.log('No base64 image found.');
}
