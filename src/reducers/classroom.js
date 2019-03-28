import { 
    RECEIVE_CLASSROOMS,
    ADD_CLASSROOM, 
} from '../actions/classroom'; 

export default function classrooms (state = {}, action) {
    switch (action.type) {
        case RECEIVE_CLASSROOMS:
            // console.log('STATE:', state, 'action classrooms', action.classrooms)
            return {
                ...state,
                ...action.classrooms
            }
        case ADD_CLASSROOM:
            const { data } = action.classroom;
            // console.log('STATE: ', state, 'Action: ', action, 'action.classroom: ', action.classroom, 'data: ', data)
            return {
                ...state,
                [data._id] : data
            }
        default:
            return state;  
    }
}