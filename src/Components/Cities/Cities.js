import * as React from "react";
import Footer from "../Footer/Footer";
import Video from "../Assests/videofondo.mp4";
import NotFound from "../Assests/notfound.png";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

/* NO FUNCIONA EL FOOTER EN CITIES */

export default function Cities() {
  const [ciudades, setCiudades] = useState([]); //impresion dinámica
  const [todasLasCiudades, setTodasLasCiudades] = useState([]); //cambios de lo dinámico a través del search e impresion de lo buscado
  const [busqueda, setBusqueda] = useState(""); //cambios en el search
  console.log(useParams());
  const peticionGet = async () => {
    //Peticion de informacion a la Api con Axios
    await axios
      .get("http://localhost:4000/api/allcities")
      .then((response) => {
        console.log(response.data.response.ciudades);
        setCiudades(response.data.response.ciudades);
        setTodasLasCiudades(response.data.response.ciudades);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const cambioBusqueda = (buscando) => {
    //Paso como parámetro lo que se escribe en el intput para setbusqueda y filtrarbusqueda
    setBusqueda(buscando.target.value);
    filtrarBusqueda(buscando.target.value);
  };

  const filtrarBusqueda = (terminoBusqueda) => {
    let resultadoBusqueda = todasLasCiudades.filter((elemento) => {
      if (
        elemento.name
          .toString()
          .toLowerCase()
          .startsWith(terminoBusqueda.toLowerCase().trim()) ||
        elemento.country
          .toString()
          .toLowerCase()
          .startsWith(terminoBusqueda.toLowerCase().trim())
      ) {
        return elemento;
      }
    });
    setCiudades(resultadoBusqueda);
    console.log(resultadoBusqueda);
    console.log(ciudades._id);
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
        {ciudades.length !== 0 ? (
          ciudades.map((ciudad) => (
            <div class="card">
              <div className="conteinerimgcard">
                <img className="imgcard" src={ciudad.image} />
              </div>
              <div className="conteinertextocard">
                <h3 className="titulocard">{ciudad.name} </h3>
                <p className="descripcioncard">- Country: {ciudad.country} </p>
                <p className="descripcioncard">- Language: {ciudad.language}</p>
                <p className="descripcioncard">- Coin: {ciudad.coin} </p>
                <Link to={`/Details/${ciudad._id}`}>
                  <div className="contenedorbuttoncities">
                    <button class="btndetails">Details</button>
                  </div>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="conteinernotfound">
            <img className="imgnotfound" src={NotFound} />
            <h2 className="titulocities">
              I'm sorry, I can't find it. Try again.
            </h2>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}
