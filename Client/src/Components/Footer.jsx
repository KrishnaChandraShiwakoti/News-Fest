import "../Styles/Footer.css";
import Navlinks from "./Navlinks";
const Footer = () => {
  return (
    <div className="footer flex">
      {/* About us */}
      <div className="about-us">
        <h1>About Us</h1>
        <p>
          This website is the official news portal of NewsFest. This Nepali
          language portal covers news, opinions, entertainment, sports, world,
          information technology, videos and news and analysis from various
          aspects of life.
        </p>
      </div>
      {/* Quick links*/}
      <div className="quick-links">
        <h1>Quick Links</h1>
      </div>
      {/* Categories*/}
      <div className="categories">
        <h1>Categories</h1>
        <Navlinks />
      </div>
    </div>
  );
};

export default Footer;
