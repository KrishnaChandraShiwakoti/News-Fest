import { Link } from "react-router-dom";
import Navlinks from "./Navlinks";
import "../Styles/Navbar.css";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const modalRef = useRef();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
    else setUser(null);
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShowModal(false);
      }
    }
    if (showModal) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showModal]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setShowModal(false);
    window.location.reload();
  };

  return (
    <nav className="landing-navbar">
      <div className="landing-navbar-inner">
        <div className="landing-navbar-logo">
          <Link to="/">
            <span>News</span>Fest
          </Link>
        </div>
        <button
          className={`landing-navbar-hamburger${mobileOpen ? " open" : ""}`}
          aria-label="Open menu"
          onClick={() => setMobileOpen((v) => !v)}>
          <span />
          <span />
          <span />
        </button>
        <ul
          className={`landing-navbar-links${mobileOpen ? " mobile-open" : ""}`}>
          {mobileOpen && (
            <button
              className="landing-navbar-close"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}>
              <span></span>
              <span></span>
            </button>
          )}
          <Navlinks />
        </ul>
        <div
          className={`landing-navbar-auth${mobileOpen ? " mobile-open" : ""}`}>
          {!user ? (
            <>
              <Link
                to="/login"
                className="landing-navbar-auth-link"
                onClick={() => setMobileOpen(false)}>
                Login
              </Link>
              <span className="landing-navbar-auth-divider">/</span>
              <Link
                to="/register"
                className="landing-navbar-auth-link"
                onClick={() => setMobileOpen(false)}>
                Register
              </Link>
            </>
          ) : (
            <div className="profile-menu-wrap">
              <button
                className="profile-btn"
                onClick={() => setShowModal((v) => !v)}>
                <img
                  src={
                    user.profilePicture ||
                    "https://ui-avatars.com/api/?name=" +
                      encodeURIComponent(user.name)
                  }
                  alt="profile"
                  className="profile-icon"
                />
              </button>
              {showModal && (
                <div className="profile-modal" ref={modalRef}>
                  <Link to="/account" onClick={() => setShowModal(false)}>
                    Account
                  </Link>
                  <Link to="user/bookmark" onClick={() => setShowModal(false)}>
                    Bookmark
                  </Link>
                  <button className="logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {/* Overlay for mobile menu */}
      {mobileOpen && (
        <div
          className="landing-navbar-mobile-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
