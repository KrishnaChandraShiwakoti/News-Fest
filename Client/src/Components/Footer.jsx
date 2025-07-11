import "../Styles/Footer.css";
import Navlinks from "./Navlinks";

const Footer = () => {
  return (
    <footer className="landing-footer">
      <div className="landing-footer-inner">
        <div className="landing-footer-about">
          <h2>About NewsFest</h2>
          <p>
            NewsFest is your trusted Nepali news portal for top stories,
            opinions, entertainment, sports, world, technology, and more. Stay
            informed with our editors' picks and latest updates.
          </p>
        </div>
        <div className="landing-footer-categories">
          <h2>Categories</h2>
          <ul className="landing-footer-categories-list">
            <Navlinks />
          </ul>
        </div>
        <div className="landing-footer-meta">
          <div className="landing-footer-logo">
            <span>News</span>Fest
          </div>
          <div className="landing-footer-copyright">
            &copy; {new Date().getFullYear()} NewsFest. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
