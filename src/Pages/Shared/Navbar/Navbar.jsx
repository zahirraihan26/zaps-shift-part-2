import React, { useEffect, useState } from 'react';
import Logo from '../../../Components/Logo/Logo';
import { Link, NavLink } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import { FiLogOut, FiPackage, FiUser, FiMenu, FiX } from 'react-icons/fi';
import { MdDeliveryDining } from 'react-icons/md';

const Navbar = () => {
    const { user, logOut } = useAuth();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleLogout = () => {
        logOut().catch(e => console.log(e));
    };

    const navLinkClass = ({ isActive }) =>
        `relative px-1 py-0.5 font-semibold text-sm transition-colors duration-200 
         after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:rounded-full
         after:transition-all after:duration-300
         ${isActive
            ? 'text-[var(--teal)] after:w-full after:bg-[var(--lime)]'
            : 'text-[var(--teal)]/70 hover:text-[var(--teal)] after:w-0 hover:after:w-full after:bg-[var(--lime)]'
         }`;

    const links = [
        { label: 'Services', to: '' },
        { label: 'About Us', to: '' },
        { label: 'Send Parcel', to: '/send-percel' },
        { label: 'Coverage', to: '/coverage' },
    ];

    return (
        <header
            className={`nav-sticky w-full transition-all duration-300 ${scrolled
                ? 'glass shadow-[0_2px_24px_rgba(3,55,61,0.12)]'
                : 'bg-[#f8faf4]/80 backdrop-blur-md'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

                {/* Logo */}
                <div className="flex-shrink-0">
                    <Logo />
                </div>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-7">
                    {links.map(link => (
                        <NavLink key={link.label} to={link.to} className={navLinkClass}>
                            {link.label}
                        </NavLink>
                    ))}
                    {user && (
                        <NavLink to="/dashboard/my-parcels" className={navLinkClass}>
                            My Parcels
                        </NavLink>
                    )}
                </nav>

                {/* Desktop Actions */}
                <div className="hidden lg:flex items-center gap-3">
                    {user ? (
                        <div className="flex items-center gap-3">
                            {/* Avatar dropdown */}
                            <div className="relative group">
                                <button className="w-9 h-9 rounded-full border-2 border-[var(--lime)] overflow-hidden shadow-md transition hover:scale-105">
                                    {user.photoURL
                                        ? <img src={user.photoURL} alt="avatar" className="w-full h-full object-cover" />
                                        : <div className="w-full h-full bg-[var(--teal)] flex items-center justify-center text-[var(--lime)] font-bold">
                                            {user.displayName?.[0] || <FiUser />}
                                          </div>
                                    }
                                </button>
                                {/* Dropdown */}
                                <div className="absolute right-0 top-full mt-2 w-44 glass rounded-2xl shadow-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-1 group-hover:translate-y-0 z-50">
                                    <div className="px-4 py-3 border-b border-[var(--lime)]/20">
                                        <p className="text-xs text-[var(--teal)]/60 font-medium">Signed in as</p>
                                        <p className="text-sm font-bold text-[var(--teal)] truncate">{user.displayName || user.email}</p>
                                    </div>
                                    <Link to="/dashboard/my-parcels" className="flex items-center gap-2 px-4 py-2.5 text-sm text-[var(--teal)] hover:bg-[var(--lime)]/20 transition-colors">
                                        <FiPackage size={14} /> My Parcels
                                    </Link>
                                    <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors">
                                        <FiLogOut size={14} /> Log Out
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="btn-zap btn-outline-zap text-sm px-5 py-2"
                        >
                            Log In
                        </Link>
                    )}

                    <Link
                        to="/rider"
                        className="btn-zap btn-primary-zap text-sm px-5 py-2.5 flex items-center gap-2"
                    >
                        <MdDeliveryDining size={18} />
                        Be a Rider
                    </Link>
                </div>

                {/* Mobile hamburger */}
                <button
                    className="lg:hidden p-2 rounded-xl text-[var(--teal)] hover:bg-[var(--lime)]/20 transition"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="lg:hidden glass border-t border-[var(--lime)]/20 animate-fade-up">
                    <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
                        {links.map(link => (
                            <NavLink
                                key={link.label}
                                to={link.to}
                                onClick={() => setMenuOpen(false)}
                                className={({ isActive }) =>
                                    `px-4 py-2.5 rounded-xl font-semibold text-sm transition ${isActive
                                        ? 'bg-[var(--lime)]/30 text-[var(--teal)]'
                                        : 'text-[var(--teal)]/70 hover:bg-[var(--lime)]/15'
                                    }`
                                }
                            >
                                {link.label}
                            </NavLink>
                        ))}
                        {user && (
                            <NavLink to="/dashboard/my-parcels" onClick={() => setMenuOpen(false)}
                                className={({ isActive }) =>
                                    `px-4 py-2.5 rounded-xl font-semibold text-sm transition ${isActive ? 'bg-[var(--lime)]/30 text-[var(--teal)]' : 'text-[var(--teal)]/70 hover:bg-[var(--lime)]/15'}`
                                }
                            >
                                My Parcels
                            </NavLink>
                        )}
                        <div className="flex gap-3 mt-3">
                            {user
                                ? <button onClick={handleLogout} className="btn-zap btn-outline-zap text-sm flex-1 justify-center">Log Out</button>
                                : <Link to="/login" className="btn-zap btn-outline-zap text-sm flex-1 justify-center">Log In</Link>
                            }
                            <Link to="/rider" className="btn-zap btn-primary-zap text-sm flex-1 justify-center">Be a Rider</Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;