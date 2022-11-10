import { Notify } from 'notiflix/build/notiflix-notify-aio';
Notify.init({
    width: '860px',
    position: 'center-center',
    distance: '100px',
    fontSize: '40px',
    cssAnimationDuration: 2000,
    opacity: 1,
  });
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
const refs = {
input : document.querySelector("#datetime-picker"),
startBtn : document.querySelector("[data-start]"),
days : document.querySelector("[data-days]"),
hours : document.querySelector("[data-hours]"),
minutes : document.querySelector("[data-minutes]"),
seconds : document.querySelector("[data-seconds]"),
}
refs.startBtn.disabled = true;
refs.input.addEventListener("input", () => {refs.startBtn.disabled = false;})
console.log("hger11111t");

let selectedDate = null;
flatpickr(refs.input, {
    enableTime: true,
    time_24hr: true,
    disable: ["2022-11-03"],
    defaultDate: new Date(),
    minuteIncrement: 1,
    dateFormat: "d.m.Y",
    minDate: "today",
    onClose(selectedDates) {
      if (selectedDates[0] < new Date()) {
         Notify.failure(`❌ Please choose a date in the future❌`);
         } else {
        selectedDate = selectedDates[0];
        console.log(selectedDate);
      }
    },
  });

  function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }

  function onStartButtonClick() {
    const timerId = setInterval(() => {
        const currentTime = new Date();
      let timeLeft = selectedDate - currentTime;
      if (timeLeft <= 0) {
        clearInterval(timerId);
        timeLeft = 0;
      }
      const resultTime = convertMs(timeLeft);
      showData(resultTime);
      refs.input.disabled = true;
      refs.startBtn.disabled = true;
    }, 1000);
  }
  
  refs.startBtn.addEventListener("click", onStartButtonClick);

  function showData({ days, hours, minutes, seconds }) {
    refs.days.textContent = days.toString().padStart(2, "0");
    refs.hours.textContent = hours.toString().padStart(2, "0");
    refs.minutes.textContent = minutes.toString().padStart(2, "0");
    refs.seconds.textContent = seconds.toString().padStart(2, "0");
  }
  
  refs.input.classList.add("timer-input");
  refs.startBtn.classList.add("timer-button")
