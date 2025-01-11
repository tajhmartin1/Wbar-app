import React from 'react';
import './Footer.css';

const image = require("./wbar.png")


const Footer = () => {
    return (
        <div className="Footer">
            <hr></hr>
            <img src={(image)} className='img' alt="wbar"/>
        </div>
    );
}

export default Footer;
