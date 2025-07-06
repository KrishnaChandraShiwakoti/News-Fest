import { Link } from "react-router-dom";
import Navlinks from "./Navlinks";
import "../Styles/Navbar.css";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
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
          {!user ? (
            <>
              <Link to="/login">login</Link>
              <span>/</span>
              <Link to="/register">Register</Link>
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
    </nav>
  );
};

export default Navbar;
