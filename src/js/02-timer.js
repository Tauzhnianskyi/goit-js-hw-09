import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  inputEl: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  daysEl: document.querySelector('span[data-days]'),
  hoursEl: document.querySelector('span[data-hours]'),
  minutesEl: document.querySelector('span[data-minutes]'),
  secondsEl: document.querySelector('span[data-seconds]'),
};

const timer = {
  start() {
    const startTime = Date.parse(refs.inputEl.value);

    setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      setSpanTime(convertMs(deltaTime));
    }, 1000);
  },
};

refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      refs.startBtn.disabled = false;
    }
  },
};

flatpickr(refs.inputEl, options);

refs.startBtn.addEventListener('click', () => {
  timer.start();
  refs.startBtn.disabled = true;
});

function convertMs(deltaTime) {
  if (deltaTime < 0) {
    clearInterval();
    return {
      days: '00',
      hours: '00',
      minutes: '00',
      seconds: '00',
    };
  } else {
    const seconds = addLeadingZero(Math.floor((deltaTime / 1000) % 60));
    const minutes = addLeadingZero(Math.floor((deltaTime / 1000 / 60) % 60));
    const hours = addLeadingZero(
      Math.floor((deltaTime / (1000 * 60 * 60)) % 24)
    );
    const days = addLeadingZero(Math.floor(deltaTime / (1000 * 60 * 60 * 24)));

    return {
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }
}

function addLeadingZero(value) {
  if (value < 10) {
    return String(value).padStart(2, '0');
  }
  return String(value);
}

function setSpanTime(time) {
  refs.daysEl.textContent = time.days;
  refs.hoursEl.textContent = time.hours;
  refs.minutesEl.textContent = time.minutes;
  refs.secondsEl.textContent = time.seconds;
}

const fontColor = document.querySelector('body');
fontColor.style.color = '#569ff7';

const styleField = document.createElement('style');
styleField.innerText = '.field{display:grid; margin-right:20px;}';
document.body.appendChild(styleField);

const styleTimer = document.createElement('style');
styleTimer.innerText = '.timer{display:flex;}';
document.body.appendChild(styleTimer);

const styleValue = document.createElement('style');
styleValue.innerText = '.value{font-size: -webkit-xxx-large;}';
document.body.appendChild(styleValue);
