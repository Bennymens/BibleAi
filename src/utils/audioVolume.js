let audioContext = null;
let analyser = null;
let microphone = null;
let dataArray = null;
let isActive = false;

export function startVolumeDetection(callback) {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    console.error("getUserMedia not supported");
    return;
  }

  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then((stream) => {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      analyser = audioContext.createAnalyser();
      microphone = audioContext.createMediaStreamSource(stream);
      microphone.connect(analyser);
      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      dataArray = new Uint8Array(bufferLength);
      isActive = true;

      function detect() {
        if (!isActive) return;
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const average = sum / bufferLength;
        callback(average / 255); // normalize to 0-1
        requestAnimationFrame(detect);
      }
      detect();
    })
    .catch((err) => {
      console.error("Error accessing microphone", err);
    });
}

export function stopVolumeDetection() {
  isActive = false;
  if (audioContext) {
    audioContext.close();
  }
  if (microphone) {
    microphone.disconnect();
  }
}
