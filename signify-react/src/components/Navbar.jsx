import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const initialTheme = savedTheme || 'light';
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 100) {
        navbar?.classList.add('scrolled');
        setIsScrolled(true);
      } else {
        navbar?.classList.remove('scrolled');
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <h2><i className="fas fa-hands"></i> Signfiy</h2>
        </div>
        <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <button onClick={() => scrollToSection('home')} className="nav-link">الرئيسية</button>
          </li>
          <li className="nav-item">
            <button onClick={() => scrollToSection('features')} className="nav-link">المميزات</button>
          </li>
          <li className="nav-item">
            <button onClick={() => scrollToSection('sign-to-speech')} className="nav-link">لغة الإشارة إلى صوت</button>
          </li>
          <li className="nav-item">
            <button onClick={() => scrollToSection('speech-to-sign')} className="nav-link">صوت إلى لغة الإشارة</button>
          </li>
          <li className="nav-item">
            <button onClick={() => scrollToSection('learn')} className="nav-link">تعلم</button>
          </li>
          <li className="nav-item">
            <button onClick={() => scrollToSection('about')} className="nav-link">حول</button>
          </li>
        </ul>
        <button
          id="themeToggle"
          onClick={toggleTheme}
          className="theme-toggle"
          aria-label="تبديل الثيم"
        >
          <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
        </button>
        <div
          className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
