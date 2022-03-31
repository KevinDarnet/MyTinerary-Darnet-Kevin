import React from 'react'
import activitiesActions from "../Redux/actions/activitiesActions";
import { connect } from 'react-redux';
import { useEffect } from 'react';
import Activities from './Activities';

 function Itinerary(props) {
console.log(props)

    useEffect(() => {
        props.findOneActivityPerItinerary(props.id).then(res=>(console.log(res)))
      }, []);
  return (
      <div>
      </div>
  )
}
 
  const mapDispatchToProps = {
   
    findOneActivityPerItinerary: activitiesActions.findOneActivityPerItinerary,
    
  };
  export default connect(null, mapDispatchToProps)(Itinerary);