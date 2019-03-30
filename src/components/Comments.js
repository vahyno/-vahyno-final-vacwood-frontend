import React, {Component} from 'react';
import { connect } from 'react-redux';

import Comment from './Comment';

class Comments extends Component {
    render(){
        // const {commentsData, deleteComment, responseToComment, handleResponseCommentForm, submitReplyComment} = this.props;
        // if (!commentsData) {
        //     return (<div>...loading</div>);
        // }

        // console.log('classRoom data in Comments: ', this.props.commentsData.comments); 
        // const comments = commentsData.comments
        // console.log('COMMENTCOMMENTCOMMENTCOMMENTCOMMENT: ',this.props)
        const { commentIDs, classroomId } = this.props;
        // console.log('!!!!!!!GOLD!!!!!!', commentIDs, 'classroomId: ', classroomId);
        return (
            <div>
                {/* {JSON.stringify(commentIDs)} */}
                {/* {comments.map(id => (
                    <Comment 
                        classroom={commentsData}
                        key={id}
                        comment={comment}
                        deleteComment={deleteComment}
                        responseToComment={responseToComment}
                        handleResponseCommentForm={handleResponseCommentForm}
                        submitReplyComment={submitReplyComment}
                        />
                ))} */}
                {commentIDs.map(id => (
                    <Comment
                        key={ id }
                        commentId={ id }
                        classroomId={ classroomId } 
                    />
                ))}
            </div>
        )        
    }
}

function mapStateToProps({ classrooms }, props) {
    const { classroomId} = props;
    return {
        classroomId,
        commentIDs: !classrooms[classroomId]
            ? []
            : classrooms[classroomId].comments.map(comment => comment._id),
    }
}

export default connect(mapStateToProps)(Comments);