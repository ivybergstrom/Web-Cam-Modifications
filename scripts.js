const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');


function getVideo() {
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
    .then(localMediaStream => {
        console.log(localMediaStream);

        video.srcObject = localMediaStream;
        video.play();
    })
    .catch(err => {
        console.error(`Web camera access is not enabled. To resolve, reload the page and allow access.`, err);
    });
}



function paintToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;

    setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        let pixels = ctx.getImageData(0, 0, width, height);
        pixels = redEffect(pixels);
        ctx.putImageData(pixels, 0, 0);
       }, 16);
       console.log(pixels);
}

function takePhoto() {
snap.currentTime = 0;
snap.play();

const data = canvas.toDataURL('image/jpeg');
const link = document.createElement('a');
link.href = data;
link.setAttribute('download', 'handsome');
link.innerHTML = `<img src"${data}" alt="Looking good">`;
strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) {
    for(let i = 0; i < pixels.data.length; i+=4) {
        pixels.data[i] = pixels.data[i+0] +200;  //r
        pixels.data[ i + 1] = pixels.data[i + 1] -50;//g
        pixels[i + 2] = pixels.data[i + 2] *50;//b

    }
    return pixels;
}

function rgbSplit(pixels){
    for(let i = 0; i < pixels.data.length; i+=4) {
        pixels.data[i -150] = pixels.data[i+0]  //r
        pixels.data[ i + 100] = pixels.data[i + 1]//g
        pixels[i - 150] = pixels.data[i + 2]//b

    }
    return pixels;
}



getVideo();



video.addEventListener('canplay', paintToCanvas);
