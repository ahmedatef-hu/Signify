import { Link } from 'react-router-dom';

const Learn = () => {
  return (
    <section id="learn" className="learn">
      <div className="container">
        <h2 className="section-title">تعلم لغة الإشارة</h2>
        <div className="learning-grid">
          <div className="learning-card">
            <div className="learning-icon">
              <i className="fas fa-book"></i>
            </div>
            <h3>الحروف الأساسية</h3>
            <p>تعلم أساسيات أبجدية لغة الإشارة مع عروض تفاعلية.</p>
            <Link to="/alphabet" className="btn btn-primary">ابدأ التعلم</Link>
          </div>
          <div className="learning-card">
            <div className="learning-icon">
              <i className="fas fa-comments"></i>
            </div>
            <h3>عبارات شائعة</h3>
            <p>أتقن العبارات اليومية والتعبيرات المستخدمة في التواصل بلغة الإشارة.</p>
            <Link to="/phrases" className="btn btn-primary">ابدأ التعلم</Link>
          </div>
          <div className="learning-card">
            <div className="learning-icon">
              <i className="fas fa-gamepad"></i>
            </div>
            <h3>وضع الممارسة</h3>
            <p>اختبر معرفتك من خلال اختبارات تفاعلية وتمارين التعرف على الإيماءات.</p>
            <Link to="/practice" className="btn btn-primary">ابدأ الممارسة</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Learn;
