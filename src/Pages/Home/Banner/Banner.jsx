import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import bannerImg1 from "../../../assets/banner/banner1.png";
import bannerImg2 from "../../../assets/banner/banner2.png";
import bannerImg3 from "../../../assets/banner/banner3.png";
import { FiPackage, FiMapPin, FiZap, FiShield } from 'react-icons/fi';
import { MdDeliveryDining } from 'react-icons/md';

const images = [bannerImg1, bannerImg2, bannerImg3];

const stats = [
    { value: '98%', label: 'On-Time Delivery' },
    { value: '50K+', label: 'Happy Clients' },
    { value: '64', label: 'Districts Covered' },
];

const features = [
    { icon: <FiZap size={18} />, text: 'Express 24h Delivery' },
    { icon: <FiMapPin size={18} />, text: 'Live GPS Tracking' },
    { icon: <FiShield size={18} />, text: '100% Safe & Insured' },
    { icon: <MdDeliveryDining size={18} />, text: 'Cash on Delivery' },
];

const Banner = () => {
    const [activeImg, setActiveImg] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveImg(prev => (prev + 1) % images.length);
        }, 3500);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative overflow-hidden min-h-[90vh] flex flex-col">
            {/* Background decoration */}
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[var(--lime)]/15 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[var(--teal)]/8 blur-3xl pointer-events-none" />

            {/* Main hero */}
            <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-14 lg:py-20 grid lg:grid-cols-2 gap-12 items-center">

                {/* Left: Text */}
                <div className="flex flex-col gap-6 animate-fade-up">
                    <span className="section-tag">⚡ Fast & Reliable Delivery</span>

                    <h1 className="font-extrabold leading-[1.1] text-[clamp(2.4rem,5vw,3.8rem)] text-[var(--teal)]">
                        Ship Smarter,{' '}
                        <span className="relative inline-block">
                            <span className="text-gradient-lime">Deliver Faster</span>
                            <svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 200 6" fill="none">
                                <path d="M0 3 Q100 0 200 3" stroke="#CAEB66" strokeWidth="3" strokeLinecap="round" />
                            </svg>
                        </span>
                        {' '}with ZapShift
                    </h1>

                    <p className="text-[var(--teal)]/65 text-lg leading-relaxed max-w-lg">
                        From personal packages to bulk business shipments — we deliver across
                        <strong className="text-[var(--teal)]"> 64 districts</strong> of Bangladesh with real-time tracking and zero hassle.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-wrap gap-4">
                        <Link to="/send-percel" className="btn-zap btn-primary-zap text-base px-7 py-3">
                            <FiPackage size={18} />
                            Send a Parcel
                        </Link>
                        <Link to="/coverage" className="btn-zap btn-outline-zap text-base px-7 py-3">
                            <FiMapPin size={18} />
                            View Coverage
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-5 mt-2">
                        {stats.map((s, i) => (
                            <div key={i} className="flex flex-col">
                                <span className="text-2xl font-extrabold text-[var(--teal)]">{s.value}</span>
                                <span className="text-xs font-semibold text-[var(--teal)]/55 uppercase tracking-wider">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Image card */}
                <div className="relative flex items-center justify-center">
                    {/* Floating ring decorations */}
                    <div className="absolute w-72 h-72 rounded-full border-2 border-dashed border-[var(--lime)]/40 animate-spin-slow" />
                    <div className="absolute w-52 h-52 rounded-full border border-[var(--teal)]/15" />

                    {/* Image switcher */}
                    <div className="relative w-full max-w-sm lg:max-w-md animate-float">
                        <div className="rounded-[var(--radius-2xl)] overflow-hidden premium-card shadow-[0_24px_64px_rgba(3,55,61,0.18)]">
                            {images.map((img, i) => (
                                <img
                                    key={i}
                                    src={img}
                                    alt={`delivery ${i + 1}`}
                                    className={`w-full object-cover transition-all duration-700 absolute top-0 left-0 ${i === activeImg ? 'opacity-100' : 'opacity-0'}`}
                                    style={{ height: '320px' }}
                                />
                            ))}
                            <div style={{ height: '320px' }} /> {/* placeholder for height */}

                            {/* Dot indicators */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                {images.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveImg(i)}
                                        className={`h-2 rounded-full transition-all duration-300 ${i === activeImg ? 'w-6 bg-[var(--lime)]' : 'w-2 bg-white/60'}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Floating badge */}
                        <div className="absolute -top-4 -right-4 glass rounded-2xl px-4 py-2.5 shadow-lg animate-pulse-glow">
                            <p className="text-xs font-bold text-[var(--teal)]">⚡ Delivering Now</p>
                            <p className="text-[11px] text-[var(--teal)]/60">1,240+ active parcels</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Trust / Feature bar */}
            <div className="w-full bg-[var(--teal)] py-5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {features.map((f, i) => (
                        <div key={i} className="flex items-center gap-3 text-white/90">
                            <span className="w-8 h-8 rounded-full bg-[var(--lime)]/20 flex items-center justify-center text-[var(--lime)]">
                                {f.icon}
                            </span>
                            <span className="text-sm font-semibold">{f.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Banner;