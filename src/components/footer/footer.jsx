import "./footer.css";
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  const { t } = useTranslation();
  return (
    <>
      <div className="footer-section">
        <div className="footer-nav-row">
          <span>{t('footer.project')}</span>
          <span>{t('footer.about')}</span>
          <span>{t('footer.member')}</span>
          <span>{t('footer.contact')}</span>
        </div>
        <div className="footer-card">
          <div className="footer-card__col footer-logo-col">
            <div className="footer-logo-box">
              <span>TP</span>
              <strong>Media</strong>
            </div>
          </div>

          <div className="footer-card__col">
            <p className="footer-title">{t('footer.project')}</p>
            <ul>
              <li>{t('footer.project')}</li>
              <li>{t('footer.about')}</li>
              <li>{t('footer.member')}</li>
            </ul>
          </div>

          <div className="footer-card__col">
            <p className="footer-title">{t('footer.contact_us')}</p>
            <ul>
              <li>{t('footer.info_email')}</li>
              <li>{t('footer.info_phone')}</li>
            </ul>
          </div>

          <div className="footer-card__col footer-copy-col">
            <p className="footer-title">{t('footer.contact')}</p>
            <ul>
              <li>{t('footer.address')}</li>
              <li>{t('footer.tax')}</li>
            </ul>
            <div className="footer-copy-right">{t('footer.copyright')}</div>
            <div className="footer-social">
              <span>
                <FontAwesomeIcon icon={faFacebook} />
              </span>
              <span>
                <FontAwesomeIcon icon={faInstagram} />
              </span>
              <span>
                <FontAwesomeIcon icon={faLinkedin} />
              </span>
              <span>
                <FontAwesomeIcon icon={faTwitter} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
