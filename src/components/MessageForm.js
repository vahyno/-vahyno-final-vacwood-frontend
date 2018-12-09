import React from 'react';

const MessageForm = (props) => {
    const {onSubmit, handleCommentForm, newComment} = props;
    return (
        <div className="row comment_form">
            <form className="col s12" onSubmit={onSubmit}>
                <div className="row">
                    <div className="input-field col s6">
                        <textarea cols="40" rows="10" onInput={handleCommentForm}
                        value={newComment}
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

export default MessageForm;

