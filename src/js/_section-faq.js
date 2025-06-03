document.addEventListener('DOMContentLoaded', function() {
  const faqElems = document.querySelectorAll('.faq__elem');
  const animationDuration = 300; // Длительность анимации в ms
  let isAnimating = false; // Флаг для предотвращения конфликтов анимаций

  // Функция плавного раскрытия/закрытия
  const animateHeight = (element, from, to) => {
    const startTime = performance.now();
    const step = (timestamp) => {
      const progress = Math.min((timestamp - startTime) / animationDuration, 1);
      const currentHeight = from + (to - from) * progress;
      element.style.maxHeight = `${currentHeight}px`;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        isAnimating = false;
        // Фиксируем конечное состояние
        if (to === 0) {
          element.style.maxHeight = '';
          element.style.display = 'none';
        }
      }
    };
    requestAnimationFrame(step);
  };

  // Инициализация - скрываем все ответы
  faqElems.forEach(elem => {
    const box = elem.querySelector('.faq__elem-box');
    box.style.display = 'none';
    box.dataset.height = box.scrollHeight + 'px';
  });

  // Обработчик кликов
  faqElems.forEach(elem => {
    const title = elem.querySelector('.faq__elem-title');
    const box = elem.querySelector('.faq__elem-box');
    const boxHeight = box.dataset.height;

    title.addEventListener('click', function() {
      if (isAnimating) return;
      isAnimating = true;

      // Закрываем все открытые элементы
      document.querySelectorAll('.faq__elem').forEach(otherElem => {
        if (otherElem !== elem && otherElem.classList.contains('faq__elem--active')) {
          const otherBox = otherElem.querySelector('.faq__elem-box');
          animateHeight(otherBox, otherBox.scrollHeight, 0);
          otherElem.classList.remove('active');
        }
      });

      // Переключаем текущий элемент
      if (elem.classList.contains('faq__elem--active')) {
        animateHeight(box, box.scrollHeight, 0);
        elem.classList.remove('faq__elem--active');
      } else {
        box.style.display = 'block';
        const currentHeight = box.scrollHeight;
        box.style.maxHeight = '0';
        animateHeight(box, 0, currentHeight);
        elem.classList.add('faq__elem--active');
      }
    });
  });
});