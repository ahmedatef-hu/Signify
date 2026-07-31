const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            جسر <span className="highlight">فجوة التواصل</span>
          </h1>
          <h2 className="hero-subtitle">من لغة الإشارة إلى الصوت والعكس</h2>
          <p className="hero-description">
            منصة ثورية مدعومة بالذكاء الاصطناعي لترجمة لغة الإشارة إلى صوت 
            وتحويل الصوت إلى أفاتار بلغة الإشارة، لجعل التواصل متاحاً للجميع.
          </p>
          <div className="hero-buttons">
            <button onClick={() => scrollToSection('sign-to-speech')} className="btn btn-primary">
              <i className="fas fa-video"></i> ابدأ الإشارة
            </button>
            <button onClick={() => scrollToSection('speech-to-sign')} className="btn btn-secondary">
              <i className="fas fa-microphone"></i> ابدأ التحدث
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="communication-flow" style={{ marginTop: '20px' }}>
            <div className="flow-item">
              <div className="flow-icon">
                <i className="fas fa-hands"></i>
              </div>
              <span>لغة الإشارة</span>
            </div>
            <div className="flow-arrow">
              <i className="fas fa-exchange-alt"></i>
            </div>
            <div className="flow-item">
              <div className="flow-icon">
                <i className="fas fa-volume-up"></i>
              </div>
              <span>الصوت</span>
            </div>
          </div>
          <div className="ai-badge">
            <i className="fas fa-brain"></i>
            <span>مدعوم بالذكاء الاصطناعي</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
