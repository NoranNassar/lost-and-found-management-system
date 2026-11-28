
import { Link } from "react-router-dom";
import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">

        <div className="footer-about">
          <h2>
            Find<span>It</span>
          </h2>

          <p>
            Helping university students find their lost belongings
            and reconnect with their important items.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/matches">Suggested Matches</Link>
        </div>

        <div className="footer-contact">
          <h3>About FindIt</h3>
          <p>University Lost and Found Platform</p>
          <p>Made for Students</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 FindIt. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
