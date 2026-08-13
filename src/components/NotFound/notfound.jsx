import "./notfound.css";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

function NotFound() {
  const { t } = useTranslation();
  return (
    <div className="notfound-page">
      <div className="notfound-card">
        <h1>{t('notfound.title')}</h1>
        <h2>{t('notfound.heading')}</h2>
        <p>{t('notfound.message')}</p>
        <Link to ="/" className="notfound-button">{t('notfound.back')}</Link>
      </div>
    </div>
  );
}

export default NotFound;
