import { cloneDeep } from 'lodash';

import { 
    RECEIVE_CLASSROOMS,
    ADD_CLASSROOM,
    DELETE_CLASSROOM,
    UPDATE_CLASSROOM, 
    ADD_COMMENT,
    DELETE_COMMENT,
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

        case DELETE_CLASSROOM:
            const { classID } = action;
            // console.log('REDUCER => DELETE CLASSROOM: CLASSid: ', action, '!!!!!STATE: ', state);

            const stateClone = cloneDeep(state);
            delete stateClone[classID];

            return stateClone;

        case UPDATE_CLASSROOM:
            const { classroom } = action;
            // console.log('REDUCER UPDATE CLASSROOM :', classroom, 'STATE: ', state )
            const { _id, image_url, info, teacher, title} = classroom;
            return {
                ...state,
                [_id] : {
                    ...state[_id],
                    image_url: [image_url],
                    info: [info],
                    teacher: [teacher],
                    title: [title],
                }
            }    
            
        case ADD_COMMENT:
            const { comment, classId } = action;
            // console.log('REDUCER => COMMENT: ', comment, 'CLASSid: ', classId, '!!!!!STATE: ', state);
            // console.log('************', state[classId].comments)
            return {
                ...state,
                [classId] : {
                    ...state[classId],
                    comments:  state[classId].comments.concat(comment),
                }                
            }

        case DELETE_COMMENT:
            const { commentId } = action;
            return {
                ...state,
                [action.classId] : {
                    ...state[action.classId],
                    comments: state[action.classId].comments.filter(comment => comment._id !== commentId),
                }
            }    

        default:
            return state;  
    }
}