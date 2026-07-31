import { useState, useRef, useCallback, useEffect } from 'react';

export const useSpeechToSign = (onRecognized) => {
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState('اضغط "ابدأ الاستماع" للبدء...');
  const [currentAnimation, setCurrentAnimation] = useState(null);
  
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (currentAnimation && onRecognized) {
      onRecognized(currentAnimation);
    }
  }, [currentAnimation, onRecognized]);

  const startListening = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('المتصفح لا يدعم التعرف على الصوت');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = 'ar-SA';
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;

    recognitionRef.current.onstart = () => {
      setIsListening(true);
      setRecognizedText('الاستماع...');
    };

    recognitionRef.current.onresult = (event) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      if (finalTranscript) {
        setRecognizedText(finalTranscript);
        setCurrentAnimation(finalTranscript);
      } else if (interimTranscript) {
        setRecognizedText(interimTranscript + '...');
      }
    };

    recognitionRef.current.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      setRecognizedText('حدث خطأ في التعرف على الصوت');
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };

    try {
      recognitionRef.current.start();
    } catch (error) {
      console.error('Failed to start recognition:', error);
      setIsListening(false);
    }
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, []);

  const convertTextToSign = useCallback((text) => {
    if (!text.trim()) return;
    setCurrentAnimation(text);
  }, []);

  return {
    isListening,
    recognizedText,
    currentAnimation,
    startListening,
    stopListening,
    convertTextToSign
  };
};
