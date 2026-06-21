// reveal-on-scroll — добавляет .in элементам .rv при попадании во вьюпорт.
// Уважает prefers-reduced-motion (там .rv уже видимы через CSS).
export function initReveal(): void {
  const els = document.querySelectorAll<HTMLElement>('.rv');
  if (!els.length) return;

  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('in'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.06 }
  );

  els.forEach((el) => io.observe(el));
}
