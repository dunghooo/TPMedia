import "./banner.css";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

function Banner() {
  const { t } = useTranslation();
  return (
    <header className="flexible-header">
      <div className="flexible-header__overlay">
        <div className="flexible-header__content">
          <h1>{t('banner.title')}</h1>
          <p>{t('banner.subtitle')}</p>
          <div className="flexible-header__actions">
            <Link to="/projects" className="primary-action">
              {t('banner.viewProjects')}
            </Link>
            <Link to="/contactUs" className="secondary-action">
              {t('banner.contactUs')}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Banner;
