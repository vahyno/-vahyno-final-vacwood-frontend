import { hideLoading, showLoading } from 'react-redux-loading-bar';
import ClassRoomsModel from '../models/ClassRoomsModel';


export const RECEIVE_CLASSROOMS = 'RECEIVE_CLASSROOMS';

function receiveClassrooms (classrooms) {
    return {
        type: RECEIVE_CLASSROOMS,
        classrooms,
    }
}

const { getAll } = ClassRoomsModel;

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading);
        return getAll()
            .then((classrooms) => {
                dispatch(receiveClassrooms(classrooms));
                dispatch(hideLoading());
            })
            .catch((err) => {
                console.warn('error in handle initial data', err);
            });
    }
}