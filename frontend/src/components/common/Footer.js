import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer-top">
      <div className="footer-section">
        <h4>ABOUT</h4>
        <a href="#!">Contact Us</a>
        <a href="#!">About Us</a>
        <a href="#!">Careers</a>
        <a href="#!">Press</a>
        <a href="#!">Corporate Information</a>
      </div>
      <div className="footer-section">
        <h4>HELP</h4>
        <a href="#!">Payments</a>
        <a href="#!">Shipping</a>
        <a href="#!">Cancellation & Returns</a>
        <a href="#!">FAQ</a>
        <a href="#!">Report Infringement</a>
      </div>
      <div className="footer-section">
        <h4>CONSUMER POLICY</h4>
        <a href="#!">Cancellation & Returns</a>
        <a href="#!">Terms Of Use</a>
        <a href="#!">Security</a>
        <a href="#!">Privacy</a>
        <a href="#!">Sitemap</a>
        <a href="#!">Grievance Redressal</a>
        <a href="#!">EPR Compliance</a>
      </div>
      <div className="footer-section">
        <h4>MAIL US</h4>
        <p>Flipkart Internet Private Limited,<br />Buildings Alyssa, Begonia &amp;<br />Clove Embassy Tech Village,<br />Outer Ring Road, Devarabeesanahalli Village,<br />Bengaluru, 560103, Karnataka, India</p>
      </div>
      <div className="footer-section">
        <h4>REGISTERED OFFICE ADDRESS</h4>
        <p>Flipkart Internet Private Limited,<br />Buildings Alyssa, Begonia &amp;<br />Clove Embassy Tech Village,<br />Outer Ring Road, Devarabeesanahalli Village,<br />Bengaluru, 560103, Karnataka, India<br />CIN: U51109KA2012PTC066107</p>
        <a href="#!" className="footer-telephone">Telephone: 044-45614700</a>
      </div>
    </div>
    <div className="footer-bottom">
      <div className="footer-bottom-inner">
        <div className="footer-bottom-links">
          <Link to="/">
            <svg viewBox="0 0 24 24" fill="white" width="16" height="16"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
            Become a Seller
          </Link>
          <Link to="/">Advertise</Link>
          <Link to="/">Gift Cards</Link>
          <Link to="/">Help Center</Link>
        </div>
        <p className="copyright">© 2007-2026 Flipkart.com (Clone for Educational Purposes)</p>
        <div className="payment-icons">
          <span>💳</span><span>🏦</span><span>📱</span><span>💰</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
