import React from 'react';
import '../../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-left">
          <div className="footer-logo"><img
            src="/images/HomePage/logo_foot.png"
            alt="СКАН логотип"
            width={141}
            height={141}
          /></div>

        </div>
        <div className="footer-right">
          <p>г. Москва, Цветной б-р, 40</p>
          <p>+7 495 771 21 11</p>
          <p>info@scan.ru</p>
          <p className='copy'>Copyright. 2022</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;