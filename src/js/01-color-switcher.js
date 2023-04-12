const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  body: document.querySelector('body')
};

const INTERVAL_TIME = 1000;
let intervalId = null;

refs.startBtn.addEventListener('click', onRandomColorClick);
refs.stopBtn.addEventListener('click', stopRandomColorClick);
refs.stopBtn.disabled = true;

function onRandomColorClick (e){
  intervalId = setInterval(() => {
refs.body.style.backgroundColor =  getRandomHexColor()
    }, INTERVAL_TIME);
    e.target.disabled = true;
    refs.stopBtn.disabled = false;
}

function stopRandomColorClick(e){
  clearInterval(intervalId);
  e.target.disabled = true;
  refs.startBtn.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}