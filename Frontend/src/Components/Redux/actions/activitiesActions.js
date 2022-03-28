import axios from "axios";

const activitiesActions = {
  activities: () => {
    return async (dispatch, getState) => {
      const res = await axios.get("http://localhost:4000/api/activities");
      console.log(res);
      dispatch({ type: "fetchActivities", payload: res.data.response });
    };
  },
  findOneActivityPerItinerary: (id) => {
    console.log(id);
    return async (dispatch, getState) => {
      const res = await axios.get(
        `http://localhost:4000/api/itineraryActivity/${id}`
      );
      console.log(res);
      dispatch({ type: "fetchOneActiivtyPerCity", payload: res.data.response });
    };
  },
};

export default activitiesActions;
