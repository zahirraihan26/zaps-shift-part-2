import React, { useEffect } from "react";
import { FaTruck, FaHandHoldingUsd, FaWarehouse, FaBuilding } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const services = [
    {
        icon: <FaTruck className="text-[var(--teal)] text-2xl" />,
        title: "Booking Pick & Drop",
        desc: "Schedule door-to-door package pickups and drop-offs in just a few taps.",
        delay: 100,
        gradient: "from-[var(--lime)]/20 to-[var(--lime)]/5",
    },
    {
        icon: <FaHandHoldingUsd className="text-[var(--teal)] text-2xl" />,
        title: "Cash On Delivery",
        desc: "Collect payments on delivery — hassle-free and trusted nationwide.",
        delay: 250,
        gradient: "from-emerald-100/60 to-emerald-50/20",
    },
    {
        icon: <FaWarehouse className="text-[var(--teal)] text-2xl" />,
        title: "Delivery Hub",
        desc: "Store, manage and dispatch from our distributed delivery hubs across Bangladesh.",
        delay: 400,
        gradient: "from-sky-100/60 to-sky-50/20",
    },
    {
        icon: <FaBuilding className="text-[var(--teal)] text-2xl" />,
        title: "Booking SME & Corporate",
        desc: "Tailored logistics solutions for small businesses and large enterprises alike.",
        delay: 550,
        gradient: "from-violet-100/60 to-violet-50/20",
    },
];

const Howitwork = () => {
    useEffect(() => {
        AOS.init({ duration: 800, easing: "ease-out-cubic", once: true });
    }, []);

    return (
        <section className="py-20 px-4 sm:px-6 bg-[#f8faf4] relative overflow-hidden">
            {/* Decorative blobs */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-24 bg-[var(--lime)]/10 blur-3xl rounded-full pointer-events-none" />

            <div className="max-w-6xl mx-auto">
                {/* Heading */}
                <div className="text-center mb-16" data-aos="fade-up">
                    <span className="section-tag">🚀 How It Works</span>
                    <h2 className="section-title mt-3">Four Steps to Fast Delivery</h2>
                    <p className="text-[var(--teal)]/60 mt-3 max-w-xl mx-auto text-base">
                        Simple, transparent, and lightning-fast — from booking to doorstep delivery.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="premium-card group cursor-pointer"
                            data-aos="fade-up"
                            data-aos-delay={service.delay}
                        >
                            {/* Card top gradient strip */}
                            <div className={`h-1.5 w-full bg-gradient-to-r ${service.gradient} group-hover:bg-[var(--lime)] transition-all duration-300`} />

                            <div className="p-6 flex flex-col gap-4">
                                {/* Step number + icon */}
                                <div className="flex items-center justify-between">
                                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                                        {service.icon}
                                    </div>
                                    <span className="text-4xl font-black text-[var(--teal)]/8 group-hover:text-[var(--lime)]/40 transition-colors duration-300 select-none">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                </div>

                                <h3 className="font-bold text-base text-[var(--teal)] leading-snug">{service.title}</h3>
                                <p className="text-sm text-[var(--teal)]/60 leading-relaxed">{service.desc}</p>

                                {/* Animated arrow */}
                                <div className="flex items-center gap-1 text-xs font-bold text-[var(--teal)]/40 group-hover:text-[var(--teal)] transition-colors duration-300 mt-auto pt-2">
                                    Learn more
                                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Howitwork;
