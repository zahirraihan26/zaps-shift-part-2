import React from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const Reviewcard = ({ review }) => {
    const { userName, review: testimonial, user_photoURL, rating } = review;
    const stars = rating || 5;

    return (
        <div className="premium-card p-6 flex flex-col gap-4 h-full relative overflow-hidden group">
            {/* Decorative lime accent */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-[var(--lime)]/10 rounded-bl-[40px] pointer-events-none transition-all duration-300 group-hover:w-28 group-hover:h-28" />

            {/* Quote icon */}
            <FaQuoteLeft className="text-2xl text-[var(--lime)]" />

            {/* Stars */}
            <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar
                        key={i}
                        className={`text-sm ${i < stars ? 'text-amber-400' : 'text-gray-200'}`}
                    />
                ))}
            </div>

            {/* Testimonial text */}
            <p className="text-sm text-[var(--teal)]/70 leading-relaxed flex-1 italic">
                "{testimonial}"
            </p>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-[var(--lime)]/40 via-[var(--lime)]/10 to-transparent" />

            {/* User info */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border-2 border-[var(--lime)] overflow-hidden flex-shrink-0 bg-[var(--teal)]">
                    {user_photoURL
                        ? <img src={user_photoURL} alt={userName} className="w-full h-full object-cover" />
                        : <div className="w-full h-full flex items-center justify-center text-[var(--lime)] font-bold text-sm">
                            {userName?.[0]}
                          </div>
                    }
                </div>
                <div>
                    <h3 className="font-bold text-sm text-[var(--teal)]">{userName}</h3>
                    <p className="text-xs text-[var(--teal)]/50">Verified Customer</p>
                </div>
            </div>
        </div>
    );
};

export default Reviewcard;