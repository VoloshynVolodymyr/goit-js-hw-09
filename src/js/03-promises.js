import { Notify } from 'notiflix/build/notiflix-notify-aio';
Notify.init({
    width: '560px',
    position: 'center-center',
    distance: '100px',
    cssAnimationDuration: 2000,
    opacity: 1,
  });
const formEl = document.querySelector('.form');
formEl.addEventListener('submit', onFormSubmit);

let firstDelay = '';
let delay = '';
let amount = '';

function onFormSubmit(event) {
  event.preventDefault();
  firstDelay = +event.currentTarget.elements.delay.value;
  delay = +event.currentTarget.elements.step.value;
  amount = +event.currentTarget.elements.amount.value;
  rasePromise();
}

function rasePromise() {
    let currentDelay = firstDelay;
    for (let i = 1; i <= amount; i += 1) {
      createPromise(i, currentDelay)
        .then(({ position, delay }) => {
          Notify.success(`✅ Fulfilled promise ${i} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notify.failure(`❌ Rejected promise ${i} in ${delay}ms`);
        })
          currentDelay += delay;
          formEl.reset();
    }
}


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}