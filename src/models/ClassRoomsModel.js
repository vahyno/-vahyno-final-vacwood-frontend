import axios from 'axios';

class ClassRoomsModel {

    static getAll = () => {
        const request = axios.get(`http://localhost:8080/api/classrooms`);
        return request;
    }

    static createNew = (data) => {
        console.log('axios createdata', data);
        const request = axios.post(`http://localhost:8080/api/classrooms`, data);
        return request;
    }

    static getOneClassroom = (classroom_id) => {
        const request = axios.get(`http://localhost:8080/api/classrooms/${classroom_id}`);
        return request;
    }

    static editClassroom = (classroom_id, classroom) => {
        const request = axios.put(`http://localhost:8080/api/classrooms/${classroom_id}`, classroom);
        return request;
    }

    static destroyClassroom = (classroom_id) => {
        const request = axios.delete(`http://localhost:8080/api/classrooms/${classroom_id}`);
        return request;
    }

    // comment related methods

    static newComment = (classroom_id, content) => {
        // console.log('Axios classroom_id: ', classroom_id, 'content: ', content);
        const request = axios.post(`http://localhost:8080/api/classrooms/${classroom_id}/comments`, {content: content});
        return request;
    }

    static destroyComment = (classroom_id, comment_id) => {
        const request = axios.delete(`http://localhost:8080/api/classrooms/${classroom_id}/comments/${comment_id}`);
        return request;
    }

    static updateComment = (classroom_id, comment_id, comment) => {
        const request = axios.put(`http://localhost:8080/api/classrooms/${classroom_id}/comments/${comment_id}`, comment);
        return request;
    }
}

export default ClassRoomsModel;