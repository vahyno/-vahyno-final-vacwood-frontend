import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ResponseForm from './ResponseForm';

import '../styles/singleClassroom.css';


class Comment extends Component {
    //{"comments":[],"created_at":"2018-12-07T08:55:10.318Z","_id":"5c0a356e79ad73118ef277ba","content":"1","__v":0}}

    // state = {
    //     showReplyForm: false,
    // }

    // handleSubmitForm = (event, commentID) => {
    //     const {showReplyForm} = this.state;
    //     this.props.submitReplyComment(event, commentID);
    //     this.setState({showReplyForm: !showReplyForm})
    // }


    // render(){
    // console.log('SINGLE COMMENT: ', this.props.comment);
    // const {classroom, comment, deleteComment, responseToComment, handleResponseCommentForm} = this.props;
    // const {content, created_at, comments} = comment;
    // const commentId = comment._id;
    // const repliesToComment = comments;
    // const formatedCreated_at = String(new Date(created_at)).slice(0,24);

    //     return (
    //     <div className="commentContainer" key={commentId}>
    //         <div className="card">
    //             <div className="created_at">{formatedCreated_at}</div>
    //             <div className="card-body">{content}
    //                 <button  
    //                     className="commentButton btn-flat btn-small waves-effect waves-light red right"
    //                     onClick={()=> deleteComment(commentId)}>
    //                     X
    //                 </button>
    //                 <button  
    //                     className="commentButton btn-flat btn-small waves-effect waves-light blue accent-1 right"
    //                     onClick={()=> this.setState({showReplyForm: !this.state.showReplyForm})}>
    //                     Reply
    //                 </button>
    //                 <Link
    //                     to ={{pathname: `/classrooms/${classroom._id}/comments/${commentId}/update`, state: {oldFormData: classroom}}}  
    //                     className="commentButton btn-flat btn-small waves-effect waves-light blue accent-2 right">
    //                     Edit
    //                 </Link>

    //                {/*response to comment form */}
    //                {this.state.showReplyForm && 
    //                     <ResponseForm 
    //                         commentId={commentId}
    //                         responseToComment={responseToComment}
    //                         handleResponseCommentForm={handleResponseCommentForm}
    //                         handleSubmitForm={this.handleSubmitForm}/>
    //                 }
    //                {/* response to comment form */}
                    
    //                 {/* replies to Comment */}
    //                 <div style={{marginTop:'3em'}}>
    //                     {repliesToComment && 
    //                         repliesToComment.map(reply => (
    //                             <div key={reply._id}>
    //                                 <div className="card">
    //                                     <div className="created_at">{String(new Date(reply.created_at)).slice(0,24)}</div>
    //                                     <div className="card-body">{reply.content}</div>
    //                                 </div>
    //                             </div>
    //                         ))
    //                     }
    //                 </div>
    //                 {/* replies to Comment */}
    //             </div>
    //         </div>
    //     </div>           
    //     )
    // }
    render () {
        const { commentId } = this.props;
        return (<div>comment: {commentId}</div>)
    }
}

export default Comment;