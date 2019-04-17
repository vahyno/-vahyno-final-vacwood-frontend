import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import ResponseForm from './ResponseForm';
import { handleDeleteComment } from '../actions/classroom';

import '../styles/singleClassroom.css';


class Comment extends Component {

    state = {
        showReplyForm: false,
    }

    handleSubmitForm = (event, commentID) => {
        const {showReplyForm} = this.state;
        this.setState({showReplyForm: !showReplyForm})
    }
    
    deleteComment = (comment_id) => {
        const { dispatch, classroomId } = this.props;
        dispatch(handleDeleteComment(classroomId, comment_id));
    }

    hideReplyForm = () => {
        this.setState(() => ({showReplyForm: false}));
    }

    render(){
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
                        
                        {/*response to comment form */}
                        {this.state.showReplyForm && 
                                <ResponseForm 
                                    commentId={ commentId }
                                    hideReplyForm={ this.hideReplyForm }
                                />
                            }
                        {/* response to comment form */}
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