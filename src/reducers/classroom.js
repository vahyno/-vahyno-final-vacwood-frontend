import { cloneDeep } from 'lodash';

import { 
    RECEIVE_CLASSROOMS,
    ADD_CLASSROOM,
    DELETE_CLASSROOM,
    UPDATE_CLASSROOM, 
    ADD_COMMENT,
    DELETE_COMMENT,
    UPDATE_COMMENT,
    RESPONSE_COMMENT,
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
        
        case UPDATE_COMMENT:
            // console.log('UPDATE_COMMENT ACTION: ', action, 'STATE: ', state, 'content: ', action.comment);
            // classId, commentId, comment,
            return {
                ...state,
                [action.classId] : {
                    ...state[action.classId],
                    // comments: state[action.classId].comments.filter((comt) => comt._id !== action.commentId).concat(action.comment),
                    comments: [...action.comment]
                }
            }
            
        case RESPONSE_COMMENT:
            // console.log('RESPONSE_COMMENT ACTION: ', action, 'STATE: ', state);
            const c0mment = state[action.classId].comments.filter((comt) => comt._id === action.commentId)[0];
            c0mment.comments = c0mment.comments.concat([action.response]);

            return {
                ...state,
                [action.classId] : {
                    ...state[action.classId],
                    comments: state[action.classId].comments.filter((comt) => comt._id !== action.commentId).concat(c0mment)
                }
            }    

        default:
            return state;  
    }
}