import React, { useRef, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "./styles.css";
import Carousel from "./Carousel";
import { Link as LinkRouter } from "react-router-dom";
import Calltoaction from "./Calltoaction";
import Footer from "./Footer";
import Logomytinerary from "./Assests/Logomytinerary.png";

export default function App() {
  return (
    <>
      <div className="conteinerHeader">
        <div className="conteinerlogoinheader">
          <img className="logoinheader" src={Logomytinerary} />
        </div>
        <div className="conteinertitlogo">
          <h1 className="tituloheader">
            Find your perfect trip, designed by insiders who know and love their
            cities!
          </h1>

          <div className="buttoncitties">
            <LinkRouter to="Citties" className="linkresp">
              <button className="btnhome">Citties</button>
            </LinkRouter>
          </div>
        </div>
      </div>
      <div className="divcalltoaction">
        <Calltoaction />
      </div>

      <div className="conteinerCarousel">
        <Carousel />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}
