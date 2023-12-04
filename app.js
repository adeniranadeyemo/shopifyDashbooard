const moreBtn = document.querySelector('.more');
const guideOut = document.querySelector('.setup-guide-out');
const guideIn = document.querySelector('.setup-guide-in');

moreBtn.addEventListener('click', () => {
  moreBtn.classList.toggle('rotate');

  const guideOutHeight = guideOut.getBoundingClientRect().height;
  const guideInHeight = guideIn.getBoundingClientRect().height;

  if (guideOutHeight === 136) {
    guideOut.style.height = `${guideInHeight}px`;
  }

  if (guideOutHeight === guideInHeight) {
    guideOut.style.height = `136px`;
    console.log(3);
  }
});
