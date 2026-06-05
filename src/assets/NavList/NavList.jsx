import "./NavList.css";
import { Link } from "react-router-dom";

function NavList() {
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
              <Link to="/projects">Project</Link>
            </li>
            <li>
              <Link to="/aboutUs">About Us</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <Link to="/careers">Careers</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default NavList;
