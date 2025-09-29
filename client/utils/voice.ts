export type VoiceListener = (text: string) => void;

class VoiceController {
  private recognition: any = null;
  private listening = false;
  private onResult: VoiceListener | null = null;

  constructor() {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SR) {
      this.recognition = new SR();
      this.recognition.lang = (localStorage.getItem("km_lang") === "ml" ? "ml-IN" : "en-IN");
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.onresult = (e: any) => {
        let transcript = "";
        for (let i = e.resultIndex; i < e.results.length; i++) {
          transcript += e.results[i][0].transcript;
        }
        if (this.onResult) this.onResult(transcript.trim());
      };
      this.recognition.onend = () => {
        this.listening = false;
      };
    }
  }

  start(onResult?: VoiceListener) {
    if (!this.recognition || this.listening) return false;
    if (onResult) this.onResult = onResult;
    try {
      this.listening = true;
      this.recognition!.start();
      if (navigator.vibrate) navigator.vibrate(10);
      return true;
    } catch {
      this.listening = false;
      return false;
    }
  }

  stop() {
    if (!this.recognition || !this.listening) return;
    this.recognition.stop();
    this.listening = false;
    if (navigator.vibrate) navigator.vibrate(5);
  }

  isListening() {
    return this.listening;
  }
}

export const voice = new VoiceController();
