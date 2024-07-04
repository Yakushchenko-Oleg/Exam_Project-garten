// src/components/Contacts/Contacts.jsx
import React from "react";
import "./Contacts.scss";
import InstagramIcon from "./assets/ic-instagram.png";
import WhatsappIcon from "./assets/ic-whatsapp.png";

const Contacts = () => {
    return (
        <footer className="footer">
            <div className="container ">
                <div className="header-wrapper">
                    <h2 className="contact-title">Contact</h2>
                </div>
                <div className="contact-content">
                    <div className="contact-wrapper">
                        <div className="card">
                            <span className="label">Phone</span>
                            <div className="contact-details">
                                <div className="contact-item">
                                    <span className="value">+49 999 999 99 99</span>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <span className="label">Socials</span>
                            <div className="contact-details">
                                <div className="contact-item">
                                    <a href="https://www.instagram.com/" target="_blank" className="social-icon"><img src={InstagramIcon} alt="Instagram" /></a>
                                    <a href="https://web.whatsapp.com/" target="_blank" className="social-icon"><img src={WhatsappIcon} alt="WhatsApp" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="contact-wrapper">
                        <div className="card">
                            <span className="label">Address</span>
                            <div className="contact-details">
                                <div className="contact-item">
                                    <span className="value">Linkstraße 2, 8 OG, 10785, Berlin, Deutschland</span>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <span className="label">Working Hours</span>
                            <div className="contact-details">
                                <div className="contact-item">
                                    <span className="value">24 hours a day</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="map-card">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2429.579297400921!2d13.371122815737536!3d52.50964727981073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a851cb4454d5eb%3A0xe167c6e2843880b0!2sLinkstra%C3%9Fe%202%2C%2010785%20Berlin%2C%20Germany!5e0!3m2!1sen!2sus!4v1622555246895!5m2!1sen!2sus"
                            title="Location Map"
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Contacts;