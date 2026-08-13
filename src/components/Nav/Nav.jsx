import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import vietnamFlag from "../../assets/flag-for-flag-vietnam-svgrepo-com.svg";
import chinaFlag from "../../assets/flag-for-flag-china-svgrepo-com.svg";
import "./Nav.css";
import { useTranslation } from 'react-i18next';

function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState(i18n.language === 'zh' ? 'CN' : 'VN');

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest || !document) return;
      if (!e.target.closest('.lang-dropdown')) {
        setIsOpen(false);
      }
      if (!e.target.closest('.hamburger') && !e.target.closest('.navbar-center')) {
        setIsMenuOpen(false);
      }
    };

    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const handleSelect = (code) => {
    setSelectedLang(code);
    setIsOpen(false);
    if (code === 'VN') i18n.changeLanguage('vi');
    if (code === 'CN') i18n.changeLanguage('zh');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  if (location.pathname === "/projectdetail") return null;
  if (location.pathname === "/about") return null;
  if (location.pathname === "/memberCards") return null;
  if (location.pathname === "/contactUs") return null;
  if (location.pathname === "/*") return null;
  if (location.pathname === "/login") return null;
  if (location.pathname === "/register") return null;
  if (location.pathname === "/admin") return null;
  if (location.pathname === "/admin/addProject") return null;
  if (location.pathname.startsWith("/admin/UpdateProjectAD")) return null;
  return (
    <>
      <div className="header-container">
        <nav className={`nav-bar ${isScrolled ? "nav-bar--scrolled" : ""}`}>
          <div className="navbar-left">
            <a href="#" className="logo" aria-label="TPMedia logo"></a>
          </div>
          <button
            className="hamburger"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className={`navbar-center ${isMenuOpen ? 'navbar-center--open' : ''}`}>
              <ul className="nav-links">
              <li>
                <Link to="/projects" onClick={() => setIsMenuOpen(false)}>{t('nav.projects')}</Link>
              </li>
              <li>
                <Link to="/about" onClick={() => setIsMenuOpen(false)}>{t('nav.about')}</Link>
              </li>
              <li>
                <Link to="/memberCards" onClick={() => setIsMenuOpen(false)}>{t('nav.members')}</Link>
              </li>
              <li>
                <Link to="/contactUs" onClick={() => setIsMenuOpen(false)}>{t('nav.contact')}</Link>
              </li>
            </ul>
          </div>
          <div className="navbar-right">
            <div className="lang-dropdown">
              <button
                className="lang-button"
                onClick={() => setIsOpen((v) => !v)}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
              >
                <span className="flag">
                  <img
                    src={selectedLang === "VN" ? vietnamFlag : chinaFlag}
                    alt={selectedLang === "VN" ? "Vietnam flag" : "China flag"}
                  />
                </span>
                <span className="code">{selectedLang}</span>
                <span className="caret">▾</span>
              </button>

              {isOpen && (
                <ul className="dropdown" role="listbox">
                  <li
                    className={`dropdown-item ${selectedLang === "VN" ? "active" : ""}`}
                    onClick={() => handleSelect("VN")}
                    role="option"
                    aria-selected={selectedLang === "VN"}
                  >
                    <span className="flag">
                      <img src={vietnamFlag} alt="Vietnam flag" />
                    </span>
                    VN
                  </li>
                  <li
                    className={`dropdown-item ${selectedLang === "CN" ? "active" : ""}`}
                    onClick={() => handleSelect("CN")}
                    role="option"
                    aria-selected={selectedLang === "CN"}
                  >
                    <span className="flag">
                      <img src={chinaFlag} alt="China flag" />
                    </span>
                    CN
                  </li>
                </ul>
              )}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Nav;
