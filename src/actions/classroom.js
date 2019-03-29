import { hideLoading, showLoading } from 'react-redux-loading-bar';
import ClassRoomsModel from '../models/ClassRoomsModel';
import { formatServerData } from '../utils/helpers';

export const RECEIVE_CLASSROOMS = 'RECEIVE_CLASSROOMS';
export const ADD_CLASSROOM = 'ADD_CLASSROOM';
export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_CLASSROOM = 'DELETE_CLASSROOM';

const { 
    getAll,
    createNew,
    newComment,
    destroyClassroom, 
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

function addComment (classId, comment) {
    return {
        type: ADD_COMMENT,
        comment,
        classId,
    }
}

function deleteClassroom (classID) {
    return {
        type: DELETE_CLASSROOM,
        classID,
    }
}

export function handleDeleteClassroom (classId, history) {
    return (dispatch) => {
        return destroyClassroom(classId)
            .then((res) => {
                console.log('destroy classroom: ',res);
                dispatch(deleteClassroom(classId));
            })
            .catch((err) => console.warn('Error Deleting classroom: ', err))
            .then(() => history.push('/classrooms'));
    }
}

export function handleCreateComment (classId, comment) {
    return (dispatch) => {
        return newComment(classId, comment)
            .then(newComment => {
                console.log('CLASSS_ID', classId, '!!!!!!NEW COMMENT: ', newComment.data)
                dispatch(addComment(classId, newComment.data));
            })
            .catch((err) => console.warn('Error creating comment: ', err));
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
