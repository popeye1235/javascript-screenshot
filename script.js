const screenshotBtn = document.querySelector("#src-btn")
screenshotPreview = document.querySelector(".src-preview")
closeButton = screenshotPreview.querySelector("#close-btn")
const captureSaveButton = screenshotPreview.querySelector("#capture-save-btn");



const captureScreen = async () => {
    try {
        // asking permission to use a media input to record current tab
        const stream = await navigator.mediaDevices.getDisplayMedia({ preferCurrentTab: true });
        const video = document.createElement("video");
        video.addEventListener("loadedmetadata", () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            // passing video weight & height as canvas width and height 
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            video.play();
            // drawing an image from the captured video stream
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            console.log(canvas);
            stream.getVideoTracks()[0].stop(); //terminating first video track of the stream
            // passing canvas data Url as screenshot preview src
            screenshotPreview.querySelector("img").src = canvas.toDataURL();
            screenshotPreview.classList.add("show");
        })
        video.srcObject = stream; //passing capture stream data as video source object
    } catch (error) { // if image couldn't capture by any reason, then alert the msg
        alert("Failed to capture screenshot!!")
    }
};

const saveScreenshot = () => {
  const imgSrc = screenshotPreview.querySelector("img").src;
  const link = document.createElement("a");
  link.href = imgSrc;
  link.download = "screenshot.png";
  link.click();
};

closeButton.addEventListener("click", () => screenshotPreview.classList.toggle("show"))
screenshotBtn.addEventListener("click", captureScreen);
captureSaveButton.addEventListener("click", saveScreenshot);
