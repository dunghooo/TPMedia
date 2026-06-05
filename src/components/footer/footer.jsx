import "./footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <>
      <div className="footer-section">
        <div className="footer-nav-row">
          <span>PROJECT</span>
          <span>ABOUT US</span>
          <span>MEMBER</span>
          <span>CONTACT</span>
        </div>
        <div className="footer-card">
          <div className="footer-card__col footer-logo-col">
            <div className="footer-logo-box">
              <span>TP</span>
              <strong>Media</strong>
            </div>
          </div>

          <div className="footer-card__col">
            <p className="footer-title">PROJECT</p>
            <ul>
              <li>PROJECT</li>
              <li>ABOUT US</li>
              <li>MEMBER CARD</li>
            </ul>
          </div>

          <div className="footer-card__col">
            <p className="footer-title">CONTACT US</p>
            <ul>
              <li>THÔNG TIN GMAIL</li>
              <li>THÔNG TIN SDT</li>
            </ul>
          </div>

          <div className="footer-card__col footer-copy-col">
            <p className="footer-title">CONTACT</p>
            <ul>
              <li>THÔNG TIN ĐỊA CHỈ</li>
              <li>THÔNG TIN MÃ SỐ THUẾ</li>
            </ul>
            <div className="footer-copy-right">
              ©2023 Webestica ALL RIGHTS RESERVED
            </div>
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
