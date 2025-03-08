"use client";

import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import Image from "next/image";
import { PlayCircle, PauseCircle } from "lucide-react";
import furniture1 from "@/assets/furniture1.png";
import furniture2 from "@/assets/furniture2.png";
import furniture3 from "@/assets/furniture3.png";
import { Swiper as SwiperType } from "swiper"; // Import Swiper type

const images = [furniture1, furniture2, furniture3, furniture1, furniture2, furniture3];

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const swiperRef = useRef<SwiperType | null>(null); // Properly typed ref

  const toggleAutoplay = () => {
    if (swiperRef.current) {
      if (isPlaying) {
        swiperRef.current.autoplay.stop();
      } else {
        swiperRef.current.autoplay.start();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative h-full flex flex-col items-center mt-48 justify-center">
      <div className="relative w-full">
        {/* Swiper Component */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={10}
          slidesPerView={5}
          centeredSlides={true}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            0: { slidesPerView: 1 },
            600: { slidesPerView: 3 },
            1000: { slidesPerView: 5 },
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          onSwiper={(swiper) => (swiperRef.current = swiper)} // Assign instance
          className="w-full relative z-0"
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <div
                className={`cursor-pointer transition-transform duration-500 ${
                  activeIndex === index ? "scale-110" : "scale-90 opacity-80"
                }`}
              >
                <Image
                  src={src}
                  alt={`Furniture ${index + 1}`}
                  width={300}
                  height={700}
                  className="rounded-lg shadow-lg h-[400px] w-[600px]"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Play/Pause Button */}
        <button
          onClick={toggleAutoplay}
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:scale-110 transition-all z-10"
          aria-label={isPlaying ? "Pause Slideshow" : "Play Slideshow"}
        >
          {isPlaying ? (
            <PauseCircle size={60} className="text-gray-800" />
          ) : (
            <PlayCircle size={60} className="text-gray-800" />
          )}
        </button>
      </div>

      {/* Custom Navigation Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => swiperRef.current?.slideToLoop(index)}
            className={`w-8 h-2 rounded-full transition-all ${
              activeIndex === index ? "bg-gray-800 w-10" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
