import { RECEIVE_CLASSROOMS } from '../actions/classroom'; 

export default function classrooms (state = {}, action) {
    switch (action.type) {
        case RECEIVE_CLASSROOMS:
            return {
                ...state,
                ...action.classrooms
            }
        default:
            return state;  
    }
}