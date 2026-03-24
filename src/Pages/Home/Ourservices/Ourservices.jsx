import React, { useState } from "react";
import { FiTruck, FiMap, FiBox, FiDollarSign, FiBriefcase, FiRefreshCw } from "react-icons/fi";

const services = [
    {
        icon: <FiTruck size={28} />,
        title: "Express & Standard Delivery",
        desc: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi.",
    },
    {
        icon: <FiMap size={28} />,
        title: "Nationwide Delivery",
        desc: "Door-to-door delivery across all 64 districts, ensuring your parcel reaches customers within 48–72 hours.",
    },
    {
        icon: <FiBox size={28} />,
        title: "Fulfillment Solution",
        desc: "Customized service with inventory management, online order processing & packaging support.",
    },
    {
        icon: <FiDollarSign size={28} />,
        title: "Cash on Home Delivery",
        desc: "100% cash-on-delivery service available nationwide with guaranteed product safety.",
    },
    {
        icon: <FiBriefcase size={28} />,
        title: "Corporate / Contract Logistics",
        desc: "Customized corporate service including warehouse & inventory management solutions.",
    },
    {
        icon: <FiRefreshCw size={28} />,
        title: "Parcel Return",
        desc: "Hassle-free return & exchange logistics facility available for all service tiers.",
    },
];

const Ourservices = () => {
    const [active, setActive] = useState(null);

    return (
        <section className="my-12">
            {/* Dark teal container */}
            <div
                className="relative overflow-hidden rounded-[var(--radius-2xl)] py-20 px-4 sm:px-8"
                style={{ background: 'linear-gradient(135deg, var(--teal) 0%, #055a63 60%, #032b30 100%)' }}
            >
                {/* Decorative orbs */}
                <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[var(--lime)]/10 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[var(--lime)]/8 blur-3xl pointer-events-none" />

                {/* Heading */}
                <div className="text-center mb-14 relative z-10">
                    <span className="inline-block bg-[var(--lime)]/15 text-[var(--lime)] border border-[var(--lime)]/30 rounded-full px-4 py-1 text-xs font-bold uppercase tracking-widest mb-3">
                        Our Services
                    </span>
                    <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold text-white leading-tight">
                        Everything You Need<br />
                        <span style={{ color: 'var(--lime)' }}>to Deliver with Confidence</span>
                    </h2>
                    <p className="text-white/55 mt-4 max-w-md mx-auto text-sm leading-relaxed">
                        Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle — all in one platform.
                    </p>
                </div>

                {/* Service cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto relative z-10">
                    {services.map((service, index) => {
                        const isActive = active === index;
                        return (
                            <div
                                key={index}
                                onClick={() => setActive(isActive ? null : index)}
                                className={`cursor-pointer rounded-2xl p-6 border transition-all duration-300 group ${isActive
                                    ? 'bg-[var(--lime)] border-[var(--lime)] text-[var(--teal)] shadow-[0_8px_32px_rgba(202,235,102,0.4)] scale-[1.03]'
                                    : 'bg-white/7 border-white/10 text-white hover:border-[var(--lime)]/50 hover:bg-white/12 hover:scale-[1.02]'
                                    }`}
                            >
                                {/* Icon */}
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 ${isActive
                                    ? 'bg-[var(--teal)] text-[var(--lime)]'
                                    : 'bg-[var(--lime)]/15 text-[var(--lime)] group-hover:bg-[var(--lime)]/25'
                                    }`}
                                >
                                    {service.icon}
                                </div>

                                <h3 className={`font-bold text-base mb-2 ${isActive ? 'text-[var(--teal)]' : 'text-white'}`}>
                                    {service.title}
                                </h3>
                                <p className={`text-sm leading-relaxed ${isActive ? 'text-[var(--teal)]/75' : 'text-white/55'}`}>
                                    {service.desc}
                                </p>

                                {/* Active indicator */}
                                <div className={`mt-4 flex items-center gap-2 text-xs font-bold transition-all duration-300 ${isActive ? 'text-[var(--teal)] opacity-100' : 'opacity-0'}`}>
                                    ✓ Selected
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Ourservices;
