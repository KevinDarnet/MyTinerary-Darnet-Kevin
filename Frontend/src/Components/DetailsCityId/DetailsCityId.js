import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { connect } from "react-redux";
import citiesActions from "../Redux/actions/citiesActions";
import itinerariesActions from "../Redux/actions/itinerariesActions";
import Footer from "../Footer/Footer";
import { useState } from "react";
import Swal from "sweetalert2";
import "../Styles/itineraryDetails.css";
import Activities from "./Activities";

const DetailsCityId = (props) => {
  

  const [reload, setReload] = useState();

  const { city } = props;

  const { id } = useParams();

  async function likesOrDislikes(id) {
    console.log(id)
    await props.likeDislike(id);
    setReload(!reload);
  }

  async function noUser() {
    Swal.fire({
      icon: "warning",
      title: "You have to be logged to like it",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  useEffect(() => {
    props.findOneCity(id);
    props.itinerarioPorCiudad(id);
  }, [!reload]);

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
            {/* PRINT ITINERARIES */}
            <div className="d-flex flex-column">
              {props.itineraries.length ? (
                props.itineraries.map((itinerary, index) => (
                
                  <div className="card2 mb-3 cardDetail2">
                    
                   
                    <div className="ConteinerUser">
                      <img className="imguser" src={itinerary?.userimage} />
                      <h2 className="card-user">{itinerary?.username}</h2>
                    </div>
                    <h1 className="card-title2">{itinerary?.name}</h1>
                    <div>
                      <img className="imgitinerary" src={itinerary?.image} />
                    </div>
                    <div className="card-body">
                      <p className="card-p2">
                        Description: {itinerary?.details}{" "}
                      </p>
                      <p className="card-p2">Duration: {itinerary?.duration}</p>
                      <p className="card-p2">Hashtag: {itinerary?.hashtag}</p>
                      <p className="card-p2">
                        Price:{"💵".repeat(parseInt(itinerary.price))}
                      </p>
                      <div className="likeDislike">
                        {props?.user ? (
                          <button
                            className="buttonLike"
                            id={itinerary?._id}
                            onClick={()=>likesOrDislikes(itinerary._id)}
                          >
                            {itinerary?.likes.includes(props.user.id) ? (
                              <button
                                style={{ color: "red", fontSize: 30 }}
                                className="material-icons"
                              >
                                favorite
                              </button>
                            ) : (
                              <span
                                style={{ fontSize: 30 }}
                                className="material-icons"
                              >
                                favorite_border
                              </span>
                            )}
                          </button>
                        ) : (
                          <span
                            onClick={noUser}
                            style={{ fontSize: 30 }}
                            className="material-icons"
                          >
                            favorite_border
                          </span>
                        )}
                        <h3 style={{ color: "black ", fontSize: 30 }}>
                          {itinerary?.likes.length}
                        </h3>
                      </div>
                    </div>
                    <div className="accordion" id={itinerary?.name}>
                      <div className="accordion-item">
                        <h2
                          className="accordion-header"
                          id={"heading" + itinerary?.name}
                        ></h2>
                        <div
                          id={itinerary?.name.replace(/ /g, "").slice(0, 5)}
                          className="accordion-collapse collapse "
                          aria-labelledby={"heading" + itinerary?.name}
                          data-bs-parent={"#" + itinerary?.name}
                        ></div>
                      </div>
                    </div>
                    <div className="accordion" id={itinerary?.name}>
                      <div className="accordion-item">
                        <h2
                          className="accordion-header"
                          id={"heading" + itinerary?.name}
                        >
                          <button
                            className="accordion-button collapsed acordion "
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={
                              "#" +
                              itinerary?.name.replace(/ /g, "").slice(0, 5)
                            }
                            aria-expanded="false"
                            aria-controls={itinerary?.name
                              .replace(/ /g, "")
                              .slice(0, 5)}
                          >
                            Activities
                            <span
                              className="material-icons ml-auto arrow2 collapsed "
                              data-bs-toggle="collapse"
                              aria-controls={itinerary?.name
                                .replace(/ /g, "")
                                .slice(0, 5)}
                              data-bs-target={
                                "#" +
                                itinerary?.name.replace(/ /g, "").slice(0, 5)
                              }
                            >
                              keyboard_arrow_down
                            </span>
                          </button>
                        </h2>
                        <div
                          id={itinerary?.name.replace(/ /g, "").slice(0, 5)}
                          className="accordion-collapse collapse"
                          aria-labelledby={"heading" + itinerary?.name}
                          data-bs-parent={"#" + itinerary?.name}
                        >
                          <div className="activitiesDetail accordion-body">
                      
                          <Activities id={itinerary._id} />

                          </div>
                 
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <h3 className="card-title2">
                  WE COULD NOT FIND ANY ITINERARY FOR THIS CITY
                </h3>
              )}
            </div>
          </div>
        )}
      </div>
      <Footer />;
    </>
  );
};

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
  likeDislike: itinerariesActions.likeDislike,
};
export default connect(mapStateToProps, mapDispatchToProps)(DetailsCityId);
