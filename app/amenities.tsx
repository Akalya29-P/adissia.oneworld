'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import PageWrapper from './pagewrapper';

const amenities = [
  {
    title: 'Kids Play Zone',
    img: '/image/kidsplay-zone.jpg',
  },
  {
    title: 'Turf',
    img: '/image/turf.jpg',
  },
  {
    title: 'Outdoor Fitness',
    img: '/image/outdoor-fitness.jpg',
  },
  {
    title: 'Basket Ball Court',
    img: '/image/basket-ball.jpg',
  },
  {
    title: 'Pickle Ball Court',
    img: '/image/pickle-ball.jpg',
  },
];

export default function AmenitiesSection() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', description: '' });

  const openModal = (item: { title: string; description: string }) => {
    setModalContent(item);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  return (
    <PageWrapper>
    <section className="bg-gradient-to-b from-[#f0f0f0] to-white py-4 py-md-5">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
        {/* Left Content */}
        <div data-aos="fade-right">
          <h1 className="text-5xl font-black text-gray-900 mb-4 text-blue robot-text-style fs-60px text-center text-md-start">
            <b>World-Class Amenities for a Lifestyle of Comfort and Convenience <span className=""><br className='d-block d-md-none'/></span></b>
          </h1>
          <p className="font-poppins text-center text-md-start fs-sm-5">
         One World isn’t just about plots—it’s about lifestyle. Our project is thoughtfully designed with modern infrastructure and community-focused features that enhance living and add long-term value.
          </p>

          {/* Arrows */}
          <div className="flex gap-4 mt-8 justify-content-center justify-content-md-start">
            <button
              ref={prevRef}
              className="w-14 h-14 rounded-full border-amenities border-gray-300 flex items-center justify-center text-2xl bg-yellow1"
            >
              ←
            </button>
            <button
              ref={nextRef}
              className="w-14 h-14 rounded-full border-amenities border-gray-300 flex items-center justify-center text-2xl bg-yellow1"
            >
              →
            </button>
          </div>
        </div>

        {/* Swiper */}
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          breakpoints={{
            768: {
              slidesPerView: 2, // 2 slides on tablet and up
            },
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            // @ts-ignore
            swiper.params.navigation.prevEl = prevRef.current;
            // @ts-ignore
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          loop
          modules={[Navigation]}
          className="w-full"
        >
          {amenities.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="relative overflow-hidden rounded-lg shadow-md" data-aos="fade-left">
                <Image
                  src={item.img}
                  alt={item.title}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-black/30 hover:bg-black/50 flex items-center justify-center cursor-pointer transition" />
                <div className="absolute bottom-4 left-4 text-white text-xl font-bold drop-shadow-lg">
                  {item.title}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
    </PageWrapper>
  );
}
