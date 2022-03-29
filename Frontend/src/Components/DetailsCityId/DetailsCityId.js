import * as React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Footer from "../Footer/Footer";
import { connect } from "react-redux";
import citiesActions from "../Redux/actions/citiesActions";
import itinerariesActions from "../Redux/actions/itinerariesActions";
import ItineraryDetails from "../DetailsCityId/ItineraryDetails";
import { useState } from "react";

function DetailsCityId(props) {
  const { id } = useParams();

  console.log(props);

  const { city, user, itineraries } = props;

  useEffect(() => {
    props.findOneCity(id);
    props.itinerarioPorCiudad(id);
  }, []);

  console.log(props.itineraries);

  return (
    <>
      <div className="DetailsCard">
        {city._id && (
          <div className="carddetails">
            <div className="tituloItinerario">
              <div className="descriptionitinerarytitulo">
                <h1 className="titulocard">{city.city} </h1>
              </div>
              <img className="imgdetails" src={city.image} />
            </div>

            <div className="d-flex flex-column">
              <ItineraryDetails />
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
    user: state.userReducer.user,
  };
};

const mapDispatchToProps = {
  findOneCity: citiesActions.findOneCity,
  itinerarioPorCiudad: itinerariesActions.itinerarioPorCiudad,
};
export default connect(mapStateToProps, mapDispatchToProps)(DetailsCityId);
