function api_key(users_apikey) {
    console.log(`API Key set to: ${users_apikey}`);
}

function storage_directory(path_or_url) {
    console.log(`Storage directory set to: ${path_or_url}`);
}

function captureframe() {
        alert("Frame captured,and saved to your device,confirm picture authenticity on lisk signature verifer");
    
}

export { api_key, storage_directory, captureframe };