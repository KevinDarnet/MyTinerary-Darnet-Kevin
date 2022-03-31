import * as React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import activitiesActions from "../Redux/actions/activitiesActions";

function Activities(props) {
  console.log(props);

  useEffect(() => {
    props.findOneActivityPerItinerary(props.id);
  }, []);
  return (
    <>
      {props.oneActivityPerItinerary ? (
        props.oneActivityPerItinerary.map((activity) => (
          <div>
            <h2 className="activity">{activity.name} </h2>
            <div className="divActivities">
              <img className="imgActivities" src={activity.image} />
            </div>
          </div>
        ))
      ) : (
        <div>
          <h2 className="activity">nada </h2>
        </div>
      )} 
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    oneActivityPerItinerary: state.activitiesReducer.oneActivityPerItinerary,
  };
};

const mapDispatchToProps = {
  findOneActivityPerItinerary: activitiesActions.findOneActivityPerItinerary,
};
export default connect(mapStateToProps, mapDispatchToProps)(Activities);
