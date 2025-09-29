import React, { useEffect, useState } from "react";
import { Mic, Square } from "lucide-react";
import { voice } from "@/utils/voice";

interface MicButtonProps {
  onTranscript?: (text: string) => void;
}

const MicButton: React.FC<MicButtonProps> = ({ onTranscript }) => {
  const [listening, setListening] = useState(false);

  useEffect(() => {
    // Keep UI in sync if voice stops automatically
    const i = setInterval(() => setListening(voice.isListening()), 200);
    return () => clearInterval(i);
  }, []);

  const toggle = () => {
    if (listening) {
      voice.stop();
      setListening(false);
    } else {
      const ok = voice.start(onTranscript);
      setListening(ok);
    }
  };

  return (
    <button
      aria-label={listening ? "Stop listening" : "Start listening"}
      onClick={toggle}
      className={`
        inline-flex items-center justify-center rounded-full shadow-lg
        w-16 h-16 sm:w-16 sm:h-16
        text-white
        transition-all duration-200
        ${listening ? "bg-red-600 scale-95" : "bg-primary hover:scale-105"}
        ring-4 ring-primary/20
      `}
      style={{
        boxShadow:
          "0 14px 24px rgba(22,101,52,0.22), 0 8px 8px rgba(22,101,52,0.18)",
      }}
    >
      {listening ? <Square className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
    </button>
  );
};

export default MicButton;
