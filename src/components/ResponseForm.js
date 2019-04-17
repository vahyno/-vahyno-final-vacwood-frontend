import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleResponseToComment } from '../actions/classroom';
import '../styles/singleClassroom.css';

class ResponseForm extends Component {
    state = {
        responseToComment: '',
    }

    handleResponseCommentForm = (event) => {
        const responseToComment = event.target.value;
        this.setState(() => ({
             responseToComment 
        }));
    }
    
    submitReplyComment = (event) => {
        event.preventDefault();

        const { classroom_id, commentId, dispatch } = this.props;
        const { responseToComment } = this.state;
        dispatch(handleResponseToComment(classroom_id, commentId, responseToComment));
        this.setState(()=>({responseToComment: ''}));
        this.props.hideReplyForm();   
    }
    

    render(){
        const { responseToComment } = this.state;
        return (
            <div className="row comment_response_form" style={{ display: 'block'}}>
                <form className="col s12" onSubmit={this.submitReplyComment}>
                    <div className="row">
                        <div className="input-field col s6">
                            <input onChange={this.handleResponseCommentForm}
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
}

function mapStateToProps(state, props) {
    const { classroom_id } = props.match.params;
    const { commentId } = props
    return {
        classroom_id,
        commentId,
    }
}

export default withRouter(connect(mapStateToProps)(ResponseForm));

