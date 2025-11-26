import React, { useState } from "react";

const services = [
  {
    title: "Express & Standard Delivery",
    desc: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi.",
  },
  {
    title: "Nationwide Delivery",
    desc: "We deliver parcels nationwide with home delivery ensuring products reach customers within 48–72 hours.",
  },
  {
    title: "Fulfillment Solution",
    desc: "We offer customized service with inventory management, online order processing & packaging support.",
  },
  {
    title: "Cash on Home Delivery",
    desc: "100% cash-on-delivery service available nationwide with guaranteed product safety.",
  },
  {
    title: "Corporate Service / Contract In Logistics",
    desc: "Customized corporate service including warehouse & inventory management.",
  },
  {
    title: "Parcel Return",
    desc: "Return or exchange parcels through our hassle-free return logistics facility.",
  },
];

const Ourservices = () => {
  const [activeCard, setActiveCard] = useState(null);

  return (
    <div className="bg-secondary py-16 px-4 rounded-3xl my-10">

      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-white">Our Services</h2>
        <p className="text-gray-200 mt-2">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {services.map((service, index) => {
          const isActive = activeCard === index;

          return (
            <div
              key={index}
              onClick={() => setActiveCard(index)}
              className={`
                p-6 rounded-xl shadow-md text-center cursor-pointer transition-transform duration-300
                ${isActive ? "bg-[#B4E60D] text-black scale-110" : "bg-white text-gray-800 hover:scale-105"}
              `}
            >
              <div className="w-14 h-14 mx-auto mb-4">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/848/848043.png"
                  alt="icon"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
              <p className="text-sm leading-relaxed">{service.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Ourservices;
