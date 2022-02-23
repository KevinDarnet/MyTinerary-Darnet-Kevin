import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../Styles/styles.css";
import Datos from "../Json/datos";
import { Autoplay, Pagination, Navigation } from "swiper";

export default function App() {
  return (
    <div className="divcarousel">
      <div>
        <h1 className="hcarousel">Popular MyTineraries</h1>
      </div>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        breakpoints={{
          "@0.00": {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 10,
          },
          "@0.75": {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 10,
          },
          "@1.00": {
            slidesPerView: 3,
            slidesPerGroup: 2,
            spaceBetween: 10,
          },
          "@1.50": {
            slidesPerView: 4,
            slidesPerGroup: 4,
            spaceBetween: 10,
          },
        }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {Datos.map((datos) => (
          <SwiperSlide>
            <div className="div">
              <img className="imgcarousel" src={datos.image} />
              <h3 className="titulocarousel">{datos.name}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}