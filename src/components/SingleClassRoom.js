import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ClassRoomsModel from '../models/ClassRoomsModel';
// import Comment from './Comment';
import '../styles/singleClassroom.css';
import Header from './Header';
import Footer from './Footer';


class SingleClassRoom extends Component {
    state = {
        classroom: null,
        newComment: '',
        responseToComment: '',
        showReplyForm: false,
    }

    componentDidMount() {
        let classroomId = this.props.match.params.classroom_id;
        ClassRoomsModel.getOneClassroom(classroomId)
        .then(data => {
            console.log('Single Classroom by ID: ',data.data);
            this.setState({
                classroom: data.data,
                newComment: '',
                responseToComment: '',
                showReplyForm: false,
            });
        });
    }

    deleteComment = (comment_id) => {
        let classroomId = this.props.match.params.classroom_id;
        console.log("classroomId: ", classroomId);
        console.log("comment_id: ", comment_id );
        ClassRoomsModel.destroyComment(classroomId, comment_id)
        .then(commentUpdate => {
            console.log(commentUpdate);
            let updatedComments = this.state.classroom.comments.filter(comment =>{
                return comment._id !== comment_id;
            });
            console.log(updatedComments);
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
        // console.log("Input ID", event.target.id);
        // let responseToComment = event.target.value;
        this.setState({
            [event.target.id]: event.target.value,
        });
        // console.log(responseToComment);
    }

    replyComment = () => {
        // console.log(commentID);
        // this.setState({
        //     showReplyForm: !this.state.showReplyForm
        // })
    }

    submitReplyComment = (event, commentID) => {
        event.preventDefault();
        let classroomId = this.props.match.params.classroom_id;
        let commentContent = this.state[commentID];
        console.log('submitReplyComment => classroomId: ', classroomId, 'commentID: ', commentID, 'commentContent: ', commentContent);
        ClassRoomsModel.replyToComment(classroomId, commentID, commentContent)
            .then(res => this.setState({classroom: res.data, commentContent: ''}));
    }

    render(){
        console.log("STATE ", this.state.classroom)
        let singleClassroom = this.state.classroom === null ? <h2>Loading...</h2> : this.state.classroom
        // console.log(this.state.classroom);

        let classroomComments = this.state.classroom === null ? null : this.state.classroom.comments
            .map( comment => {
                let test = this.state[comment._id]
                // let datenumber = parseInt(comment.created_at.replace( /\D+/g, ''));                
                // let formatedCreated_at = `${comment.created_at.slice(0,10)} at ${comment.created_at.slice(11,19)}`
                let formatedCreated_at = String(new Date(comment.created_at)).slice(0,24);
                return (
                    <div className="commentContainer" key={ comment._id }>
                        <div className="card">
                            <div className="created_at">{ formatedCreated_at }</div>
                            <div className="card-body">{ comment.content }
                                <button  
                                    className="commentButton btn-flat btn-small waves-effect waves-light red right"
                                    onClick={()=>this.deleteComment(comment._id)}>
                                    X
                                </button>
                                {/*<button  
                                    className="commentButton btn-flat btn-small waves-effect waves-light blue accent-1 right"
                                    onClick={()=>this.replyComment(comment._id)}>
                                    Reply
                                </button>*/}
                                <Link
                                    to ={{pathname: `/classrooms/${singleClassroom._id}/comments/${comment._id}/update`, state: {oldFormData: this.state.classroom}}}  
                                    className="commentButton btn-flat btn-small waves-effect waves-light blue accent-2 right">
                                    Edit
                                </Link>

                               {/*response to comment form */}
                               <div className="row comment_response_form" style={{ display:  this.state.showReplyForm ? 'block' : 'none'}}>
                                    <form id={comment._id} className="col s12" onSubmit={(event)=>this.submitReplyComment(event, comment._id)}>
                                        <div className="row">
                                            <div className="input-field col s6">
                                                <input id={comment._id} onInput={(e) => this.handleResponseCommentForm(e, comment._id)}
                                                value={test}
                                                placeholder="Write your response!"
                                
                                                type="text"
                                                className="validate" required/>
                                            </div>
                                            <button  
                                                className="commentReplyButton btn-flat btn-small waves-effect waves-light blue accent-1 right"
                                                type="submit" 
                                                name="action">
                                                Submit
                                            </button>
                                        </div>
                                    </form>
                                </div>
                               {/* response to comment form */}
                            </div>
                        </div>
                    </div>
                )
            })
        
        let classroomCommentReplies;
        // if (this.state.classroom !== null) {
        //     if(this.state.classroom.comments.length > 0) {
        //         classroomCommentReplies = this.state.classroom === null ? '' : this.state.classroom.comments
        //             .map(commentArr => {
        //                 console.log('Comment Arr', commentArr)
        //                 if(commentArr.comments.length > 0) {
        //                     commentArr.comments.map(comment => {
        //                         return 'nope'
        //                         // comment.content
        //                         // console.log("CommentArr Comments ", comment)
        //                     })
        //                 }
                        
        //             })
        //     }
        // } 
        // console.log("CLASSROOMCOMMENTREPLIES", classroomCommentReplies);

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
                   {/* <h4 className="center-align">teacher: { singleClassroom.teacher } </h4> */}
                    <Link to ={`/classrooms`} className="col s12 m7">
                    <img src={ singleClassroom.image_url } alt={singleClassroom.title} className="hoverable singleClassroomImg"/>
                    </Link>
                </div>

                {/* comment form */}
                <div className="row comment_form">
                    <form className="col s12" onSubmit={ this.onFormSubmit }>
                        <div className="row">
                            <div className="input-field col s6">
                                <textarea cols="40" rows="10" onInput={this.handleCommentForm}
                                value={this.state.newComment}
                                placeholder="Write your message!"
                                id="comment"
                                type="text"
                                className="validate" required/>
                            </div>
                        </div>
                        <button 
                            className="commentNewButton btn-flat btn-small waves-effect waves-light blue accent-1 right" 
                            type="submit" 
                            name="action">
                            New Message
                        </button>
                    </form>
                    { classroomCommentReplies }
                </div>

                {/* end of comment form */}

                { classroomComments }
                         
                </div>
                <Footer/>
            </div>
        )
    }
}

export default SingleClassRoom;
