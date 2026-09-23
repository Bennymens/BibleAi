const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = null;
let isActive = false;      // true = we want the mic running
let isStarting = false;    // true = start() was called, waiting for onstart
let pendingCallback = null;

if (SpeechRecognition) {
  recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "en-US";
  recognition.maxAlternatives = 1;

  recognition.onresult = (event) => {
    if (!pendingCallback) return;

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

    if (finalTranscript) {
      pendingCallback(finalTranscript.trim(), "");
    } else if (interimTranscript) {
      pendingCallback("", interimTranscript.trim());
    }
  };

  recognition.onstart = () => {
    isStarting = false;
  };

  recognition.onend = () => {
    isStarting = false;
    // Auto-restart only if we still want to be active
    if (isActive) {
      // Small delay to avoid tight loops on some browsers
      setTimeout(() => {
        if (isActive && !isStarting) {
          try {
            isStarting = true;
            recognition.start();
          } catch (err) {
            isStarting = false;
            console.warn("Restart failed:", err);
          }
        }
      }, 100);
    }
  };

  recognition.onerror = (event) => {
    isStarting = false;
    // These are not real errors — ignore them
    const ignorable = ["aborted", "no-speech"];
    if (ignorable.includes(event.error)) {
      // For no-speech: onend will fire and we'll auto-restart anyway
      return;
    }
    console.error("Speech recognition error:", event.error);
    if (isActive) {
      setTimeout(() => {
        if (isActive && !isStarting) {
          try {
            isStarting = true;
            recognition.start();
          } catch (err) {
            isStarting = false;
          }
        }
      }, 300);
    }
  };
}

export function startListening(callback) {
  if (!recognition) {
    console.error("Speech recognition not supported");
    return;
  }

  pendingCallback = callback;

  // Already running with a valid callback — just swap the callback, don't restart
  if (isActive) return;

  // Fresh start
  isActive = true;
  isStarting = true;

  try {
    recognition.start();
  } catch (err) {
    // If it was already started (e.g. stale state), abort and retry
    isStarting = false;
    try {
      recognition.abort();
    } catch (_) {}
    setTimeout(() => {
      if (isActive && !isStarting) {
        try {
          isStarting = true;
          recognition.start();
        } catch (e) {
          isStarting = false;
          console.warn("Failed to start after abort:", e);
        }
      }
    }, 200);
  }
}

export function stopListening() {
  if (!recognition) return;
  isActive = false;
  isStarting = false;
  pendingCallback = null;
  try {
    recognition.abort();
  } catch (err) {
    console.warn("Stop failed:", err);
  }
}
