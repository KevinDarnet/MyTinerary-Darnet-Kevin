import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import activitiesActions from "../Redux/actions/activitiesActions";
import "../Styles/styles.css";

function Activity(props) {
  console.log(props.activity);
  console.log(props.itineraries);
  console.log(props.oneActivityPerItinerary);
  console.log(props.itineraryId);

  useEffect(() => {
    props.findOneActivityPerItinerary(props.id);
  }, []);

  return (
    <>
      {props.activity?.map((activity) => (
        <div>
          <h2 className="activity">{activity?.name}</h2>
          <img className="imgActivities" src={activity?.image} />
        </div>
      ))}
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
