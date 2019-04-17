import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    }
    onFormSubmit = (event) => {
        event.preventDefault();
        const { classroomId, dispatch } = this.props;
        const { commentText } = this.state;

        dispatch(handleCreateComment(classroomId, commentText));
        this.setState(()=> ({
            commentText: ''
        }));
    }

    render() {
        const { commentText } = this.state;
        const textLeft = 300 - commentText.length;
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
                            maxLength={300}
                            className="validate" required/>
                        </div>
                    </div>
                    <button 
                        className="commentNewButton btn-flat btn-small waves-effect waves-light blue accent-1 right" 
                        type="submit" 
                        name="action">
                            New Message
                    </button>
                    {textLeft <= 100 && (
                        <div 
                            className='row right' 
                            style={{marginTop:'-3%', marginRight:'2%', fontsize:20, color:'blue', fontWeight: 700,}}>
                                {textLeft}
                        </div>)}
                </form>
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

