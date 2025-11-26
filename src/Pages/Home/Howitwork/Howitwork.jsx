import React, { useEffect } from "react";
import { FaTruck } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const Howitwork = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,       // animation speed
      easing: "ease-in-out", // smooth animation
      once: true,           // animate only once
    });
  }, []);

  const services = [
    {
      title: "Booking Pick & Drop",
      desc: "From personal packages to business shipments — we deliver on time, every time.",
      delay: 100,
    },
    {
      title: "Cash On Delivery",
      desc: "From personal packages to business shipments — we deliver on time, every time.",
      delay: 300,
    },
    {
      title: "Delivery Hub",
      desc: "From personal packages to business shipments — we deliver on time, every time.",
      delay: 500,
    },
    {
      title: "Booking SME & Corporate",
      desc: "From personal packages to business shipments — we deliver on time, every time.",
      delay: 700,
    },
  ];

  return (
    <div className="py-10 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2
          className="text-3xl font-bold mb-10 text-center"
          data-aos="zoom-in-up"
        >
          How it Works
        </h2>

        <div className="flex flex-wrap gap-5 justify-between">
          {services.map((service, index) => (
            <div
              key={index}
              className="w-full sm:w-[48%] lg:w-[23%] bg-white rounded-xl shadow p-6 hover:shadow-lg transition transform hover:scale-105"
              data-aos="zoom-in-up"
              data-aos-delay={service.delay}
            >
              <FaTruck className="text-4xl text-green-800 mb-4" />
              <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Howitwork;
