/* eslint-disable */
import { displayMap } from './mapbox';
import { login, logout, resetPassword } from './login';
import { updateSettings } from './updateSettings';

// DOM ELEMENTS
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const chooseNewPhotoButton = document.querySelector('.btn-text');
const inputPhotoForm = document.querySelector('.form__input--photo');
const userPhoto = document.querySelector('.form__user-photo');
const resetPasswordForm = document.querySelector('.form--reset-password');

let photo = undefined;
// DELEGATION
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (loginForm)
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (userDataForm)
  userDataForm.addEventListener('submit', async e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', document.getElementById('name').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('photo', photo);

    updateSettings(formData, 'data');
  });

if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );

    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });

if (chooseNewPhotoButton)
  chooseNewPhotoButton.addEventListener('click', e => {
    e.preventDefault();
    const photoUploadInput = document.getElementById('photo-upload-input');
    photoUploadInput.click();
  });

if (inputPhotoForm)
  inputPhotoForm.addEventListener('change', () => {
    photo = inputPhotoForm.files[0];
    if (photo) {
      const reader = new FileReader();
      reader.onload = event => (userPhoto.src = event.target.result);
      reader.readAsDataURL(photo);
    }
  });

if (resetPasswordForm)
  resetPasswordForm.addEventListener('submit', e => {
    e.preventDefault();
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    const token = window.location.pathname
      .split('/')
      .filter(Boolean)
      .pop();

    resetPassword(password, passwordConfirm, token);
  });
