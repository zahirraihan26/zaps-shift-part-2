import React, { use } from 'react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Reviewcard from './Reviewcard';

const Reviwes = ({ reviewspromise }) => {
    const reviews = use(reviewspromise)
    console.log(reviews)

    return (
        <div className='my-24'>
            <div className='text-center mb-24'>
                <h3 className="text-3xl text-center font-bold my-8">Review</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum facilis perspiciatis sed suscipit nostrum ab dicta quas, illum libero expedita consequuntur earum ipsum atque laborum. Molestias nostrum autem nesciunt consectetur.</p>


            </div>

            <Swiper
                loop={true}
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={3}
                coverflowEffect={{
                    rotate: 30,
                    stretch: "50%",
                    depth: 200,
                    scale: 0.75,
                    modifier: 1,
                    slideShadows: true,
                }}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination,Autoplay]}
                className="mySwiper"
            >
                {
                    reviews.map(review => <SwiperSlide key={review.id}>
                        <Reviewcard review={review}></Reviewcard>
                    </SwiperSlide>)
                }

            </Swiper>

        </div>
    );
};

export default Reviwes;