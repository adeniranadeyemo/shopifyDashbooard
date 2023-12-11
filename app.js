const moreBtn = document.querySelector('.more');
const guideOut = document.querySelector('.setup-guide-out');
const guideIn = document.querySelector('.setup-guide-in');
//
const close = document.querySelector('.close');
const trial = document.querySelector('.trial');
//
const steps = document.querySelector('.steps');
const allSteps = document.querySelectorAll('.step');
//
const user = document.querySelector('.user-con');
const notification = document.querySelector('.notification');
const profileDropdown = document.querySelector('.profile-dropdown');
const notificationDropdown = document.querySelector('.notification-dropdown');
//
const checkBoxes = document.querySelectorAll('.checkbox');
//
const completedSteps = document.querySelector('.completed-steps');
const totalSteps = document.querySelector('.total-steps');
//
let completed = [];

totalSteps.textContent = checkBoxes.length;

close.addEventListener('click', () => {
  trial.style.display = 'none';
});

user.addEventListener('click', function () {
  profileDropdown.classList.toggle('dropdown-show');
});

notification.addEventListener('click', function () {
  notificationDropdown.classList.toggle('dropdown-show');
});

document.addEventListener('click', function (e) {
  if (!e.target.closest('.user-con')) {
    profileDropdown.classList.remove('dropdown-show');
  }
});

document.addEventListener('click', function (e) {
  if (!e.target.closest('.notification')) {
    notificationDropdown.classList.remove('dropdown-show');
  }
});

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

    // Open the clicked step
    stepOut.classList.add('opened-step');

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

// function changeImageBg(e) {
//   setTimeout((e) => {
//     e
//   }, 1000);

//   setTimeout(() => {}, 1500);
// }

const setImageBg = function (e) {
  const checkBox = e.target.closest('.checkbox');

  if (checkBox) {
    setTimeout(() => {
      checkBox.style.backgroundImage =
        "url('https://crushingit.tech/hackathon-assets/icon-spinner.svg')";
      checkBox.style.transform = 'rotate(270deg)';
      checkBox.style.width = '47.05px';
      checkBox.style.height = '18.82px';
    }, 500);

    setTimeout(() => {
      checkBox.style.backgroundImage =
        "url('https://crushingit.tech/hackathon-assets/icon-checkmark-circle.svg')";
      checkBox.style.transform = 'rotate(0deg)';
      checkBox.style.width = '80px';
      checkBox.style.height = '32px';
      checkBox.style.filter = 'invert(0%)';
    }, 1000);
  }
};

const resetImage = function (e) {
  const checkBox = e.target.closest('.checkbox');

  if (checkBox) {
    checkBox.style.backgroundImage =
      "url('https://crushingit.tech/hackathon-assets/icon-dashed-circle.svg')";
    checkBox.style.filter = 'invert(50%)';
  }
};

checkBoxes.forEach((checkBox) => {
  let clickCount = 0;

  checkBox.addEventListener('click', (e) => {
    clickCount++;

    if (clickCount % 2 === 1) {
      setImageBg(e);
      completed.push(clickCount);
      completedSteps.textContent = completed.length;
    } else {
      resetImage(e);
      completed.pop();
      completedSteps.textContent = completed.length;
    }
  });
});

console.log(completed);

// steps.addEventListener('click', setImageBg);
