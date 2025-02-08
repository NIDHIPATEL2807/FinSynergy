import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    name: "Aarav Mehta",
    username: "@aarav_fin",
    text: "FinSynergy has transformed the way I manage investments. The AI-driven insights are incredibly accurate!",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Neha Kapoor",
    username: "@neha_trader",
    text: "With FinSynergy, financial planning has never been easier. The analytics dashboard is a game-changer.",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    name: "Rohan Verma",
    username: "@rohan_fx",
    text: "The automation tools in FinSynergy help me optimize trades and track market trends effortlessly.",
    image: "https://randomuser.me/api/portraits/men/50.jpg",
  },
];

const Testimonials = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 5000, // Faster speed for marquee effect
    slidesToShow: 2.5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
  };

  return (
    <div className="w-full text-black py-12 px-4 text-center">
      <h2 className="text-3xl font-bold">Trusted by Financial Experts & Investors</h2>
      <p className="text-lg text-gray-600 mb-6">
        Join thousands of users optimizing their finances with <strong>FinSynergy</strong>
      </p>

      <div className="w-full mx-auto overflow-hidden">
        <Slider {...settings}>
          {testimonials.map((item, index) => (
            <div key={index} className="p-4">
              <div className="bg-gray-100 p-5 rounded-xl shadow-2xl hover:scale-105 transition">
                <div className="flex items-center gap-4 mb-4">
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded-full border-2 border-gray-700" />
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.username}</p>
                  </div>
                </div>
                <p className="text-black">{item.text}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Testimonials;
