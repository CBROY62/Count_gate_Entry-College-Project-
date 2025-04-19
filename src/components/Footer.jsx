import React from "react";
import "../StyleSection/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Curved Shape */}
      <div className="footer-curve" />

      {/* Main Content */}
      <div className="footer-container">
        <div className="footer-column">
          <p className="footer-title">Mr Mark Bastien</p>
          <p>METT  Limited</p>
          <p>386, One Christopher Street</p>
          <p>Valletta VLT 1585</p>
          <p>Malta</p>
        </div>

        <div className="footer-column center">
          <p className="footer-title">Contactez-Nous</p>
          <div className="footer-links">
            <a href="#">Instagram</a>
            <a href="#">Facebook</a>
            <a href="#">Twitter</a>
            <a href="#">YouTube</a>
          </div>
        </div>

        <div className="footer-column">
          <p className="footer-title">METT  Sales Office</p>
          <p>Mett Gestion Hôtelière</p>
          <p> Operator</p>
          <p>92300 Levallois</p>
          <p>France</p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <p>&copy; 2025 Mett . Tous droits réservés.</p>
        <div className="footer-bottom-links">
          <a href="#">Mentions légales</a>
          <a href="#">Politique de confidentialité</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
