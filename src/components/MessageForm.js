import React, { Component } from 'react';
import { connect } from 'react-redux';
// import ClassRoomsModel from '../models/ClassRoomsModel';
import { handleCreateComment } from '../actions/classroom';



class MessageForm extends Component {
    state = {
        commentText: '',
    }

    handleCommentForm = (event) => {
        let newComment = event.target.value;
        this.setState({
            commentText: newComment
        })
        // console.log('handleCommentForm => newComment', newComment);
    }
    onFormSubmit = (event) => {
        event.preventDefault();
        const { classroomId, dispatch } = this.props;
        const { commentText } = this.state;

        dispatch(handleCreateComment(classroomId, commentText));
        this.setState(()=> ({
            commentText: ''
        }));

        // ClassRoomsModel.newComment(classroomId, commentText)
        // .then(newComment => {
        //     this.setState({
        //         classroom: {
        //             ...this.state.classroom,
        //             comments: this.state.classroom.comments.concat(newComment.data),
        //         },
        //         newComment: '',
        //     });
        // });
        // console.log(this.state)
    }

    render() {
        const { commentText } = this.state;
        return (
            <div className="row comment_form">
                <form className="col s12" onSubmit={this.onFormSubmit}>
                    <div className="row">
                        <div className="input-field col s6">
                            <textarea cols="40" rows="10" onChange={this.handleCommentForm}
                            value={commentText}
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
                {/* { classroomCommentReplies } */}
            </div>
        )
    }
}

function mapStateToProps (state,{ classroomId }) {
    return {
        classroomId,
    }
}

export default connect(mapStateToProps)(MessageForm);

