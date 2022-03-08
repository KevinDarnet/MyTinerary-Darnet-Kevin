import axios from 'axios';

const citesActions = {

    fetchearCities: () => {
        return async(dispatch, getState)=>{
            const res = await axios.get('http://localhost:4000/api/alljpcities')
            /* console.log(res.data.response) */
            dispatch({type:'fetch', payload:res.data.response.ciudades})
        }
    },
    findOneCity: (id) => {
        return async(dispatch, getState) => {
            const res = await axios.get('http://localhost:4000/api/alljpcities/'+id)
            dispatch({type: 'fetchOne', payload:res.data.response.ciudades })
        }
    },
    deleteCities: (id)=>{
        return async(dispatch, getState)=>{
            try {
                const res = await axios.delete('http://localhost:4000/api/alljpcities/'+id)
                dispatch({type:'delete', payload:res.data.response.ciudades})
            }catch(err){
                console.log(err)
            }
        }
    },
    filter: (cities, value)=>{
        return (dispatch, getState)=>{
            dispatch({type:'filtro', payload:{cities, value}})
        }
    },
    chargeCities: (name, ciudad)=>{
        return async(dispatch, getState)=>{
            const res = await axios.post('http://localhost:4000/api/alljpcities',{name,ciudad})
            dispatch({type:'chargeCities', payload:res.data.response.ciudades})
        }
    }
}
export default citesActions;