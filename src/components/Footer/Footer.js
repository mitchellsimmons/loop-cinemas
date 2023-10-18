import { Link } from 'react-router-dom';
import { IoMail, IoLogoFacebook, IoLogoTwitter } from 'react-icons/io5';
import { AiFillInstagram } from 'react-icons/ai';
import { FaYoutube } from 'react-icons/fa';

import Wrapper from './Footer.styles';
import { logoImage } from 'assets/images';

const Footer = () => {
    return (
        <Wrapper>
            <div className='container'>
                <div id='footer-logo'>
                    <Link>
                        <img src={logoImage} alt='logo' />
                    </Link>
                </div>
                <div id='footer-links'>
                    <div className='footer-links-section'>
                        <h4>movies</h4>
                        <a href='#footer'>now showing</a>
                        <a href='#footer'>coming soon</a>
                        <a href='#footer'>cinemas</a>
                    </div>
                    <div className='footer-links-section'>
                        <h4>membership</h4>
                        <a href='#footer'>movie club</a>
                        <a href='#footer'>offers</a>
                    </div>
                    <div className='footer-links-section'>
                        <h4>info</h4>
                        <a href='#footer'>FAQs</a>
                        <a href='#footer'>about us</a>
                        <a href='#footer'>careers</a>
                    </div>
                    <div className='footer-links-section'>
                        <h4>contact</h4>
                        <a href='#footer'>(03) 9999 1234</a>
                        <div id='footer-contact-icons'>
                            <IoMail />
                            <IoLogoFacebook />
                            <IoLogoTwitter />
                            <AiFillInstagram />
                            <FaYoutube />
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

export default Footer;
