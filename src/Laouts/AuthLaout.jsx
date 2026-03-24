import React from 'react';
import Logo from '../Components/Logo/Logo';
import { Outlet } from 'react-router';
import authImage from "../assets/authImage.png";
import { FiPackage, FiZap, FiShield } from 'react-icons/fi';

const features = [
    { icon: <FiZap size={18} />, text: 'Lightning-fast delivery' },
    { icon: <FiPackage size={18} />, text: 'Real-time parcel tracking' },
    { icon: <FiShield size={18} />, text: 'Fully secure & insured' },
];

const AuthLaout = () => {
    return (
        <div className="min-h-screen bg-[#f8faf4] flex flex-col">
            {/* Top nav */}
            <header className="px-4 sm:px-8 py-4">
                <Logo />
            </header>

            {/* Content */}
            <div className="flex-1 flex flex-col lg:flex-row items-center">
                {/* Form side */}
                <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-10">
                    <div className="w-full max-w-md">
                        <Outlet />
                    </div>
                </div>

                {/* Image side */}
                <div
                    className="w-full lg:w-1/2 relative hidden lg:flex flex-col items-center justify-center min-h-[600px] overflow-hidden rounded-l-[40px]"
                    style={{ background: 'linear-gradient(135deg, var(--teal) 0%, #032b30 100%)' }}
                >
                    {/* Decorative blobs */}
                    <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[var(--lime)]/15 blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[var(--lime)]/10 blur-3xl pointer-events-none" />

                    {/* Image */}
                    <div className="relative z-10 px-10 animate-float">
                        <img
                            src={authImage}
                            alt="Delivery illustration"
                            className="w-full max-w-md drop-shadow-2xl"
                        />
                    </div>

                    {/* Features */}
                    <div className="relative z-10 mt-6 flex flex-col gap-3 px-10 w-full">
                        {features.map((f, i) => (
                            <div key={i} className="flex items-center gap-3 text-white/80 text-sm">
                                <span className="w-7 h-7 rounded-lg bg-[var(--lime)]/20 flex items-center justify-center text-[var(--lime)] flex-shrink-0">
                                    {f.icon}
                                </span>
                                {f.text}
                            </div>
                        ))}
                    </div>

                    {/* Bottom tagline */}
                    <p className="relative z-10 mt-8 text-white/35 text-xs px-10">
                        Trusted by 50,000+ customers across Bangladesh.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthLaout;