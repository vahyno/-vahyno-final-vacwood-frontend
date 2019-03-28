import { hideLoading, showLoading } from 'react-redux-loading-bar';
import ClassRoomsModel from '../models/ClassRoomsModel';
import { formatServerData } from '../utils/helpers';

export const RECEIVE_CLASSROOMS = 'RECEIVE_CLASSROOMS';
export const ADD_CLASSROOM = 'ADD_CLASSROOM';

const { 
    getAll,
    createNew, 
} = ClassRoomsModel;


function receiveClassrooms (classrooms) {
    return {
        type: RECEIVE_CLASSROOMS,
        classrooms,
    }
}

function addClassroom (classroom) {
    return {
        type: ADD_CLASSROOM,
        classroom
    }
}

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading);
        return getAll()
            .then((response) => {
                const classrooms = formatServerData(response);
                dispatch(receiveClassrooms(classrooms));
                dispatch(hideLoading());
            })
            .catch((err) => {
                console.warn('error in handle initial data', err);
            });
    }
}

export function handleAddClassroom(classroom, history) {
    return (dispatch) => {
        return createNew(classroom)
            .then((classR) => {
                console.log('classsR: ', classR)
                dispatch(addClassroom(classR));
            })
            .catch((err) => console.warn('Error creating new Classroom: ', err))
            .then(() => history.push('/classrooms'));
    }
}
