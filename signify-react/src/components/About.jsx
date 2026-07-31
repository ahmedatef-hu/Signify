const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">حول Signfiy</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              تعد Signfiy منصة مبتكرة صُممت لجسر فجوة التواصل بين الصم وضعاف السمع والمجتمع السامع.
              مهمتنا هي خلق عالم أكثر شمولاً من خلال التكنولوجيا.
            </p>
            <p>
              باستخدام الذكاء الاصطناعي المتقدم ورؤية الحاسوب ومعالجة اللغة الطبيعية، نقدم خدمات ترجمة فورية
              تجعل التواصل متاحاً وطبيعياً للجميع.
            </p>
            <div className="stats">
              <div className="stat">
                <h3>95%</h3>
                <p>معدل الدقة</p>
              </div>
              <div className="stat">
                <h3>50+</h3>
                <p>لغات الإشارة</p>
              </div>
              <div className="stat">
                <h3>1M+</h3>
                <p>مستخدمون حول العالم</p>
              </div>
            </div>
          </div>
          <div className="about-visual">
            <div className="accessibility-symbols">
              <div className="symbol">
                <i className="fas fa-universal-access"></i>
                <span>إمكانية الوصول</span>
              </div>
              <div className="symbol">
                <i className="fas fa-heart"></i>
                <span>الشمول</span>
              </div>
              <div className="symbol">
                <i className="fas fa-globe"></i>
                <span>انتشار عالمي</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
