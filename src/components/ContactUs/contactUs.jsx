import "./contactUs.css";
import { useTranslation } from 'react-i18next';

function ContactUs() {
  const { t } = useTranslation();
  return (
    <>
      <section className="contact-us-section">
        <div className="contact-us-header">
          <span className="contact-us-label">{t('contact.label')}</span>
          <h2 className="contact-us-heading">{t('contact.heading')}</h2>
        </div>
        <div className="contact-us-grid">
          <div className="contact-us-info">
            <div className="contact-us-office">
              <h4>{t('contact.officeOnline')}</h4>
              <p className="office-location">TAIPEI - TAIWAN</p>
              <p className="office-address">750 Sing Sing Rd, Horseheads, NY, 14845</p>
            </div>
            <div className="contact-us-office">
              <h4>TOKYO, JAPAN</h4>
              <p className="office-address">
                Tokyo, Japan2002 Horton Ford Road, Eidson, TN, 37731
              </p>
            </div>
            <div className="contact-us-socials">
              <button type="button" aria-label="Facebook">
                f
              </button>
              <button type="button" aria-label="Dribbble">
                d
              </button>
              <button type="button" aria-label="LinkedIn">
                in
              </button>
              <button type="button" aria-label="Twitter">
                t
              </button>
            </div>
          </div>
          <form className="contact-us-form">
            <label>
              <span>{t('contact.formName', 'Name')}</span>
              <input type="text" placeholder={t('contact.formName', 'Name')} />
            </label>
            <label>
              <span>{t('contact.formEmail', 'Email Address')}</span>
              <input type="email" placeholder={t('contact.formEmail', 'Email Address')} />
            </label>
            <label>
              <span>{t('contact.formPhone', 'Phone Number')}</span>
              <input type="tel" placeholder={t('contact.formPhone', 'Phone Number')} />
            </label>
            <label>
              <span>{t('contact.formMessage', 'Message')}</span>
              <textarea placeholder={t('contact.formMessage', 'Message')} rows="6" />
            </label>
            <button type="submit" className="contact-us-submit">{t('contact.submit')}</button>
          </form>
        </div>
      </section>
    </>
  );
}

export default ContactUs;
