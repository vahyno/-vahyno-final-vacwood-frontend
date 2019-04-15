import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';

import { handleDeleteClassroom } from '../actions/classroom';
// import ClassRoomsModel from '../models/ClassRoomsModel';
import Comments from './Comments';

import '../styles/singleClassroom.css';
import Header from './Header';
import Footer from './Footer';
import MessageForm from './MessageForm';



class SingleClassRoom extends Component {
    
    deleteClassroom = (classroom_id) => {
        // console.log("classroom_id: ", classroom_id); 
        if (window.confirm('Are you sure you want to delete this Classroom?')) {
            const { dispatch } = this.props;
            dispatch(handleDeleteClassroom(classroom_id, this.props.history));
        }      
    } 

    render(){
        const singleClassroom = !this.props.singleClassroom ?  <LoadingBar /> : this.props.singleClassroom
        const { classroomId } = this.props;
        
        return (
            <div className="blue lighten-5" >
                <Header/>
                <div className="singleClassroomContainer">
                    <Link 
                        to ={{pathname: `/classrooms/${classroomId}/update`}} 
                        className="commentButton btn-flat btn-small waves-effect waves-light blue accent-1 right">
                        Update Classroom
                    </Link>
                    <button 
                        onClick={() => this.deleteClassroom(classroomId)} 
                        className="commentButton btn-flat btn-small waves-effect waves-light red lighten-1 btn right">
                        Delete Classroom
                    </button>
                    <br/>
                    <div className="center-align">
                        <h4 className="center-align"> { singleClassroom.title }{`  -  `}teacher: { singleClassroom.teacher } </h4>
                        <Link to ={`/classrooms`} className="col s12 m7">
                        <img src={ singleClassroom.image_url } alt={singleClassroom.title} className="hoverable singleClassroomImg"/>
                        </Link>
                    </div>
                    <MessageForm
                        classroomId={ classroomId } 
                    />
                    <Comments
                        classroomId={ classroomId } 
                    />
                </div>
                <Footer/>
            </div>
        )
    }
}

function mapStateToProps({ classrooms }, props ){
    const { classroom_id } = props.match.params;
    return {
        classroomId: classroom_id,
        singleClassroom: classroom_id 
            ? classrooms[classroom_id] 
            : {},
    }
}

export default withRouter(connect(mapStateToProps)(SingleClassRoom));