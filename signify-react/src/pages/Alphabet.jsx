import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Alphabet = () => {
  return (
    <>
      <Navbar />
      
      <main className="container" style={{ paddingTop: '120px', paddingBottom: '60px' }}>
        <h1 className="section-title">الحروف الأساسية</h1>
        <p className="about-text" style={{ marginTop: '1rem' }}>
          تعلم أساسيات أبجدية لغة الإشارة مع عروض تفاعلية.
        </p>

        <section className="learn" style={{ marginTop: '2rem' }}>
          <div className="learning-grid">
            <div className="learning-card">
              <div className="learning-icon"><i className="fas fa-a"></i></div>
              <h3>أ</h3>
              <p>شكل اليد والإشارة لحرف الألف.</p>
            </div>
            <div className="learning-card">
              <div className="learning-icon"><i className="fas fa-b"></i></div>
              <h3>ب</h3>
              <p>شكل اليد والإشارة لحرف الباء.</p>
            </div>
            <div className="learning-card">
              <div className="learning-icon"><i className="fas fa-c"></i></div>
              <h3>ت</h3>
              <p>شكل اليد والإشارة لحرف التاء.</p>
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

export default Alphabet;
