import { api_key, storage_directory, captureframe } from './ls.js';

document.addEventListener('DOMContentLoaded', () => {
    const apiKey = "your_api_key_here";
    const storageDir = "your_storage_directory_here";

    api_key(apiKey);
    storage_directory(storageDir);

    const captureButton = document.getElementById('captureButton');
    captureButton.addEventListener('click', captureframe);
});


//camera stream
const video = document.getElementById('camera-stream');

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      video.srcObject = stream;
    })
    .catch(error => {
      console.error('Error accessing camera:', error);
    });
} else {
  console.error('Your browser does not support getUserMedia');
}


