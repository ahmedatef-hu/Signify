const Features = () => {
  return (
    <section id="features" className="features">
      <div className="container">
        <h2 className="section-title">أهم المميزات</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-camera"></i>
            </div>
            <h3>التعرف على الإشارة لحظياً</h3>
            <p>تقنيات رؤية حاسوبية متقدمة تتعرف على إشارات لغة الإشارة بدقة عالية في الزمن الحقيقي.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-microphone"></i>
            </div>
            <h3>التعرّف على الكلام</h3>
            <p>تحويل الكلام إلى نص ثم إلى إشارات لغة الإشارة عبر أفاتارات مدعومة بالذكاء الاصطناعي.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-user-astronaut"></i>
            </div>
            <h3>نظام أفاتار ثلاثي الأبعاد</h3>
            <p>أفاتارات ثلاثية الأبعاد تفاعلية تؤدي إشارات لغة الإشارة بحركات وتعبيرات طبيعية.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-language"></i>
            </div>
            <h3>لغات إشارة متعددة</h3>
            <p>دعم لعدة لغات إشارة بما فيها ASL وBSL والعديد من التنويعات الإقليمية الأخرى.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-graduation-cap"></i>
            </div>
            <h3>وضع التعلم</h3>
            <p>ميزات تعليمية لمساعدة المستخدمين على تعلم لغة الإشارة عبر دروس تفاعلية وممارسة.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-mobile-alt"></i>
            </div>
            <h3>متوافق مع الجوال</h3>
            <p>يعمل بسلاسة على جميع الأجهزة: الحاسوب اللوحي والجوال وسطح المكتب للوصول من أي مكان.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
