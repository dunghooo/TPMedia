import "./banner.css";
import { Link } from "react-router-dom";

function Banner() {
  return (
    <header className="flexible-header">
      <div className="flexible-header__overlay">
        <div className="flexible-header__content">
          <h1>Build Digital Stories That Stand Out</h1>
          <p>
            Creative production, branding, and media campaigns designed for
            modern teams.
          </p>
          <div className="flexible-header__actions">
            <Link to="/projects" className="primary-action">
              View Projects
            </Link>
            <Link to="/contactUs" className="secondary-action">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Banner;
