import axios from "axios";
import { ITINERARIES_GET } from "./types";

const itinerariesActions = {
  itinerarioPorCiudad: (id) => {
    return async (dispatch, getState) => {
      const res = await axios.get(
        "http://localhost:4000/api/cityItineraries?cityId=" + id
      );
      console.log(res);
      dispatch({ type: ITINERARIES_GET, payload: res.data.response });
    };
  },

  likeDislike: (id) => {
    const token = localStorage.getItem("token");
    return async () => {
      try {
        let response = await axios.put(
          `http://localhost:4000/api/like/${id}`,
          {},

          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
/*         console.log(response);
 */
        return {
          success: true,
          response: response,
        };
      } catch (error) {
        console.log(error);
      }
    };
  },
};

export default itinerariesActions;