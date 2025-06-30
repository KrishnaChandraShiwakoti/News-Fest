import { Link } from "react-router-dom";
import Navlinks from "./Navlinks";
import "../Styles/Navbar.css";

const Navbar = () => {
  return (
    <nav>
      <div className="logo">
        <Link to="/">
          <span>News</span>Fest
        </Link>
      </div>
      <div className="navbar flex">
        <div className="flex links">
          <Navlinks />
        </div>
        <div className="auth flex">
          <Link to="/login">login</Link>
          <span>/</span>
          <Link to="/register">Register</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
