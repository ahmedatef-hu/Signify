import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Practice = () => {
  return (
    <>
      <Navbar />
      
      <main className="container" style={{ paddingTop: '120px', paddingBottom: '60px' }}>
        <h1 className="section-title">وضع الممارسة</h1>
        <p className="about-text" style={{ marginTop: '1rem' }}>
          اختبر معرفتك من خلال اختبارات تفاعلية وتمارين التعرف على الإيماءات.
        </p>

        <section className="learn" style={{ marginTop: '2rem' }}>
          <div className="learning-grid">
            <div className="learning-card">
              <div className="learning-icon"><i className="fas fa-spell-check"></i></div>
              <h3>اختبار سريع</h3>
              <p>أسئلة سريعة على الإشارات الأساسية.</p>
            </div>
            <div className="learning-card">
              <div className="learning-icon"><i className="fas fa-camera"></i></div>
              <h3>تعرّف على الإشارة</h3>
              <p>مرّن الكاميرا للتعرّف على إشاراتك.</p>
            </div>
            <div className="learning-card">
              <div className="learning-icon"><i className="fas fa-trophy"></i></div>
              <h3>تحديات</h3>
              <p>ارفع مستواك عبر تحديات أسبوعية.</p>
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

export default Practice;
