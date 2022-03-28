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

const ItineraryDetails = (props) => {
  console.log(props);
  const { id } = useParams();
  const [itineraries, setItineraries] = useState();

  const [reload, setReload] = useState(false);
  const [oneActivityPerItinerary, setoneActivityPerItinerary] = useState([]);
  const [likes, setLikes] = useState(props.itinerary.likes);

  console.log(oneActivityPerItinerary);

  useEffect(() => {
    props.itinerarioPorCiudad(id).then((data) => setLikes(data));
  }, [reload]);
  console.log(props.itineraries); //Array de los itinerarios
  console.log(props.itinerary); //Los dos itinerarios mapeados en DetailsCitiId
  console.log(props.user);

  useEffect(() => {
    props
      .findOneActivityPerItinerary(props.itinerary._id)
      .then((res) => setoneActivityPerItinerary(res));
  }, []);
  console.log(props.oneActivityPerItinerary);

  async function likesOrDislikes() {
    await props.likeDislike(props.itineraries._id);
    setReload(!reload);
  }

  return (
    <>
      <div className="card2 mb-3 cardDetail2">
        <div className="ConteinerUser">
          <img className="imguser" src={props.itinerary?.userimage} />

          <h2 className="card-user">{props.itinerary?.username}</h2>
        </div>
        <h1 className="card-title2">{props.itinerary?.name}</h1>

        <div>
          <img className="imgitinerary" src={props.itinerary?.image} />
        </div>
        <div className="card-body">
          <p className="card-p2">Description: {props.itinerary?.details} </p>

          <p className="card-p2">Duration: {props.itinerary?.duration}</p>
          <p className="card-p2">Hashtag: {props.itinerary?.hashtag}</p>

          <div className="likeDislike">
            {props.user ? (
              <button onClick={likesOrDislikes}>
                {likes?.includes(props.user.id) ? (
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
              <span style={{ fontSize: 30 }} className="material-icons">
                favorite_border
              </span>
            )}
            <h3 style={{ color: "black ", fontSize: 30 }}>{likes?.length}</h3>
          </div>
        </div>
        <div className="accordion" id={props.itinerary?.name}>
          <div className="accordion-item">
            <h2
              className="accordion-header"
              id={"heading" + props.itinerary?.name}
            ></h2>
            <div
              id={props.itinerary?.name.replace(/ /g, "").slice(0, 5)}
              className="accordion-collapse collapse "
              aria-labelledby={"heading" + props.itinerary?.name}
              data-bs-parent={"#" + props.itinerary?.name}
            ></div>
          </div>
        </div>
        <div className="accordion" id={props.itinerary?.name}>
          <div className="accordion-item">
            <h2
              className="accordion-header"
              id={"heading" + props.itinerary?.name}
            >
              <button
                className="accordion-button collapsed acordion "
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={
                  "#" + props.itinerary?.name.replace(/ /g, "").slice(0, 5)
                }
                aria-expanded="false"
                aria-controls={props.itinerary?.name
                  .replace(/ /g, "")
                  .slice(0, 5)}
              >
                Activities
                <span
                  className="material-icons ml-auto arrow2 collapsed "
                  data-bs-toggle="collapse"
                  aria-controls={props.itinerary?.name
                    .replace(/ /g, "")
                    .slice(0, 5)}
                  data-bs-target={
                    "#" + props.itinerary?.name.replace(/ /g, "").slice(0, 5)
                  }
                >
                  keyboard_arrow_down
                </span>
              </button>
            </h2>
            <div
              id={props.itinerary?.name.replace(/ /g, "").slice(0, 5)}
              className="accordion-collapse collapse "
              aria-labelledby={"heading" + props.itinerary?.name}
              data-bs-parent={"#" + props.itinerary?.name}
            >
              <div className="accordion-body  ">
                <Activity activity={props.oneActivityPerItinerary} />
                {props.itinerary.comments.map((comment) => (
                  <Comments
                    itineraryId={props.itinerary._id}
                    commentId={comment._id}
                    comment={comment}
                    key={comment._id}
                  />
                ))}
                <Comment itineraryId={props.itinerary._id} />
              </div>
            </div>
          </div>
        </div>
      </div>
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
