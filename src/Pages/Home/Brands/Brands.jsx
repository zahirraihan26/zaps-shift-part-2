import React from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import amazon from '../../../assets/brands/amazon.png';
import amazon_vector from '../../../assets/brands/amazon_vector.png';
import casio from '../../../assets/brands/casio.png';
import moonstar from '../../../assets/brands/moonstar.png';
import randstad from '../../../assets/brands/randstad.png';
import star from '../../../assets/brands/star.png';
import start_peoplefrom from '../../../assets/brands/start_people.png';
import { Autoplay } from 'swiper/modules';

const brandsLogos = [amazon, amazon_vector, casio, moonstar, randstad, star, start_peoplefrom];

const Brands = () => {
    return (
        <section className="py-14 px-4 sm:px-6 bg-[#f8faf4]">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-10">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--lime)] to-transparent" />
                    <p className="text-xs font-bold uppercase tracking-widest text-[var(--teal)]/50 whitespace-nowrap px-4">
                        Trusted by leading brands
                    </p>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--lime)] to-transparent" />
                </div>

                {/* Swiper */}
                <Swiper
                    loop={true}
                    slidesPerView={2}
                    spaceBetween={30}
                    grabCursor={true}
                    modules={[Autoplay]}
                    autoplay={{ delay: 2000, disableOnInteraction: false }}
                    breakpoints={{
                        480:  { slidesPerView: 3 },
                        768:  { slidesPerView: 4 },
                        1024: { slidesPerView: 5 },
                    }}
                    className="brands-swiper"
                >
                    {brandsLogos.map((logo, index) => (
                        <SwiperSlide key={index}>
                            <div className="flex items-center justify-center py-3 px-4 grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-500 hover:drop-shadow-[0_0_12px_rgba(202,235,102,0.6)] hover:scale-110 cursor-pointer">
                                <img src={logo} alt={`brand-${index}`} className="max-h-12 object-contain" />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default Brands;