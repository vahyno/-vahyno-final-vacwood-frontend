import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';

import { handleDeleteClassroom } from '../actions/classroom';
import ClassRoomsModel from '../models/ClassRoomsModel';
import Comments from './Comments';

import '../styles/singleClassroom.css';
import Header from './Header';
import Footer from './Footer';
import MessageForm from './MessageForm';



class SingleClassRoom extends Component {
    
    // state = {
    //     classroom: '',
    //     // newComment: '',
    //     // responseToComment: '',
    // }

    // componentDidMount() {
    //     let classroomId = this.props.match.params.classroom_id;
    //     ClassRoomsModel.getOneClassroom(classroomId)
    //     .then(data => {
    //         console.log('Single Classroom by ID: ', data.data);
    //         this.setState({
    //             classroom: data.data,
    //             newComment: '',
    //             responseToComment: '',
    //         });
    //     });
    // }

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
        // console.log("classroom_id: ", classroom_id); 
        if (window.confirm('Are you sure you want to delete this Classroom?')) {
            const { dispatch } = this.props;
            dispatch(handleDeleteClassroom(classroom_id, this.props.history));
        }      
    } 

    // handleCommentForm = (event) => {
    //     let newComment = event.target.value;
    //     this.setState({
    //         newComment,
    //     })
    //     console.log('handleCommentForm => newComment', newComment);
    // }
    // onFormSubmit = (event) => {
    //     event.preventDefault();
    //     let classroomId = this.props.match.params.classroom_id;
    //     let commentContent = this.state.newComment;
    //     ClassRoomsModel.newComment(classroomId, commentContent)
    //     .then(newComment => {
    //         this.setState({
    //             classroom: {
    //                 ...this.state.classroom,
    //                 comments: this.state.classroom.comments.concat(newComment.data),
    //             },
    //             newComment: '',
    //         });
    //     });
    //     // console.log(this.state)
    // }

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
        // console.log("Single Classroom STATE: ", this.state.classroom)
        // const singleClassroom = this.state.classroom === '' ? <h2>Loading...</h2> : this.state.classroom
        // const classroomId = this.props.match.params.classroom_id;
        
        // console.log('REDUX ID: ', this.props.classroomId, 'CLASSROOOM:  ',this.props.singleClassroom);
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

// //OLD comment props
// commentsData={this.state.classroom}
// deleteComment={this.deleteComment}
// replyComment={this.replyComment}
// showReplyForm={this.state.showReplyForm}
// responseToComment={this.state.responseToComment}
// handleResponseCommentForm={this.handleResponseCommentForm}
// submitReplyComment={this.submitReplyComment} /> 
