import { useState, useRef, useCallback } from 'react';

export const useSignToSpeech = () => {
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectedText, setDetectedText] = useState('ابدأ الإشارة لرؤية الترجمة...');
  const [status, setStatus] = useState({ message: 'جاهز', type: 'success' });
  const [isPlaying, setIsPlaying] = useState(false);
  
  const streamRef = useRef(null);
  const detectionIntervalRef = useRef(null);
  const utteranceRef = useRef(null);
  const selectedSignsRef = useRef([]);

  const signWords = [
    'مرحباً', 'شكراً', 'من فضلك', 'مساعدة', 'ماء', 'طعام',
    'نعم', 'لا', 'جيد', 'سيء', 'حب', 'عائلة', 'صديق',
    'عمل', 'منزل', 'مدرسة', 'مستشفى', 'مال', 'وقت'
  ];

  const startCamera = useCallback(async () => {
    try {
      // Check if practice mode is active
      const practiceMode = localStorage.getItem('practiceMode');
      const selectedSignsData = localStorage.getItem('selectedSigns');
      
      if (practiceMode === 'true' && selectedSignsData) {
        selectedSignsRef.current = JSON.parse(selectedSignsData);
        console.log('Practice mode active with signs:', selectedSignsRef.current);
        // Clear practice mode flag
        localStorage.removeItem('practiceMode');
      }
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480 } 
      });
      streamRef.current = stream;
      setStatus({ message: 'جارٍ اكتشاف الإشارات...', type: 'detecting' });
      setIsDetecting(true);

      // Simulate motion detection - any movement triggers the selected sign
      let currentIndex = 0;
      detectionIntervalRef.current = setInterval(() => {
        // If practice mode with selected signs
        if (selectedSignsRef.current.length > 0) {
          const currentSign = selectedSignsRef.current[currentIndex];
          
          // Don't update the text - keep showing the initial message
          // Just play the speech
          if (window.speechSynthesis) {
            const utterance = new SpeechSynthesisUtterance(currentSign.name);
            utterance.lang = 'ar-SA';
            utterance.rate = 0.8;
            utterance.pitch = 1;
            utterance.volume = 1;
            window.speechSynthesis.speak(utterance);
            console.log('🔊 قول:', currentSign.name);
          }
          
          // Move to next sign
          currentIndex = (currentIndex + 1) % selectedSignsRef.current.length;
        } else {
          // Normal random detection (no practice mode)
          const randomWord = signWords[Math.floor(Math.random() * signWords.length)];
          setDetectedText(randomWord);
        }
      }, 4000); // Every 4 seconds = simulating motion detection

      return stream;
    } catch (error) {
      console.error('Camera error:', error);
      setStatus({ message: 'فشل الوصول للكاميرا', type: 'error' });
      throw error;
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (detectionIntervalRef.current) {
      clearInterval(detectionIntervalRef.current);
      detectionIntervalRef.current = null;
    }

    setIsDetecting(false);
    
    // Show practiced signs after stopping (names only)
    if (selectedSignsRef.current.length > 0) {
      const signsList = selectedSignsRef.current.map(s => s.name).join(' - ');
      setDetectedText(signsList);
      setStatus({ message: `تم إيقاف الكاميرا`, type: 'success' });
      
      // Clear selected signs after showing
      selectedSignsRef.current = [];
      localStorage.removeItem('selectedSigns');
    } else {
      setDetectedText('تم إيقاف الكاميرا');
      setStatus({ message: 'تم إيقاف الكاميرا', type: 'error' });
    }
  }, []);

  const playSpeech = useCallback(() => {
    if (!window.speechSynthesis) return;

    const text = detectedText;
    
    if (utteranceRef.current) {
      window.speechSynthesis.cancel();
    }

    utteranceRef.current = new SpeechSynthesisUtterance(text);
    utteranceRef.current.lang = 'ar-SA';
    utteranceRef.current.rate = 0.8;
    utteranceRef.current.pitch = 1;
    utteranceRef.current.volume = 1;

    utteranceRef.current.onstart = () => setIsPlaying(true);
    utteranceRef.current.onend = () => setIsPlaying(false);

    window.speechSynthesis.speak(utteranceRef.current);
  }, [detectedText]);

  return {
    isDetecting,
    detectedText,
    status,
    isPlaying,
    startCamera,
    stopCamera,
    playSpeech
  };
};
