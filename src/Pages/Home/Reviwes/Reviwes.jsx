import React, { use, Suspense } from 'react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import Reviewcard from './Reviewcard';

const ReviewsInner = ({ reviewspromise }) => {
    const reviews = use(reviewspromise);

    return (
        <Swiper
            loop={true}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1}
            spaceBetween={24}
            autoplay={{ delay: 2800, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            modules={[Autoplay, Pagination]}
            breakpoints={{
                640:  { slidesPerView: 1.5 },
                900:  { slidesPerView: 2.2 },
                1200: { slidesPerView: 3 },
            }}
            className="pb-12"
        >
            {reviews.map(review => (
                <SwiperSlide key={review.id} className="h-auto">
                    <Reviewcard review={review} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

const Reviwes = ({ reviewspromise }) => {
    return (
        <section className="py-20 px-4 sm:px-6 bg-[#f8faf4] relative overflow-hidden">
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--lime)]/10 rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--teal)]/5 rounded-full blur-3xl pointer-events-none -translate-x-1/3 translate-y-1/3" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Heading */}
                <div className="text-center mb-14">
                    <span className="section-tag">💬 Customer Reviews</span>
                    <h2 className="section-title mt-3">What Our Clients Say</h2>
                    <p className="text-[var(--teal)]/60 mt-3 max-w-lg mx-auto text-base">
                        Thousands of happy customers trust ZapShift to delivery their parcels on time, every time.
                    </p>
                </div>

                {/* Cards Swiper */}
                <Suspense fallback={
                    <div className="flex gap-5 overflow-hidden">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="premium-card p-6 flex-1 min-w-[280px] animate-pulse">
                                <div className="h-4 w-1/3 bg-[var(--teal)]/10 rounded mb-4" />
                                <div className="h-3 w-full bg-[var(--teal)]/8 rounded mb-2" />
                                <div className="h-3 w-4/5 bg-[var(--teal)]/8 rounded mb-2" />
                                <div className="h-3 w-3/5 bg-[var(--teal)]/8 rounded" />
                            </div>
                        ))}
                    </div>
                }>
                    <ReviewsInner reviewspromise={reviewspromise} />
                </Suspense>
            </div>
        </section>
    );
};

export default Reviwes;