import axios from 'axios';

// local || heroku deployment
const _localRoute = "http://localhost:8080";
const _herokuRoute= "https://vacwood-backend.herokuapp.com";

let local = true; //change to false for heroku deployment
const ROUTE = local ? _localRoute : _herokuRoute;


class ClassRoomsModel {

    static getAll = () => {
        const request = axios.get(`${ROUTE}/api/classrooms`);
        return request;
    }

    static createNew = (data) => {
        const request = axios.post(`${ROUTE}/api/classrooms`, data);
        return request;
    }

    static getOneClassroom = (classroom_id) => {
        const request = axios.get(`${ROUTE}/api/classrooms/${classroom_id}`);
        return request;
    }

    static editClassroom = (classroom_id, classroom) => {
        const request = axios.put(`${ROUTE}/api/classrooms/${classroom_id}`, classroom);
        return request;
    }

    static destroyClassroom = (classroom_id) => {
        const request = axios.delete(`${ROUTE}/api/classrooms/${classroom_id}`);
        return request;
    }

    // comment related methods

    static newComment = (classroom_id, content) => {
        const request = axios.post(`${ROUTE}/api/classrooms/${classroom_id}/comments`, {content: content});
        return request;
    }

    static destroyComment = (classroom_id, comment_id) => {
        const request = axios.delete(`${ROUTE}/api/classrooms/${classroom_id}/comments/${comment_id}`);
        return request;
    }

    static updateComment = (classroom_id, comment_id, comment) => {
        const request = axios.put(`${ROUTE}/api/classrooms/${classroom_id}/comments/${comment_id}`, comment);
        return request;
    }

    // reply to comment method:
    static replyToComment = (classroom_id, comment_id, content) => {
        const request = axios.post(`${ROUTE}/api/classrooms/${classroom_id}/comments/${comment_id}/comments`, {content});
        return request;
    }
}

export default ClassRoomsModel;