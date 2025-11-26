import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const Reviewcard = ({ review }) => {

    const { userName,review:testimoneal,user_photoURL } = review
    return (
        <div className="card w-full max-w-sm bg-base-100 shadow-md p-6 rounded-xl">
            {/* Quote Icon */}
            <FaQuoteLeft className="text-4xl text-cyan-400 mb-3" />

            {/* Description */}
            <p className="leading-relaxed">
              {testimoneal}
            </p>

            {/* Divider */}
            <div className="border-t border-dashed mt-4 mb-4"></div>

            {/* User Info */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-900"> 
                    <img src={user_photoURL} alt="" />
                </div>

                <div>
                    <h3 className="font-semibold text-teal-900">{userName}</h3>
                    <p className="text-sm text-gray-500">Senior Product Designer</p>
                </div>
            </div>
        </div>
    );
};

export default Reviewcard;