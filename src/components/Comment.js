import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import ResponseForm from './ResponseForm';
import ClassRoomsModel from '../models/ClassRoomsModel';

import '../styles/singleClassroom.css';


class Comment extends Component {

    state = {
        showReplyForm: false,
    }

    handleSubmitForm = (event, commentID) => {
        const {showReplyForm} = this.state;
        // this.props.submitReplyComment(event, commentID);
        this.setState({showReplyForm: !showReplyForm})
    }

    responseToComment = () => {

    }
    
    handleResponseCommentForm = () => {

    }

    deleteComment = (comment_id) => {
        // let classroomId = this.props.match.params.classroom_id;
        const { classroomId } = this.props;
        //console.log("classroomId: ", classroomId);
        //console.log("comment_id: ", comment_id );
        ClassRoomsModel.destroyComment(classroomId, comment_id)
        // .then(commentUpdate => {
        //     //console.log(commentUpdate);
        //     let updatedComments = this.state.classroom.comments.filter(comment =>{
        //         return comment._id !== comment_id;
        //     });
        //     //console.log(updatedComments);
        //     this.setState({
        //         classroom: {
        //             ...this.state.classroom,
        //             comments: updatedComments,
        //         }
        //     });
        // });
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

    // handleResponseCommentForm = (event, commentID) => {
    //     console.log("handleResponseCommentForm - Input ID: ", event.target.id);
    //     console.log('handleResponseCommentForm - commentID: ', commentID)
    //     const responseToComment = event.target.value;
    //     this.setState({ responseToComment });
    // }

    // submitReplyComment = (event, commentID) => {
    //     event.preventDefault();
    //     let classroomId = this.props.match.params.classroom_id;
    //     //let commentContent = this.state[commentID];
    //     const commentContent = this.state.responseToComment;
    //     console.log('submitReplyComment => classroomId: ', classroomId, 'commentID: ', commentID, 'commentContent: ', commentContent);
    //     ClassRoomsModel.replyToComment(classroomId, commentID, commentContent)
    //         .then(res => this.setState({classroom: res.data, commentContent: ''}));
    //     this.setState({responseToComment: ''});   
    // }

    

    render(){
        console.log('SINGLE COMMENT: ', this.props.comment);
        const { classroom, comment, commentId } = this.props;
        const { content, created_at, comments } = comment;

        const repliesToComment = comments;
        const formatedCreated_at = String(new Date(created_at)).slice(0,24);

        return (
            <div className="commentContainer" key={commentId}>
                <div className="card">
                    <div className="created_at">{formatedCreated_at}</div>
                    <div className="card-body">{content}
                        <button  
                            className="commentButton btn-flat btn-small waves-effect waves-light red right"
                            onClick={()=> this.deleteComment(commentId)}>
                            X
                        </button>
                        <button  
                            className="commentButton btn-flat btn-small waves-effect waves-light blue accent-1 right"
                            onClick={()=> this.setState({showReplyForm: !this.state.showReplyForm})}>
                            Reply
                        </button>
                        <Link
                            to ={{pathname: `/classrooms/${classroom._id}/comments/${commentId}/update`, state: {oldFormData: classroom}}}  
                            className="commentButton btn-flat btn-small waves-effect waves-light blue accent-2 right">
                            Edit
                        </Link>

                    {/*response to comment form */}
                    {this.state.showReplyForm && 
                            <ResponseForm 
                                commentId={commentId}
                                responseToComment={this.responseToComment}
                                handleResponseCommentForm={this.handleResponseCommentForm}
                                handleSubmitForm={this.handleSubmitForm}/>
                        }
                    {/* response to comment form */}
                        
                        {/* replies to Comment */}
                        <div style={{marginTop:'3em'}}>
                            {repliesToComment && 
                                repliesToComment.map(reply => (
                                    <div key={reply._id}>
                                        <div className="card">
                                            <div className="created_at">{String(new Date(reply.created_at)).slice(0,24)}</div>
                                            <div className="card-body">{reply.content}</div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        {/* replies to Comment */}
                    </div>
                </div>
            </div>           
        )
    }
}

function mapStateToProps({ classrooms }, {classroomId, commentId} ) {
    return {
        commentId,
        classroomId,

        classroom: classroomId 
            ?   classrooms[classroomId]
            :   null,

        comment: classroomId && commentId 
            ? classrooms[classroomId].comments.filter((comment) => comment._id === commentId)[0]
            : null
    }
}

export default connect(mapStateToProps)(Comment);