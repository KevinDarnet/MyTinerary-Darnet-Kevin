import * as React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import imageConstruction from "../Assests/imgunderconstruction.png";

export default function CardDetail() {
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
        <div className="divconstruction">
          <img className="imgconstruction" src={imageConstruction} />
          <h3 className="descripcioncard">UNDER CONSTRUCTION</h3>
        </div>
        {cityId?.length !== 0 ? (
          cityId?.map((printID) => (
            <div class="card">
              <div className="conteinerimgcard">
                <img className="imgcard" src={printID.image} />
              </div>
              <div className="conteinertextocard">
                <h3 className="titulocard">{printID.name} </h3>
                <p className="descripcioncard">- Country: {printID.country} </p>
                <p className="descripcioncard">
                  - Language: {printID.language}
                </p>
                <p className="descripcioncard">- Coin: {printID.coin} </p>
              </div>
            </div>
          ))
        ) : (
          <h1>Ciudad no Encontrada</h1>
        )}
      </div>
    </>
  );
}
