import { useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Learn from '../components/Learn';
import About from '../components/About';
import Footer from '../components/Footer';
import { useSignToSpeech } from '../hooks/useSignToSpeech';
import { useSpeechToSign } from '../hooks/useSpeechToSign';
import { useAvatar } from '../hooks/useAvatar';
import { signConverter } from '../utils/signLanguageConverter';

const Home = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const textInputRef = useRef(null);
  
  const { 
    isDetecting, 
    detectedText, 
    status, 
    isPlaying,
    startCamera, 
    stopCamera, 
    playSpeech 
  } = useSignToSpeech();

  const {
    isListening,
    recognizedText,
    currentAnimation,
    startListening,
    stopListening,
    convertTextToSign
  } = useSpeechToSign((text) => {
    const signType = signConverter.textToSign(text);
    playSignAnimation(signType);
  });

  const { avatarStatus, playSignAnimation } = useAvatar(canvasRef);

  const handleStartCamera = async () => {
    try {
      const stream = await startCamera();
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Failed to start camera:', error);
    }
  };

  const handleStopCamera = () => {
    stopCamera();
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const handleConvertText = () => {
    const text = textInputRef.current?.value;
    if (text) {
      convertTextToSign(text);
      const signType = signConverter.textToSign(text);
      playSignAnimation(signType);
    }
  };

  // Auto-play animation when speech is recognized
  const handleRecognizedText = (text) => {
    const signType = signConverter.textToSign(text);
    playSignAnimation(signType);
  };

  const handleSignButtonClick = (signType) => {
    playSignAnimation(signType);
  };

  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      
      {/* Sign to Speech Section */}
      <section id="sign-to-speech" className="sign-to-speech">
        <div className="container">
          <h2 className="section-title">ترجمة لغة الإشارة إلى صوت</h2>
          <div className="translation-container">
            <div className="camera-section">
              <div className="camera-preview">
                <video ref={videoRef} autoPlay muted></video>
                <div className="camera-overlay">
                  <div className="detection-box"></div>
                  <div className="status-indicator">
                    <i className="fas fa-circle" style={{ 
                      color: status.type === 'success' ? '#4ade80' : 
                             status.type === 'error' ? '#ef4444' : 
                             status.type === 'detecting' ? '#3b82f6' : '#f59e0b'
                    }}></i>
                    <span>{status.message}</span>
                  </div>
                </div>
              </div>
              <div className="camera-controls">
                <button 
                  onClick={handleStartCamera}
                  disabled={isDetecting}
                  className="btn btn-primary btn-play" 
                  aria-label="بدء الكاميرا"
                >
                  <i className="fas fa-play fa-lg"></i> ابدأ
                </button>
                <button 
                  onClick={handleStopCamera}
                  disabled={!isDetecting}
                  className="btn btn-secondary btn-stop" 
                  aria-label="إيقاف الكاميرا"
                >
                  <i className="fas fa-stop fa-lg"></i> توقف
                </button>
                <button 
                  disabled={!isDetecting}
                  className="btn btn-accent" 
                  aria-label="التقاط الإشارة"
                >
                  <i className="fas fa-hand-paper fa-lg"></i> التقاط
                </button>
              </div>
              <div style={{ textAlign: 'center', marginTop: '15px' }}>
                <a href="/sign-guide" target="_blank" rel="noopener noreferrer" style={{ color: '#667eea', textDecoration: 'none', fontWeight: 600, display: 'inline-block', margin: '5px 10px', fontSize: '1.1em' }}>
                  <i className="fas fa-book-open"></i> دليل الإشارات
                </a>
              </div>
            </div>
            <div className="translation-output">
              <div className="output-section">
                <h3>النص المُكتشف</h3>
                <div className="text-output">
                  {detectedText}
                </div>
              </div>
              <div className="output-section">
                <h3>مخرج الصوت</h3>
                <div className="speech-controls">
                  <button 
                    onClick={playSpeech}
                    disabled={!isDetecting && detectedText === 'ابدأ الإشارة لرؤية الترجمة...'}
                    className="btn btn-primary btn-play" 
                    aria-label="تشغيل الصوت"
                  >
                    <i className={`fas fa-${isPlaying ? 'pause' : 'volume-up'} fa-lg`}></i> {isPlaying ? 'إيقاف' : 'ابدأ'}
                  </button>
                  <button 
                    disabled
                    className="btn btn-secondary" 
                    aria-label="تنزيل الصوت"
                  >
                    <i className="fas fa-download fa-lg"></i> تنزيل
                  </button>
                </div>
                <div className={`audio-visualizer ${isPlaying ? 'playing' : ''}`}>
                  <div className="sound-wave"></div>
                  <div className="sound-wave"></div>
                  <div className="sound-wave"></div>
                  <div className="sound-wave"></div>
                  <div className="sound-wave"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Speech to Sign Section */}
      <section id="speech-to-sign" className="speech-to-sign">
        <div className="container">
          <h2 className="section-title">ترجمة الصوت إلى لغة الإشارة</h2>
          <div className="translation-container reverse">
            <div className="avatar-section">
              <canvas ref={canvasRef} style={{ width: '100%', height: '500px', display: 'block' }}></canvas>
              <div className="avatar-status" style={{ position: 'absolute', top: '15px', left: '15px', background: 'rgba(255, 255, 255, 0.9)', padding: '0.5rem 1rem', borderRadius: '20px' }}>
                <i className="fas fa-circle" style={{ color: '#4ade80' }}></i>
                <span>{avatarStatus}</span>
              </div>
              <div className="avatar-controls">
                <button 
                  onClick={startListening}
                  disabled={isListening}
                  className="btn btn-primary btn-play" 
                  aria-label="بدء الاستماع"
                >
                  <i className="fas fa-microphone fa-lg"></i> ابدأ الاستماع
                </button>
                <button 
                  onClick={stopListening}
                  disabled={!isListening}
                  className="btn btn-secondary btn-stop" 
                  aria-label="إيقاف الاستماع"
                >
                  <i className="fas fa-stop fa-lg"></i> توقف
                </button>
                <button 
                  onClick={() => playSignAnimation('hello')}
                  className="btn btn-accent" 
                  aria-label="تحريك الأفاتار"
                >
                  <i className="fas fa-play-circle fa-lg"></i> تجربة
                </button>
              </div>
              <div className="sign-dictionary">
                <h4>إشارات سريعة</h4>
                <div className="sign-buttons">
                  <button onClick={() => handleSignButtonClick('hello')} className="sign-btn">مرحباً 👋</button>
                  <button onClick={() => handleSignButtonClick('thank-you')} className="sign-btn">شكراً 🙏</button>
                  <button onClick={() => handleSignButtonClick('please')} className="sign-btn">من فضلك 🤲</button>
                  <button onClick={() => handleSignButtonClick('yes')} className="sign-btn">نعم 👍</button>
                  <button onClick={() => handleSignButtonClick('no')} className="sign-btn">لا 👎</button>
                  <button onClick={() => handleSignButtonClick('help')} className="sign-btn">مساعدة 🆘</button>
                </div>
              </div>
            </div>
            <div className="speech-input">
              <div className="input-section">
                <h3>مدخل الصوت</h3>
                <div className={`microphone-visualizer ${isListening ? 'listening' : ''}`}>
                  <div 
                    className={`mic-circle ${isListening ? 'active' : ''}`}
                    onClick={() => isListening ? stopListening() : startListening()}
                    style={{ cursor: 'pointer' }}
                  >
                    <i className="fas fa-microphone"></i>
                  </div>
                  <div className="sound-rings">
                    <div className="ring"></div>
                    <div className="ring"></div>
                    <div className="ring"></div>
                  </div>
                </div>
                <div className="recognition-status">
                  {recognizedText}
                </div>
              </div>
              <div className="input-section">
                <h3>مدخل النص</h3>
                <textarea 
                  ref={textInputRef}
                  className="text-input-area"
                  placeholder="اكتب رسالتك هنا لتحويلها إلى لغة الإشارة..."
                ></textarea>
                <button 
                  onClick={handleConvertText}
                  className="btn btn-primary btn-play" 
                  aria-label="تحويل إلى الإشارة"
                >
                  <i className="fas fa-hands fa-lg"></i> ابدأ
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Learn />
      <About />
      <Footer />
    </>
  );
};

export default Home;
