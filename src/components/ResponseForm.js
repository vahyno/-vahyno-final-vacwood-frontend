import React from 'react';
import '../styles/singleClassroom.css';

const ResponseForm = (props) => {
    const {handleResponseCommentForm, commentId, responseToComment, handleSubmitForm} = props;
    return (
        <div className="row comment_response_form" style={{ display: 'block'}}>
            <form id={commentId} className="col s12" onSubmit={(event)=>{handleSubmitForm(event, commentId)}}>
                <div className="row">
                    <div className="input-field col s6">
                        <input id={commentId} onInput={(e) => handleResponseCommentForm(e, commentId)}
                        value={responseToComment}
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
    )
}

export default ResponseForm;

