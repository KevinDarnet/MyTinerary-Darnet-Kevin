import * as React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../Footer/Footer";
import CardDetail from "../CardDetails/CardDetail";

export default function DetailsCityId() {
  const { id } = useParams();

  const [cityId, setCityId] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/allcities")
      .then((response) =>
        setCityId(
          response.data.response.ciudades.filter((cities) => cities._id === id)
        )
      );
  }, []);

  return (
    <>
      <h1 className="titulocities">Details</h1>
      <div className="DetailsCard">
        {cityId?.map((printID) => (
          <div class="carddetails">
            <div className="conteinerimgdetails">
              <img className="imgdetails" src={printID.image} />
            </div>
            <div className="conteinertextocarddetails">
              <div className="conteinerdatadetails">
                <h3 className="titulocard">{printID.city} </h3>
                <p className="descripcioncard">- Country: {printID.country}</p>
                <p className="descripcioncard">
                  - Language: {printID.language}
                </p>
                <p className="descripcioncard">- Coin: {printID.coin}</p>
                <p className="descripcioncard">
                  - Description: {printID.description}{" "}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="conteinercarddetalles">
        <CardDetail />
      </div>
      <Footer />;
    </>
  );
}
