import { GET_COTIZATION } from "./action";

const initialState = {
    cotizacion: []
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_COTIZATION:
           return {
            ...state,
            cotizacion: action.payload
           } 
            
    
        default:
            return {...state}
    }
}