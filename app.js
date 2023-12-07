const moreBtn = document.querySelector('.more');
const guideOut = document.querySelector('.setup-guide-out');
const guideIn = document.querySelector('.setup-guide-in');
//
const steps = document.querySelector('.steps');
const allSteps = document.querySelectorAll('.step');

guideOut.style.height = `8rem`;

let guideInHeight;

const stepReset = function () {
  allSteps.forEach((step) => {
    step.style.height = '40px';
    step.classList.remove('opened-step');
  });
};

moreBtn.addEventListener('click', () => {
  moreBtn.classList.toggle('rotate');

  stepReset();

  guideOut.classList.toggle('show');
  if (guideOut.classList.contains('show')) {
    guideOut.style.overflow = 'visible';
  } else {
    guideOut.style.overflow = 'hidden';
  }
});

const openClose = function (e) {
  const stepOut = e.target.closest('.step');

  if (stepOut) {
    // Close all open steps
    stepReset();

    stepOut.classList.add('opened-step');

    // Open the clicked step
    const stepOutHeight = stepOut.getBoundingClientRect().height;

    const stepIn = stepOut.querySelector('.step-inner');
    const stepInHeight = stepIn.getBoundingClientRect().height;

    if (stepOutHeight) {
      stepOut.style.height = `${stepInHeight}px`;
    }

    if (stepOutHeight === stepInHeight) {
      stepOut.style.height = '40px';
    }
  }
};

steps.addEventListener('click', openClose);

document.addEventListener('click', function (e) {
  if (!e.target.closest('.step')) {
    stepReset();
  }
});
