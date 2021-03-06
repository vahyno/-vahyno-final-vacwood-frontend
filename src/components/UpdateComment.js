import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleUpdateComment } from '../actions/classroom';
import '../styles/singleClassroom.css';
import Header from './Header';
import Footer from './Footer';


class UpdateComment extends Component {
    state = {
        comments: '',
        commentToUpdate: '',
    }

    componentDidMount() {
        // console.log('State passed through form: ', this.props.location.state.oldFormData);
        // const { oldFormData } = this.props.location.state;
        const { comment_id, oldFormData } = this.props;
        
        if (oldFormData) { 
            let commentToUpdateArr = oldFormData.comments.filter(comment => comment._id === comment_id)
            let commentToUpdate = commentToUpdateArr[0]

            this.setState({
                comments: oldFormData.comments,
                commentToUpdate,
            });
        }
    }    

    handleCommentForm = (event) => {
        this.setState({
            commentToUpdate: {
                ...this.state.commentToUpdate,
                content: event.target.value
            },
        });
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        const { dispatch, history, comment_id, classroom_id } = this.props;

        let updatedComment = this.state.commentToUpdate;
        let filteredComments = this.state.comments.filter(comment => comment._id !== comment_id)
        let updatedComments = filteredComments.concat(updatedComment);

        dispatch(handleUpdateComment(classroom_id, comment_id, updatedComments, history));

        this.setState(() => ({
        comments: '',
        commentToUpdate: '',
        }));
    }

    render() {
        let classroomId = this.props.match.params.classroom_id;
        return (
            <div className="view-fix blue lighten-4">
                <Header/>
                {/* comment form */}
                <div className="row comment_form updateCommentContainer center-align" style={{marginBottom: '0'}}>
                    <form className="col s12" onSubmit={ this.onFormSubmit }>
                        <div className="row">
                            <div className="input-field col s6">
                                <textarea cols="40" rows="10" onInput={this.handleCommentForm}
                                value={this.state.commentToUpdate.content}
                                placeholder="Write your message!"
                                id="comment"
                                type="text"
                                className="validate" required/>
                            </div>
                        </div>
                        <Link
                            to ={`/classrooms/${classroomId}`} 
                            className="commentButton waves-effect waves-light blue lighten-3 btn update-button">
                            Cancel
                        </Link>
                        <button 
                            className="commentButton waves-effect waves-light blue lighten-1 btn" 
                            type="submit" 
                            name="action">
                            Update
                        </button>
                    </form>
                </div>
                {/* end of comment form */}
                <Footer/>
            </div>
        )
    }
}

function mapStateToProps({ classrooms } , props) {
    const { comment_id, classroom_id } = props.match.params;
    const oldFormData = classrooms? 
        classrooms[classroom_id] : {}

    return {
        comment_id,
        classroom_id,
        oldFormData,
    }
}

export default withRouter(connect(mapStateToProps)(UpdateComment));

