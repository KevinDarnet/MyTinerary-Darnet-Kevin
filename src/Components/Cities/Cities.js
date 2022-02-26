import * as React from "react";
import Footer from "../Footer/Footer";
import Video from "../Assests/videofondo.mp4";
import axios from "axios";
import { useEffect, useState } from "react";
/* NO FUNCIONA EL FOOTER EN CITIES */

export default function Cities() {
  const [ciudades, setCiudades] = useState([]); //impresion dinámica
  const [todasLasCiudades, setTodasLasCiudades] = useState([]); //cambios de lo dinámico a través del search
  const [busqueda, setBusqueda] = useState(""); //cambios en el search

  const peticionGet = async () => {
    await axios
      .get("http://localhost:4000/api/allcities")
      .then((response) => {
        setCiudades(response.data.response.ciudades);
        setTodasLasCiudades(response.data.response.ciudades);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const cambioBusqueda = (buscando) => {
    setBusqueda(buscando.target.value);
    filtrarBusqueda(buscando.target.value);
  };

  const filtrarBusqueda = (terminoBusqueda) => {
    let resultadoBusqueda = todasLasCiudades.filter((elemento) => {
      if (
        elemento.name
          .toString()
          .toLowerCase()
          .startsWith(terminoBusqueda.toLowerCase()) ||
        elemento.country
          .toString()
          .toLowerCase()
          .startsWith(terminoBusqueda.toLowerCase())
      ) {
        return elemento;
      }
    });
    setCiudades(resultadoBusqueda);
  };

  useEffect(() => {
    peticionGet();
  }, []);

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
            height: "42%",
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
          <input
            className="inputsearch"
            placeholder="Search City or Country"
            value={busqueda}
            onChange={cambioBusqueda}
          />
        </div>
      </div>

      <section className="conteinercard">
        {ciudades.map((ciudad) => (
          <div class="card">
            <div className="conteinerimgcard">
              <img className="imgcard" src={ciudad.image} />
            </div>
            <div className="conteinertextocard">
              <h3 className="titulocard">{ciudad.name} </h3>
              <p className="descripcioncard">- Country: {ciudad.country} </p>
              <p className="descripcioncard">- Language: {ciudad.language} </p>
              <p className="descripcioncard">- Coin: {ciudad.coin} </p>
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
