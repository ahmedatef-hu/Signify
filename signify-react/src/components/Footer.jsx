const Footer = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3><i className="fas fa-hands"></i> Signfiy</h3>
            <p>جسر فجوة التواصل عبر تقنيات مبتكرة.</p>
          </div>
          <div className="footer-section">
            <h4>روابط سريعة</h4>
            <ul>
              <li><button onClick={() => scrollToSection('home')}>الرئيسية</button></li>
              <li><button onClick={() => scrollToSection('features')}>المميزات</button></li>
              <li><button onClick={() => scrollToSection('learn')}>تعلم</button></li>
              <li><button onClick={() => scrollToSection('about')}>حول</button></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>الموارد</h4>
            <ul>
              <li><a href="#">التوثيق</a></li>
              <li><a href="#">واجهات برمجة التطبيقات</a></li>
              <li><a href="#">الدعم</a></li>
              <li><a href="#">المجتمع</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>تواصل</h4>
            <ul>
              <li><i className="fas fa-envelope"></i> info@signfiy.com</li>
              <li><i className="fas fa-phone"></i> +1 (555) 123-4567</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Signfiy. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
