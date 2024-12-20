import Logo from "../Logo.jsx";
import HorizontalRule from "../HorizontalRule.jsx";
import Icon from "../Icon/icon.jsx";

import './Footer.css';

import {faFacebook, faInstagram, faLinkedin, faTwitter} from "@fortawesome/free-brands-svg-icons";
import {NavLink} from "react-router-dom";

export default function Footer() {
    return (
        <footer>
            <div className='footer-content'>
                <Logo />
                <div className='qairline-content'>
                    <p>QAirline is a fictional airline company that provides domestic and international flights. We are committed to providing the best service to our customers.</p>
                </div>
                <HorizontalRule />
            </div>
            <div className='footer-links'>
                <div className='icon-links'>
                    <NavLink to="/about">About Us</NavLink>
                    <NavLink to="/privacy-policy">Privacy Policy</NavLink>
                    <NavLink to="/terms-of-service">Terms of Service</NavLink>
                </div>
                <div className='phone-links'>
                    <div className='customer-caring'>
                        <p>Customer Caring in Viet Nam: (+84) 123-456-789</p>
                        <p>Customer Caring in USA: (+1) 123-456-789</p>
                        <p>Customer Caring in Europe: (+44) 123-456-789</p>
                    </div>
                </div>
                <div className='social-links'>
                    <span>Email: <a href='https://www.youtube.com/watch?v=xvFZjo5PgG0'>QAirline.Team@gmail.com</a></span>
                    <div className='icon-social'>
                        <NavLink to="https://www.youtube.com/watch?v=xvFZjo5PgG0"><Icon iconName={faFacebook}/> </NavLink>
                        <NavLink to="https://www.youtube.com/watch?v=xvFZjo5PgG0"><Icon iconName={faTwitter}/> </NavLink>
                        <NavLink to="https://www.youtube.com/watch?v=xvFZjo5PgG0"><Icon iconName={faInstagram}/> </NavLink>
                        <NavLink to="https://www.youtube.com/watch?v=xvFZjo5PgG0"><Icon iconName={faLinkedin}/> </NavLink>
                    </div>
                    <div className='award'>
                        <div className='award-img'>
                            <img src='https://www.vietnamairlines.com/Themes/VNANew/Portal/images/img-logo-partner-2.png'/>
                            <img src='https://www.vietnamairlines.com/Themes/VNANew/Portal/images/img-logo-partner-3.png'/>
                        </div>
                        <p>Awards</p>
                    </div>
                </div>
            </div>
            <div className='footer-about-us'>
                <p>University of Engineering and Technology, VNU, Viet Nam.</p>
                <p>Email: support@qairline.com | Phone: (+84) 123-456-789 | Fax: (+84) 987-654-321</p>
                <p>Copyright © 2024, QAirLine, Inc. All rights reserved.</p>
            </div>
        </footer>
    );
}