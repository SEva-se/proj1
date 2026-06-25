// Verifies key text fragments from original HTML appear in built output
import { readFileSync } from 'fs';

const built = readFileSync('dist/index.html', 'utf8');

const checks = [
  // blk4
  ['blk4 eyebrow', 'Обследование рынка · Market Shift Report'],
  ['blk4 h2', 'смоет с рынка'],
  ['blk4 like', 'Ставь лайк если согласен'],
  ['blk4 shift01', 'тёплые запуски в Instagram работали почти у всех'],
  ['blk4 shift05', 'Понятная, масштабируемая модель'],
  ['blk4 closer', 'Поменялись правила игры'],
  ['blk4 cta', 'Проверить, что устарело в проекте'],

  // blk5
  ['blk5 eyebrow', 'Методология диагностики'],
  ['blk5 h2', 'обследуем'],
  ['blk5 step01', 'Вскрываем проект по 10 зонам'],
  ['blk5 step04', 'Персональный план действий'],
  ['blk5 audit', 'Итоговый аудит-документ'],
  ['blk5 toc', 'Пошаговый план выхода из операционки'],

  // blk6
  ['blk6 eyebrow', 'Что вы получите за 90 минут'],
  ['blk6 gain01', 'Направляем маркетинговый лазер'],
  ['blk6 gain02', 'Сдвиг восприятия'],
  ['blk6 live', 'Живая диагностика · Zoom'],

  // blk7
  ['blk7 eyebrow', 'Почему это бесплатно'],
  ['blk7 body', 'Диагностику я запускаю не постоянно'],
  ['blk7 derisk', 'Никаких обязательств'],

  // blk8
  ['blk8 eyebrow', 'Кто проводит обследование'],
  ['blk8 name', 'Рустам Михайлов'],
  ['blk8 role', 'маркетинг-хирург'],
  ['blk8 ig', '@mihaylov.rustam'],
  ['blk8 fact', '$700 000'],
  ['blk8 fact2', '100+ проектов'],

  // blk9
  ['blk9 eyebrow', 'Отзывы пациентов'],
  ['blk9 h2', 'прошли обследование'],
  ['blk9 niche1', 'Терапевт, эндокринолог'],
  ['blk9 quote1', 'без этой каши, что была раньше'],
  ['blk9 niche6', 'Обучение макияжу'],

  // blk10
  ['blk10 h2', 'точно нет'],
  ['blk10 fit', 'Экспертам, консультантам, наставникам'],
  ['blk10 not', 'волшебную кнопку'],

  // blk11
  ['blk11 eyebrow', 'Как проходит'],
  ['blk11 step1', 'Записываемся на приём'],
  ['blk11 step4', 'Получаете диагноз и план действий'],

  // blk12
  ['blk12 h2', 'точный диагноз'],
  ['blk12 cta', 'Оформить карточку пациента'],
  ['blk12 sign', 'INFO CLINIC · ЧАСТНАЯ ДИАГНОСТИКА'],
  ['blk12 rating', '★★★★★ 5.0 · 100+ обследований'],

  // CTA links
  ['cta /zayavka', 'href="/zayavka"'],
];

let pass = 0, fail = 0;
for (const [label, text] of checks) {
  if (built.includes(text)) {
    pass++;
  } else {
    fail++;
    console.error(`FAIL: dist/index.html ${label} — "${text}" not found`);
  }
}

// zayavka checks
const zayavkaBuilt = readFileSync('dist/zayavka/index.html', 'utf8');
const zayavkaChecks = [
  ['zayavka title', 'Анкета на обследование'],
  ['zayavka h1', 'Перед обследованием нужно оформить карточку пациента'],
  ['zayavka q1', 'В какой нише вы работаете или планируете запускать онлайн-продукт?'],
  ['zayavka q2', 'На какой доход вы хотите выйти через 3 месяца?'],
  ['zayavka q3', 'Какой ваш текущий ежемесячный доход со всех проектов?'],
  ['zayavka step4', 'Последний шаг перед обследованием'],
  ['zayavka label ig', 'Instagram'],
  ['zayavka label tg', 'Telegram'],
  ['zayavka final p1', 'Ваша заявка на обследование проекта принята. Сейчас она находится на рассмотрении и уже передана в приёмную INFO CLINIC.'],
  ['zayavka final next', 'Обязательный следующий шаг'],
  ['zayavka final p2', 'Перейдите в Telegram. Там находятся дополнительные материалы по методике обследования, кейсы и вся дальнейшая информация по записи.'],
  ['zayavka final btn', 'Перейти в Telegram'],
];

for (const [label, text] of zayavkaChecks) {
  if (zayavkaBuilt.includes(text)) {
    pass++;
  } else {
    fail++;
    console.error(`FAIL: dist/zayavka/index.html ${label} — "${text}" not found`);
  }
}

console.log(`\n${pass}/${pass + fail} checks passed.`);
if (fail > 0) process.exit(1);
console.log('All text verified ✅');

