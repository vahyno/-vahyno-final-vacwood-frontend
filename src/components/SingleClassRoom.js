import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ClassRoomsModel from '../models/ClassRoomsModel';
import Comments from './Comments';

import '../styles/singleClassroom.css';
import Header from './Header';
import Footer from './Footer';
import MessageForm from './MessageForm';


class SingleClassRoom extends Component {
    
    state = {
        classroom: null,
        newComment: '',
        responseToComment: '',
    }

    componentDidMount() {
        let classroomId = this.props.match.params.classroom_id;
        ClassRoomsModel.getOneClassroom(classroomId)
        .then(data => {
            console.log('Single Classroom by ID: ', data.data);
            this.setState({
                classroom: data.data,
                newComment: '',
                responseToComment: '',
            });
        });
    }

    deleteComment = (comment_id) => {
        let classroomId = this.props.match.params.classroom_id;
        //console.log("classroomId: ", classroomId);
        //console.log("comment_id: ", comment_id );
        ClassRoomsModel.destroyComment(classroomId, comment_id)
        .then(commentUpdate => {
            //console.log(commentUpdate);
            let updatedComments = this.state.classroom.comments.filter(comment =>{
                return comment._id !== comment_id;
            });
            //console.log(updatedComments);
            this.setState({
                classroom: {
                    ...this.state.classroom,
                    comments: updatedComments,
                }
            });
        });
    }

    deleteClassroom = (classroom_id) => {
        console.log("classroom_id: ", classroom_id); 
        if (window.confirm('Are you sure you want to delete this Classroom?')) {
            ClassRoomsModel.destroyClassroom(classroom_id)
              .then(deleted_classroom=>{
                console.log(deleted_classroom);
                this.props.history.push('/classrooms');
              });
        }      
    } 

    handleCommentForm = (event) => {
        let newComment = event.target.value;
        this.setState({
            newComment,
        })
        console.log('handleCommentForm => newComment', newComment);
    }
    onFormSubmit = (event) => {
        event.preventDefault();
        let classroomId = this.props.match.params.classroom_id;
        let commentContent = this.state.newComment;
        ClassRoomsModel.newComment(classroomId, commentContent)
        .then(newComment => {
            this.setState({
                classroom: {
                    ...this.state.classroom,
                    comments: this.state.classroom.comments.concat(newComment.data),
                },
                newComment: '',
            });
        });
        // console.log(this.state)
    }

    handleResponseCommentForm = (event, commentID) => {
        console.log("handleResponseCommentForm - Input ID: ", event.target.id);
        console.log('handleResponseCommentForm - commentID: ', commentID)
        const responseToComment = event.target.value;
        this.setState({ responseToComment });
    }

    submitReplyComment = (event, commentID) => {
        event.preventDefault();
        let classroomId = this.props.match.params.classroom_id;
        //let commentContent = this.state[commentID];
        const commentContent = this.state.responseToComment;
        console.log('submitReplyComment => classroomId: ', classroomId, 'commentID: ', commentID, 'commentContent: ', commentContent);
        ClassRoomsModel.replyToComment(classroomId, commentID, commentContent)
            .then(res => this.setState({classroom: res.data, commentContent: ''}));
        this.setState({responseToComment: ''});   
    }

    render(){
        console.log("Single Classroom STATE: ", this.state.classroom)
        const singleClassroom = this.state.classroom === null ? <h2>Loading...</h2> : this.state.classroom
        
        return (
            <div className="blue lighten-5" >
                <Header/>
                <div className="singleClassroomContainer">
                    <Link 
                        to ={{pathname: `/classrooms/${singleClassroom._id}/update`, state: {oldFormData: this.state.classroom}}} 
                        className="commentButton btn-flat btn-small waves-effect waves-light blue accent-1 right">
                        Update Classroom
                    </Link>
                    <button 
                        onClick={() => this.deleteClassroom(singleClassroom._id)} 
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
                        onSubmit={ this.onFormSubmit }
                        handleCommentForm={this.handleCommentForm}
                        newComment={this.state.newComment}/>
                    <Comments 
                        commentsData={this.state.classroom}
                        deleteComment={this.deleteComment}
                        replyComment={this.replyComment}
                        showReplyForm={this.state.showReplyForm}
                        responseToComment={this.state.responseToComment}
                        handleResponseCommentForm={this.handleResponseCommentForm}
                        submitReplyComment={this.submitReplyComment}/>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default SingleClassRoom;
