/* eslint-disable */
import '@babel/polyfill';
import { displayMap } from './mapbox';
import { login, logout } from './login';
import { updateSettings } from './updateSettings';

// DOM ELEMENTS
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const chooseNewPhotoButton = document.querySelector('.btn-text');
// const inputPhotoForm = document.querySelector('.form__input--photo');

// let photo = undefined;

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
  userDataForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    updateSettings({ name, email }, 'data');
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

// if (inputPhotoForm) {
//   inputPhotoForm.addEventListener('change', e => {
//     // e.preventDefault();

//     const selectedFile = inputPhotoForm.files[0]; // Get the selected file

//     // Create a new FileReader object
//     const reader = new FileReader();

//     // Set up event handler for when the file has been loaded
//     reader.onload = function(event) {
//       // The result property contains the file data as a data URL
//       photo = event.target.result;

//       // You can process the file data URL here, or use it as needed
//       // console.log('File data URL:', fileDataUrl);
//     };

//     // Read the file as a data URL (this will read the entire file into memory)
//     reader.readAsDataURL(selectedFile);
//   });
// }
