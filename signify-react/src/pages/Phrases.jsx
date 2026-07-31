import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Phrases = () => {
  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-SA';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <>
      <Navbar />
      
      <main className="container" style={{ paddingTop: '120px', paddingBottom: '60px' }}>
        <h1 className="section-title">عبارات شائعة</h1>
        <p className="about-text" style={{ marginTop: '1rem' }}>
          أتقن العبارات اليومية والتعبيرات المستخدمة في التواصل بلغة الإشارة.
        </p>

        <section className="learn" style={{ marginTop: '2rem' }}>
          <div className="learning-grid">
            <div className="learning-card">
              <div className="learning-icon"><i className="fas fa-handshake"></i></div>
              <h3>مرحباً</h3>
              <p>كيفية أداء إشارة الترحيب.</p>
            </div>
            <div className="learning-card">
              <div className="learning-icon" style={{ position: 'relative' }}>
                <img 
                  src="https://img.icons8.com/ios-filled/100/000000/person-in-suit.png" 
                  alt="شخص في بدلة" 
                  style={{ width: '64px', height: '64px', objectFit: 'contain' }} 
                />
                <button 
                  onClick={() => speakText('مرحباً، كيف حالكم اليوم؟')} 
                  className="audio-button" 
                  aria-label="تشغيل الصوت"
                >
                  <i className="fas fa-volume-up"></i>
                </button>
              </div>
              <h3>أفتراضي</h3>
              <p>صورة شخصية افتراضية</p>
            </div>
            <div className="learning-card">
              <div className="learning-icon"><i className="fas fa-heart"></i></div>
              <h3>شكراً</h3>
              <p>كيفية أداء إشارة الشكر والامتنان.</p>
            </div>
            <div className="learning-card">
              <div className="learning-icon"><i className="fas fa-question"></i></div>
              <h3>من فضلك</h3>
              <p>كيفية أداء إشارة الطلب باحترام.</p>
            </div>
          </div>
        </section>

        <div style={{ marginTop: '2rem' }}>
          <Link to="/#learn" className="btn btn-secondary">
            <i className="fas fa-arrow-right"></i> الرجوع لقسم التعلم
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Phrases;
