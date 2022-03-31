import axios from "axios";

const activitiesActions = {
  activities: () => {
    return async (dispatch, getState) => {
      const res = await axios.get("http://localhost:4000/api/activities");
/*       console.log(res);
 */      dispatch({ type: "fetchActivities", payload: res.data.response });
    };
  },
  findOneActivityPerItinerary: (id) => {
    return async () => {
      try{
        const res = await axios.get(
          `http://localhost:4000/api/itineraryActivities/${id}`);
          return{
            success: true,
            response: res.data.response
          },
        console.log(res);
      }catch (error){
      return{
        success: false,
        response: error
      }
      }
    };
  },
};

export default activitiesActions;
