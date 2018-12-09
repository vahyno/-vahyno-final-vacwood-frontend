import React, {Component} from 'react';

import Comment from './Comment';

class Comments extends Component {
    render(){
        const {commentsData, deleteComment, responseToComment, handleResponseCommentForm, submitReplyComment} = this.props;
        if (!commentsData) {
            return (<div>...loading</div>);
        }

        console.log('classRoom data in Comments: ', this.props.commentsData.comments); 
        const comments = commentsData.comments

        return (
            <div>
                {comments.map(comment => (
                    <Comment 
                        classroom={commentsData}
                        key={comment._id}
                        comment={comment}
                        deleteComment={deleteComment}
                        responseToComment={responseToComment}
                        handleResponseCommentForm={handleResponseCommentForm}
                        submitReplyComment={submitReplyComment}
                        />
                ))}
            </div>
        )        
    }
}

export default Comments;