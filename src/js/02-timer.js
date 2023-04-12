// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

const INTERVAL_TIME = 1000;
let intervalId = null;
let selectedDate = null;
let currentDate = null;

const refs = {
  dateInput: document.querySelector('#datetime-picker'),
  startBtnTimer: document.querySelector('[data-start]'),
  dataDays: document.querySelector('[data-days]'),
  dataHours: document.querySelector('[data-hours]'),
  dataMinutes: document.querySelector('[data-minutes]'),
  dataSeconds: document.querySelector('[data-seconds]'),
};

refs.startBtnTimer.disabled = true;
refs.startBtnTimer.addEventListener('click', timerStart);

let calculatedTime = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    onDateCheck(selectedDates);
  },
};

flatpickr(refs.dateInput, options);

function onDateCheck(selectedDates) {
  selectedDate = selectedDates[0].getTime();
  currentDate = new Date().getTime();

  if (selectedDate > currentDate) {
    refs.startBtnTimer.disabled = false;
    alert(' Perfectly, Click on start.');
    return;
  }
  alert('Please choose a date in the future');
}

function timerStart() {
  intervalId = setInterval(() => {
    currentDate = new Date().getTime();
    if (selectedDate - currentDate <= 1000) {
      clearInterval(intervalId);
      refs.startBtnTimer.disabled = true;
      refs.dateInput.disabled = false;
      alert(' Pongratulation, Timer stopped.');
      return;
    } else {
      refs.startBtnTimer.disabled = true;
      refs.dateInput.disabled = true;
      currentDate += 1000;
      calculatedTime = Math.floor(selectedDate - currentDate);
      countdownTime(convertMs(calculatedTime));
    }
  }, INTERVAL_TIME);
}

const addLeadingZero = value => value.toString().padStart(2, '0');

function countdownTime({ days, hours, minutes, seconds }) {
  refs.dataDays.textContent = addLeadingZero(days);
  refs.dataHours.textContent = addLeadingZero(hours);
  refs.dataMinutes.textContent = addLeadingZero(minutes);
  refs.dataSeconds.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
