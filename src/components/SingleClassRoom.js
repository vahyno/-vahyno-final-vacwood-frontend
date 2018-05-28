import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ClassRoomsModel from '../models/ClassRoomsModel';
import Header from './Header';
import Footer from './Footer';


class SingleClassRoom extends Component {
    state = {
        classroom: null,
        query: '',
    }

    componentDidMount() {
        let classroomId = this.props.match.params.classroom_id;
        ClassRoomsModel.getOneClassroom(classroomId)
        .then(data => {
            console.log('Single Classroom by ID: ',data.data);
            this.setState({
                classroom: data.data,
            });
        });
    }

    render(){
        let classroom = this.state.classroom === null ? <h2>Loading...</h2> : this.state.classroom
        console.log(this.state.classroom)


        return (
            <div>
                <Header/>
                <h4 className="center-align"> { classroom.title } </h4>
                <h4 className="center-align">teacher: { classroom.teacher } </h4>
                <Link to ={`/classrooms`} className="col s12 m7">
                <img src={ classroom.image_url } alt={classroom.title} className="hoverable singleClassroomImg"/>
                </Link>
                


                <Footer/>
            </div>
        )
    }
}

export default SingleClassRoom;
