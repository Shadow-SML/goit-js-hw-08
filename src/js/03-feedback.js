import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');
const emailInput = document.querySelector('input[type="email"]');
const messageTextarea = document.querySelector('textarea');
const formData = {};

if (localStorage.getItem(STORAGE_KEY)) {
  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  emailInput.value = savedData.email;
  messageTextarea.value = savedData.message;
}

const saveFormState = throttle(() => {
  formData.email = emailInput.value.trim();
  formData.message = messageTextarea.value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}, 500);
emailInput.addEventListener('input', saveFormState);
messageTextarea.addEventListener('input', saveFormState);

form.addEventListener('submit', event => {
  event.preventDefault();
  const { email, message } = formData;
  if (email && message) {
    console.log(formData);
    form.reset();
    localStorage.removeItem(STORAGE_KEY);
  }
});
