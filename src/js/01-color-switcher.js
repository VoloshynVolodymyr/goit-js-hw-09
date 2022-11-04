const bodyEl = document.querySelector('body');
const btnStartEl = document.querySelector('button[data-start]');
const btnStopEl = document.querySelector('button[data-stop]');
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
function setBodyColor() {
  bodyEl.style.backgroundColor = getRandomHexColor();
}
btnStartEl.addEventListener('click', () => {
  timerId = setInterval(() => {
    setBodyColor();
  }, 1000);
  btnStartEl.disabled = true;
});

btnStopEl.addEventListener('click', () => {
  clearInterval(timerId);
  btnStartEl.disabled = false;
});
