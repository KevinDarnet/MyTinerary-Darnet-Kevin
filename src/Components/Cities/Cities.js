import * as React from "react";
import "../Styles/cities.css";
import Footer from "../Footer/Footer";
import Datos from "../Json/datos";
/* NO FUNCIONA EL FOOTER EN CITIES */

export default function Cities() {
  return (
    <>
      <div className="conteinertituloysearch">
        <h1 className="titulocities">Look for your next adventure</h1>
        <div class="inputsearch">
          <input className="inputsearch" placeholder="Search now" />
        </div>
      </div>
      <section className="conteinercard">
        {Datos.map((datos) => (
          <div class="card">
            <img className="imgcard" src={datos.image} />
            <h3 className="titulocard">{datos.name}</h3>
            <p className="descripcioncard">{datos.lugar}</p>
          </div>
        ))}
      </section>
      <Footer />
    </>
  );
}
