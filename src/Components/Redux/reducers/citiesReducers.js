

const initialState = {
    cities:[],
    extra:[],
    
}

const citiesReducer = (state = initialState, action)=>{

    switch(action.type){
        case 'fetch':
            return {
                ...state,
                cities: action.payload,
                extra: action.payload,
            }
        case 'fetchOne':
            return {
                ...state,
                cities: action.payload,
                extra: action.payload
            }
        case 'delete':
            return {
                ...state,
                cities: action.payload
            }
        case 'chargeCities':
            let cities= [...state.cities]
            cities.push(action.payload)
            return{
                ...state,
                cities,
                extra: [...cities]
            }
        case 'filtro':
            const filtrado = action.payload.cities.filter((city => city.name.toLowerCase().startsWith(action.payload.value.toLowerCase())))

            return {
                ...state,
                cities: filtrado
            }
        default:
            return state
    }
}
export default citiesReducer;
