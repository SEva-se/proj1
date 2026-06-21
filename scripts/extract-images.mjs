// Одноразовый экстрактор: вынимает все base64-картинки из исходного
// «Сайт новый.html» в src/assets/img/ и пишет манифест с контекстом (для привязки
// картинок к блокам). Запуск: node scripts/extract-images.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';

const SRC = 'Сайт новый.html';
const OUT = 'src/assets/img';
mkdirSync(OUT, { recursive: true });

const html = readFileSync(SRC, 'utf8');
const re = /data:image\/(png|jpe?g|jpg|webp|gif|svg\+xml);base64,([A-Za-z0-9+/=]+)/g;

const extMap = { 'jpeg': 'jpg', 'svg+xml': 'svg' };
const manifest = [];
let m, i = 0;
const seen = new Map();

while ((m = re.exec(html)) !== null) {
  i++;
  const rawType = m[1];
  const ext = extMap[rawType] || rawType;
  const b64 = m[2];
  const buf = Buffer.from(b64, 'base64');
  const hash = createHash('md5').update(buf).digest('hex').slice(0, 8);

  // дедуп по содержимому
  let name = seen.get(hash);
  if (!name) {
    name = `img-${String(i).padStart(2, '0')}-${hash}.${ext}`;
    writeFileSync(`${OUT}/${name}`, buf);
    seen.set(hash, name);
  }

  // контекст: 220 символов до вхождения — ищем ближайший id/class/alt/lbl
  const before = html.slice(Math.max(0, m.index - 260), m.index);
  const ctxIds = [...before.matchAll(/id="(blk\d+|b\d+|[a-z0-9-]+)"/g)].map(x => x[1]);
  const ctxClass = [...before.matchAll(/class="([^"]+)"/g)].map(x => x[1]).slice(-2);
  const alt = (html.slice(m.index, m.index + 400).match(/alt="([^"]*)"/) || [])[1] || '';

  manifest.push({
    order: i,
    file: name,
    bytes: buf.length,
    nearId: ctxIds.slice(-1)[0] || '',
    nearClass: ctxClass.join(' | '),
    alt,
  });
}

writeFileSync(`${OUT}/_manifest.json`, JSON.stringify(manifest, null, 2));
console.log(`Извлечено вхождений: ${i}, уникальных файлов: ${seen.size}`);
console.log('Манифест: src/assets/img/_manifest.json');
