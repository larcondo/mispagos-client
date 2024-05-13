import './index.css';
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram
} from 'react-icons/fa';

const Footer = ({ id }) => {
  return(
    <footer id={ id }>

      <div className="footer-icons">
        <FaGithub />
        <FaLinkedin />
        <FaTwitter />
        <FaFacebook />
        <FaInstagram />
      </div>

      <div className="footer-appinfo">
        <p>MisPagos app - versión 2023</p>
      </div>

      <div className="footer-text">
        <p>Creado por: <i>larcondo</i> - 2024 - Todos los derechos reservados</p>
      </div>

    </footer>
  );
};

export default Footer;