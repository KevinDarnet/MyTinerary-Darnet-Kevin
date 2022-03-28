const initialState = {
  activities: [],
  oneActivityPerItinerary: [],
};

const activitiesReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case "fetchActivities":
      return {
        ...state,
        activities: action.payload,
      };
    case "fetchOneActiivtyPerCity":
      return {
        ...state,
        oneActivityPerItinerary: action.payload,
      };
    default:
      return state;
  }
};

export default activitiesReducer;
