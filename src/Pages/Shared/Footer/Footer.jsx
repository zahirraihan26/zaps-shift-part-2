import React from 'react';
import Logo from '../../../Components/Logo/Logo';
import { Link } from 'react-router';
import { FiTwitter, FiYoutube, FiFacebook, FiInstagram, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Footer = () => {
    const year = new Date().getFullYear();

    const links = {
        Company: ['About Us', 'Careers', 'Blog', 'Press'],
        Services: ['Express Delivery', 'Nationwide', 'Corporate', 'Parcel Return'],
        Support: ['Help Center', 'Track Parcel', 'Contact Us', 'FAQs'],
    };

    const socials = [
        { icon: <FiTwitter size={18} />, label: 'Twitter', href: '#' },
        { icon: <FiYoutube size={18} />, label: 'YouTube', href: '#' },
        { icon: <FiFacebook size={18} />, label: 'Facebook', href: '#' },
        { icon: <FiInstagram size={18} />, label: 'Instagram', href: '#' },
    ];

    return (
        <footer className="bg-[var(--teal)] text-white">
            {/* Main footer grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
                
                {/* Brand column */}
                <div className="lg:col-span-2 flex flex-col gap-5">
                    <div className="brightness-[0] invert">
                        <Logo />
                    </div>
                    <p className="text-white/55 text-sm leading-relaxed max-w-xs">
                        Bangladesh's most trusted parcel delivery platform. Fast, secure, and tracked from pickup to doorstep.
                    </p>

                    {/* Contact */}
                    <div className="flex flex-col gap-2.5 text-sm text-white/60">
                        <a href="mailto:hello@zapshift.com" className="flex items-center gap-2 hover:text-[var(--lime)] transition-colors">
                            <FiMail size={15} /> hello@zapshift.com
                        </a>
                        <a href="tel:+8801700000000" className="flex items-center gap-2 hover:text-[var(--lime)] transition-colors">
                            <FiPhone size={15} /> +880 1700-000000
                        </a>
                        <span className="flex items-center gap-2">
                            <FiMapPin size={15} /> Dhaka, Bangladesh
                        </span>
                    </div>

                    {/* Socials */}
                    <div className="flex gap-3 mt-1">
                        {socials.map(s => (
                            <a
                                key={s.label}
                                href={s.href}
                                aria-label={s.label}
                                className="w-9 h-9 rounded-xl bg-white/8 flex items-center justify-center text-white/60 hover:bg-[var(--lime)] hover:text-[var(--teal)] transition-all duration-200"
                            >
                                {s.icon}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Link columns */}
                {Object.entries(links).map(([heading, items]) => (
                    <div key={heading} className="flex flex-col gap-4">
                        <h4 className="font-bold text-sm text-[var(--lime)] uppercase tracking-widest">{heading}</h4>
                        <ul className="flex flex-col gap-2.5">
                            {items.map(item => (
                                <li key={item}>
                                    <Link
                                        to="#"
                                        className="text-sm text-white/55 hover:text-[var(--lime)] transition-colors duration-200"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Divider */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            </div>

            {/* Bottom bar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/40">
                <p>© {year} ZapShift. All rights reserved.</p>
                <div className="flex gap-5">
                    <Link to="#" className="hover:text-[var(--lime)] transition-colors">Privacy Policy</Link>
                    <Link to="#" className="hover:text-[var(--lime)] transition-colors">Terms of Service</Link>
                    <Link to="#" className="hover:text-[var(--lime)] transition-colors">Cookies</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;