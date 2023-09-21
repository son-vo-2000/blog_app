import React from "react";
import { Link } from "react-router-dom";
import '../styles/footer.css'

const Footer = () => {
  return (
    <footer>
      <div className="footer__container">
        <div className="footer__social">
          <Link
            to="https://www.freecodecamp.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-twitter"></i>
          </Link>
          <Link
            to="https://www.freecodecamp.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-instagram"></i>
          </Link>
          <Link
            to="https://www.freecodecamp.org/ "
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-linkedin"></i>
          </Link>
        </div>
        <div className="footer__content">
          <Link>Terms of Use</Link>
          <Link>Privacy Policy</Link>
        </div>
        <div className="footer__creator">
          <span>© 2023 Son Trong Vo</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
