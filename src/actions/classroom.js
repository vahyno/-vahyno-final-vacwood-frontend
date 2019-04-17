import { hideLoading, showLoading } from 'react-redux-loading-bar';
import ClassRoomsModel from '../models/ClassRoomsModel';
import { formatServerData } from '../utils/helpers';

export const RECEIVE_CLASSROOMS = 'RECEIVE_CLASSROOMS';
export const ADD_CLASSROOM = 'ADD_CLASSROOM';
export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_CLASSROOM = 'DELETE_CLASSROOM';
export const UPDATE_CLASSROOM = 'UPDATE_CLASSROOM';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const RESPONSE_COMMENT = 'RESPONSE_COMMENT';

const { 
    getAll,
    createNew,
    destroyClassroom,
    editClassroom, 
    newComment,
    destroyComment,
    updateComment,
    replyToComment, 
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

function deleteClassroom (classID) {
    return {
        type: DELETE_CLASSROOM,
        classID,
    }
}

function updateClassroom (classroom) {
    return {
        type: UPDATE_CLASSROOM,
        classroom,
    }
}

function addComment (classId, comment) {
    return {
        type: ADD_COMMENT,
        comment,
        classId,
    }
}

function deleteComment (classId, commentId) {
    return {
        type: DELETE_COMMENT,
        classId,
        commentId,
    }
}

function updateCommentAction (classId, commentId, comment) {
    return {
        type: UPDATE_COMMENT,
        classId,
        commentId,
        comment,
    }
}

function responseCommentAction (classId, commentId, response) {
    return {
        type: RESPONSE_COMMENT,
        classId,
        commentId,
        response,
    }
}


export function handleUpdateComment (classId, commentId, comments, history) {
    return (dispatch) => {
        return updateComment(classId, commentId, comments)
            .then((res) => {
                dispatch(updateCommentAction(classId, commentId, res.data.comments));
            })
            .catch((err) => console.warn('Error updating comment: ', err))
            .then(() => history.push(`/classrooms/${classId}`));
    }
}

export function handleResponseToComment (classId, commentId, response) {
    return (dispatch) => {
        return replyToComment(classId, commentId, response)
            .then((res) => {
                dispatch(responseCommentAction(classId, commentId, res.data));
            })
            .catch((err) => console.warn('Error Replying to comment: ', err)); 
    }
}

export function handleDeleteComment (classId, commentId) {
    return (dispatch) => {
        return destroyComment(classId, commentId)
            .then((res) => {
                dispatch(deleteComment(classId, commentId));
            })
            .catch((err) => console.warn('Error Deleting comment', err));
    }
}

export function handleUpdateClassroom (classroom_id, classroom, history) {
    return (dispatch) => {
        dispatch(showLoading());
        return editClassroom(classroom_id, classroom)
            .then((res)=> {
                dispatch(updateClassroom(res.data));
                dispatch(hideLoading());
            })
            .catch((err) => console.warn('Error Updating classroom: ', err))
            .then(() => history.push(`/classrooms/${classroom_id}`));
    }
}

export function handleDeleteClassroom (classId, history) {
    return (dispatch) => {
        dispatch(showLoading());
        return destroyClassroom(classId)
            .then((res) => {
                dispatch(deleteClassroom(classId));
                dispatch(hideLoading());
            })
            .catch((err) => console.warn('Error Deleting classroom: ', err))
            .then(() => history.push('/classrooms'));
    }
}

export function handleCreateComment (classId, comment) {
    return (dispatch) => {
        return newComment(classId, comment)
            .then(newComment => {
                dispatch(addComment(classId, newComment.data));
            })
            .catch((err) => console.warn('Error creating comment: ', err));
    }
}

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading());
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
                dispatch(addClassroom(classR));
            })
            .catch((err) => console.warn('Error creating new Classroom: ', err))
            .then(() => history.push('/classrooms'));
    }
}
