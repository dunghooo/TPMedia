import "./NavList.css";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

function NavList() {
  const { t } = useTranslation();
  return (
    <>
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
              <Link to="/projects">{t('nav.projects')}</Link>
            </li>
            <li>
              <Link to="/aboutUs">{t('nav.about')}</Link>
            </li>
            <li>
              <Link to="/blog">{t('nav.blog', 'Blog')}</Link>
            </li>
            <li>
              <Link to="/careers">{t('nav.careers', 'Careers')}</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default NavList;
