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
  // maxAlternatives = 1 (default) — keeps the best result
  recognition.maxAlternatives = 1;

  recognition.onresult = (event) => {
    let finalTranscript = "";
    let interimTranscript = "";

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const result = event.results[i];
      const text = result[0].transcript;
      if (result.isFinal) {
        finalTranscript += text;
      } else {
        interimTranscript += text;
      }
    }

    if (!onResultCallback) return;

    if (finalTranscript) {
      onResultCallback(finalTranscript.trim(), "");
    } else if (interimTranscript) {
      onResultCallback("", interimTranscript.trim());
    }
  };

  recognition.onstart = () => {
    isStarting = false;
  };

  recognition.onend = () => {
    isStarting = false;
    // Only auto-restart if we explicitly want to keep listening
    if (isListening) {
      try {
        isStarting = true;
        recognition.start();
      } catch (err) {
        console.warn("Failed to restart recognition:", err);
        isStarting = false;
      }
    }
  };

  recognition.onerror = (event) => {
    isStarting = false;
    const ignorable = ["aborted", "no-speech", "already-started"];
    if (ignorable.includes(event.error)) return;
    console.error("Speech recognition error:", event.error);

    if (isListening) {
      setTimeout(() => {
        if (isListening && !isStarting) {
          try {
            isStarting = true;
            recognition.start();
          } catch (err) {
            console.warn("Failed to restart after error:", err);
            isStarting = false;
          }
        }
      }, 500);
    }
  };
}

export function startListening(callback) {
  if (!recognition) {
    console.error("Speech recognition not supported");
    return;
  }

  // If already active, stop it first so we get a completely fresh session
  if (isListening || isStarting) {
    isListening = false;
    isStarting = false;
    try {
      recognition.abort(); // abort (not stop) so onend fires but won't restart
    } catch (_) {}
  }

  onResultCallback = callback;
  isListening = true;
  isStarting = true;
  try {
    recognition.start();
  } catch (err) {
    console.warn("Failed to start recognition:", err);
    isStarting = false;
    isListening = false;
  }
}

export function stopListening() {
  if (!recognition) return;
  isListening = false;
  isStarting = false;
  onResultCallback = null;
  try {
    recognition.abort(); // abort immediately; no restart will happen
  } catch (err) {
    console.warn("Failed to stop recognition:", err);
  }
}
