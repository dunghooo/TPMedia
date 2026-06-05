import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "./Nav.css";

function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

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

  if (location.pathname === "/projects") return null;
  if (location.pathname === "/projectdetail") return null;
  if (location.pathname === "/about") return null;
  if (location.pathname === "/memberCards") return null;
  if (location.pathname === "/contactUs") return null;
  if (location.pathname === "/*") return null;

  return (
    <>
      <div className="header-container">
        <nav className={`nav-bar ${isScrolled ? "nav-bar--scrolled" : ""}`}>
          <div className="navbar-left">
            <a href="#" className="logo" aria-label="TPMedia logo"></a>
          </div>
          <div className="navbar-center">
            <ul className="nav-links">
              <li>
                <Link to="/projects">PROJECTS</Link>
              </li>
              <li>
                <Link to="/about">ABOUT</Link>
              </li>
              <li>
                <Link to="/memberCards">MEMBERS</Link>
              </li>
              <li>
                <Link to="/contactUs">CONTACT US</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Nav;
