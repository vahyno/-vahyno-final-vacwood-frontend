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

}

export default ClassRoomsModel;