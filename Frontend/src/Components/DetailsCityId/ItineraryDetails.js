import { useEffect, useState } from "react";
import "../Styles/itineraryDetails.css";
import { connect } from "react-redux";
import itinerariesActions from "../Redux/actions/itinerariesActions";
import commentsActions from "../Redux/actions/commentsActions";
import { useParams } from "react-router-dom";
import Activity from "../Activity/Activity";
import activitiesActions from "../Redux/actions/activitiesActions";
import Comment from "../Coment/Comment";
import Comments from "../Comments/Comments";
import Swal from "sweetalert2";

const ItineraryDetails = (props) => {
  console.log(props.id);
  console.log(props.itineraries._id);

  const [reload, setReload] = useState(false);

  const [activities, setActivities] = useState([]);

  const id = useParams();
  console.log(id);

  useEffect(() => {
    props.findOneActivityPerItinerary(props.itineraries._id).then((data) => {
      setActivities(data);
    });
  }, [props.itineraries]);

  async function likesOrDislikes(id) {
    console.log(id);
    await props.likeDislike(id);
    props.itinerarioPorCiudad(id);
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
  return (
    <>
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
              <p className="card-p2">Description: {itinerary?.details} </p>
              <p className="card-p2">Duration: {itinerary?.duration}</p>
              <p className="card-p2">Hashtag: {itinerary?.hashtag}</p>
              <p className="card-p2">
                Price:{"💵".repeat(parseInt(itinerary.price))}
              </p>

              <div className="likeDislike">
                {props.user ? (
                  <button onClick={likesOrDislikes}>
                    {itinerary.likes.includes(props.user.id) ? (
                      <span
                        style={{ color: "red", fontSize: 30 }}
                        className="material-icons"
                      >
                        favorite
                      </span>
                    ) : (
                      <span style={{ fontSize: 30 }} className="material-icons">
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
                  {itinerary.likes.length}
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
                      "#" + itinerary?.name.replace(/ /g, "").slice(0, 5)
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
                        "#" + itinerary?.name.replace(/ /g, "").slice(0, 5)
                      }
                    >
                      keyboard_arrow_down
                    </span>
                  </button>
                </h2>
                <div
                  id={itinerary?.name.replace(/ /g, "").slice(0, 5)}
                  className="accordion-collapse collapse "
                  aria-labelledby={"heading" + itinerary?.name}
                  data-bs-parent={"#" + itinerary?.name}
                >
                  <div className="accordion-body" key={itinerary._id}>
                    <Activity id={itinerary._id} key={index} />
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
    </>
  );
};
const mapDispatchToProps = {
  itinerarioPorCiudad: itinerariesActions.itinerarioPorCiudad,
  addComment: commentsActions.addComment,
  modifiComment: commentsActions.modifiComment,
  deleteComment: commentsActions.deleteComment,
  likeDislike: itinerariesActions.likeDislike,
  findOneActivityPerItinerary: activitiesActions.findOneActivityPerItinerary,
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    itineraries: state.itinerariesReducers.itineraries,
    oneActivityPerItinerary: state.activitiesReducer.oneActivityPerItinerary,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItineraryDetails);
