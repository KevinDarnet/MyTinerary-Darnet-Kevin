import * as React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import CardDetail from "../CardDetails/CardDetails";
import { connect } from "react-redux";
import citiesActions from "../Redux/actions/citiesActions";
import itinerariesActions from "../Redux/actions/itinerariesActions";

function DetailsCityId(props) {
  const { id } = useParams();
  console.log(props);

  const { city, itineraries } = props;
  console.log(itineraries);
  console.log(city);

  useEffect(() => {
    props.findOneCity(id);
    props.itinerarioPorCiudad(id);
  }, []);

  return (
    <>
      <div className="DetailsCard">
        {city._id && (
          <div className="carddetails">
            <h1 className="titulocard">{city.city} </h1>
            <img className="imgdetails" src={city.image} />
            <div className="conteinercarddetalles">
              {<CardDetail itineraries={itineraries} />}
            </div>
          </div>
        )}
      </div>
      <Footer />;
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    city: state.Data.city,
    itineraries: state.itinerariesReducers.itineraries,
  };
};

const mapDispatchToProps = {
  findOneCity: citiesActions.findOneCity,
  itinerarioPorCiudad: itinerariesActions.itinerarioPorCiudad,
};
export default connect(mapStateToProps, mapDispatchToProps)(DetailsCityId);
