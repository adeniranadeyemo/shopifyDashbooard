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
const progress = document.querySelector('.progress');
let completed = [];

totalSteps.textContent = checkBoxes.length;

//

close.addEventListener('click', () => {
  trial.style.display = 'none';
});

//
function setFocus(dropdown, trigger) {
  const isEXpanded = trigger.attributes['aria-expanded'].value === 'true';

  const allMenuItems = dropdown.querySelectorAll('[role="menuitem"]');

  if (isEXpanded) {
    closeMenu(trigger);
  } else {
    openMenu(trigger, allMenuItems, dropdown);
  }
}

function openMenu(trigger, allMenuItems, dropdown) {
  trigger.ariaExpanded = 'true';
  allMenuItems.item(0).focus();

  dropdown.addEventListener('keyup', (e) => handleEscape(e, dropdown, trigger));

  allMenuItems.forEach((menuItem, i) => {
    menuItem.addEventListener('keyup', (e) =>
      menuItemKeypress(e, i, allMenuItems)
    );
  });
}

function menuItemKeypress(e, i, allMenuItems) {
  const isLastItem = i === allMenuItems.length - 1;

  const isFirstItem = i === 0;

  const nextMenuItem = allMenuItems.item(i + 1);
  const prevMenuItem = allMenuItems.item(i - 1);

  // Arrow right or Arrow down
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    // Go to first
    if (isLastItem) {
      allMenuItems.item(0).focus();
      return;
    }

    nextMenuItem.focus();
  }

  // Arrow left or Arrow up
  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    // Go to last
    if (isFirstItem) {
      allMenuItems.item(allMenuItems.length - 1).focus();
      return;
    }

    prevMenuItem.focus();
  }
}

function handleEscape(e, dropdown, trigger) {
  if (e.key === 'Escape') {
    toggleMenu(dropdown);
    closeMenu(trigger);
    trigger.focus();
  }
}

function closeMenu(trigger) {
  trigger.ariaExpanded = 'false';
  // trigger.focus();
}

function toggleMenu(dropdown) {
  dropdown.classList.toggle('dropdown-show');
}

function toggleMenu2(dropdown) {
  dropdown.classList.toggle('show');
}

//

notification.addEventListener('click', function () {
  toggleMenu(notificationDropdown);

  setFocus(notificationDropdown, notification);
});

user.addEventListener('click', function () {
  toggleMenu(profileDropdown);

  setFocus(profileDropdown, user);
});

//

document.addEventListener('click', function (e) {
  if (!e.target.closest('.user-con')) {
    profileDropdown.classList.remove('dropdown-show');

    closeMenu(user);
  }

  if (!e.target.closest('.notification')) {
    notificationDropdown.classList.remove('dropdown-show');

    closeMenu(notification);
  }
});

const stepReset = function () {
  allSteps.forEach((step) => {
    step.style.height = '40px';
    step.classList.remove('opened-step');
  });
};

moreBtn.addEventListener('click', () => {
  moreBtn.classList.toggle('rotate');

  stepReset();

  toggleMenu2(guideOut);

  setFocus(guideOut, moreBtn);
});

//

guideOut.style.height = `7.5rem`;

let guideInHeight;

const toggleStepsCon = function (e) {
  const stepOut = e.target.closest('.step');
  const isCheckbox = e.target.matches('.checkbox');

  if (stepOut) {
    if (e.key === 'Enter' || (e.type === 'click' && !isCheckbox)) {
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
  }
};

['click', 'keydown'].forEach((e) => steps.addEventListener(e, toggleStepsCon));

// steps.addEventListener('click', toggleStepsCon);

document.addEventListener('click', function (e) {
  if (!e.target.closest('.step')) {
    stepReset();
  }
});

const setImageBg = function (e) {
  const checkBox = e.target.closest('.checkbox');

  if (checkBox) {
    setTimeout(() => {
      checkBox.src =
        'https://crushingit.tech/hackathon-assets/icon-spinner.svg';
      checkBox.style.transform = 'rotate(450deg)';
      checkBox.style.width = '23px';
      checkBox.style.height = '23px';
    }, 300);

    setTimeout(() => {
      checkBox.src =
        'https://crushingit.tech/hackathon-assets/icon-checkmark-circle.svg';
      checkBox.style.transform = 'rotate(0deg)';
      checkBox.style.width = '28px';
      checkBox.style.height = '28px';
      checkBox.style.filter = 'invert(0%)';
    }, 1200);
  }
};

const resetImage = function (e) {
  const checkBox = e.target.closest('.checkbox');

  if (checkBox) {
    setTimeout(() => {
      checkBox.src =
        'https://crushingit.tech/hackathon-assets/icon-spinner.svg';
      checkBox.style.transform = 'rotate(450deg)';
      checkBox.style.width = '23px';
      checkBox.style.height = '23px';
      checkBox.style.filter = 'invert(50%)';
    }, 300);

    setTimeout(() => {
      checkBox.src =
        'https://crushingit.tech/hackathon-assets/icon-dashed-circle.svg';
      checkBox.style.transform = 'rotate(0deg)';
      checkBox.style.width = '28px';
      checkBox.style.height = '28px';
      checkBox.style.filter = 'invert(50%)';
    }, 1200);
  }
};

// checkBoxes.forEach((checkBox) => {
const setCheckBox = function (checkBox) {
  let clickCount = 0;

  checkBox.addEventListener('click', (e) => {
    clickCount++;

    if (clickCount % 2 === 1) {
      setImageBg(e);
      completed.push(clickCount);
      completedSteps.textContent = completed.length;
      checkBox.classList.add('active');
    } else {
      resetImage(e);
      completed.pop();
      completedSteps.textContent = completed.length;
      checkBox.classList.remove('active');
    }

    const actives = document.querySelectorAll('.active');

    progress.style.width = (actives.length / allSteps.length) * 100 + '%';
  });
};
// });

const checkBoxPress = function () {
  checkBoxes.forEach((checkBox) => {
    checkBox.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        setCheckBox(e.target);
      }
    });

    checkBox.addEventListener('click', setCheckBox(checkBox));
  });
};
checkBoxPress();
