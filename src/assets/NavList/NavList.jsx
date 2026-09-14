import "./NavList.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";

import vietnamFlag from "../../assets/flag-for-flag-vietnam-svgrepo-com.svg";
import chinaFlag from "../../assets/flag-for-flag-china-svgrepo-com.svg";

function NavList() {
  const { t, i18n } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);

  const selectedLang =
    i18n.language === "zh" || i18n.language === "zh-TW" ? "CN" : "VN";

  const handleSelect = (code) => {
    setIsOpen(false);

    if (code === "VN") {
      i18n.changeLanguage("vi");
    }

    if (code === "CN") {
      i18n.changeLanguage("zh");
    }
  };

  return (
    <div className="NavList">
      <div className="NavList-left">
        <Link to="/" className="logo">
          <span>TP</span>
          <strong>Media</strong>
        </Link>
      </div>

      <div className="NavList-right">
        <ul className="nav-linksList">
          <li>
            <Link to="/projects">{t("nav.projects")}</Link>
          </li>

          <li>
            <Link to="/aboutUs">{t("nav.about")}</Link>
          </li>

          <li>
            <Link to="/blog">{t("nav.blog", "Blog")}</Link>
          </li>

          <li>
            <Link to="/careers">{t("nav.careers", "Careers")}</Link>
          </li>

          {/* LANGUAGE */}
          <li className="nl-lang-dropdown">
            <button
              type="button"
              className="nl-lang-button"
              onClick={() => setIsOpen((v) => !v)}
            >
              <span className="nl-flag">
                <img
                  src={selectedLang === "VN" ? vietnamFlag : chinaFlag}
                  alt={selectedLang === "VN" ? "Vietnam flag" : "China flag"}
                />
              </span>

              <span className="nl-code">{selectedLang}</span>

              <span className="nl-caret">▾</span>
            </button>

            {isOpen && (
              <ul className="nl-dropdown">
                <li
                  className={`nl-dropdown-item ${
                    selectedLang === "VN" ? "active" : ""
                  }`}
                  onClick={() => handleSelect("VN")}
                >
                  <span className="nl-flag">
                    <img src={vietnamFlag} alt="Vietnam flag" />
                  </span>
                  VN
                </li>

                <li
                  className={`nl-dropdown-item ${
                    selectedLang === "CN" ? "active" : ""
                  }`}
                  onClick={() => handleSelect("CN")}
                >
                  <span className="nl-flag">
                    <img src={chinaFlag} alt="China flag" />
                  </span>
                  CN
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavList;
