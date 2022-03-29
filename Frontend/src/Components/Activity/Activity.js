import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import activitiesActions from "../Redux/actions/activitiesActions";
import "../Styles/styles.css";

function Activity(props) {
  console.log(props.id);
  console.log(props.oneActivityPerItinerary);

  useEffect(() => {
    props.findOneActivityPerItinerary(props.id);
  }, []);

  return (
    <>
      {props.oneActivityPerItinerary ? (
        props.oneActivityPerItinerary.map((activity) => (
          <div>
            <h2 className="activity">{activity.name} </h2>
            <img className="imgActivities" src={activity.image} />
          </div>
        ))
      ) : (
        <h3 className="card-title2">ERROR</h3>
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

export default connect(mapStateToProps, mapDispatchToProps)(Activity);
