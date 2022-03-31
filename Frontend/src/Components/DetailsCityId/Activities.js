import * as React from "react";

export default function Activities(props) {
  console.log(props);
  
  return (
    <>
      {props.activities ? (
        props.activities.map((activity) => (
          
          <div>
          {console.log(activity)}
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


