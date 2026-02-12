const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = null;
let isListening = false;
let isStarting = false;
let onResultCallback = null;

if (SpeechRecognition) {
  recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "en-US";

  recognition.onresult = (event) => {
    let finalTranscript = "";
    let interimTranscript = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const result = event.results[i];
      if (result.isFinal) {
        finalTranscript += result[0].transcript;
      } else {
        interimTranscript += result[0].transcript;
      }
    }
    if (finalTranscript && onResultCallback) {
      onResultCallback(finalTranscript, interimTranscript);
    } else if (interimTranscript && onResultCallback) {
      onResultCallback("", interimTranscript);
    }
  };

  recognition.onstart = () => {
    isStarting = false;
  };

  recognition.onend = () => {
    isStarting = false;
    if (isListening && !isStarting) {
      try {
        isStarting = true;
        recognition.start();
      } catch (err) {
        console.error("Failed to restart recognition:", err);
        isStarting = false;
      }
    }
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error", event.error);
    isStarting = false;

    // Don't retry on certain errors
    if (event.error === "aborted" || event.error === "no-speech") {
      return;
    }

    // For "already started" error, just ignore it
    if (event.error === "already-started") {
      return;
    }

    if (isListening && !isStarting) {
      setTimeout(() => {
        if (isListening && !isStarting) {
          try {
            isStarting = true;
            recognition.start();
          } catch (err) {
            console.error("Failed to restart after error:", err);
            isStarting = false;
          }
        }
      }, 1000);
    }
  };
}

export function startListening(callback) {
  if (!recognition) {
    console.error("Speech recognition not supported");
    return;
  }
  onResultCallback = callback;
  if (!isListening && !isStarting) {
    isListening = true;
    isStarting = true;
    try {
      recognition.start();
    } catch (err) {
      console.error("Failed to start recognition:", err);
      isStarting = false;
      isListening = false;
    }
  }
}

export function stopListening() {
  if (recognition && isListening) {
    isListening = false;
    isStarting = false;
    try {
      recognition.stop();
    } catch (err) {
      console.error("Failed to stop recognition:", err);
    }
  }
}
