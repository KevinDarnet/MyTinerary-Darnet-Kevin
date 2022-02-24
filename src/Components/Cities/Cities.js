import * as React from "react";
import Footer from "../Footer/Footer";
import Datos from "../Json/datos";
import Video from "../Assests/videofondo.mp4";
import ArrowDown from "../Assests/arrowdown.png";
/* NO FUNCIONA EL FOOTER EN CITIES */

export default function Cities() {
  return (
    <>
      <div className="video">
        <video
          loop
          autoPlay
          muted
          style={{
            position: "absolute",
            width: "100%",
            height: "65%",
            objectFit: "cover",
            transform: "translate (-50%, -50%)",
            zInedx: "-10",
          }}
        >
          <source src={Video} type="video/mp4" />
        </video>
      </div>
      <div className="conteinertituloysearch">
        <h1 className="titulocities">Look for your next adventure</h1>
        <div class="inputsearch">
          <input className="inputsearch" placeholder="Search now" />
        </div>
      </div>

      <section className="conteinercard">
        <div className="conteinertitleandlogdown">
          <img className="arrowdown" src={ArrowDown} />
        </div>
        {Datos.map((datos) => (
          <div class="card">
            <div className="conteinerimgcard">
              <img className="imgcard" src={datos.image} />
            </div>
            <div className="conteinertextocard">
              <h3 className="titulocard">{datos.name}</h3>
              <p className="descripcioncard">- Lugar: {datos.lugar}</p>
              <p className="descripcioncard">- Idioma: {datos.idioma}</p>
              <p className="descripcioncard">- Moneda: {datos.moneda}</p>
              <div className="contenedorbuttoncities">
                <button class="btndetails">Detalils</button>
              </div>
            </div>
          </div>
        ))}
      </section>
      <Footer />
    </>
  );
}
