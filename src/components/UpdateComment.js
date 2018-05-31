import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ClassRoomsModel from '../models/ClassRoomsModel';
import '../styles/singleClassroom.css';
import Header from './Header';
import Footer from './Footer';


class UpdateComment extends Component {
    state = {
        title: '',
        teacher: '',
        info: '',
        image_url: '',
        comments: '',
        commentToUpdate: ''
    }

    componentDidMount() {
        console.log('State passed through form: ', this.props.location.state.oldFormData);
        let oldFormData = this.props.location.state.oldFormData;
        console.log('old', oldFormData)
        this.setState({
            title: oldFormData.title,
            teacher: oldFormData.teacher,
            info: oldFormData.info,
            image_url: oldFormData.image_url,
            comments: oldFormData.comments,
            commentToUpdate: oldFormData.comments[0],
        });
    }

    handleCommentForm = (event) => {
        this.setState({
            commentToUpdate: {
                ...this.state.commentToUpdate,
                content: event.target.value
            },
        });
        console.log('handleCommentForm => state', this.state)
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        console.log('onFormSubmit => Form Submit', event);
        let commentId = this.props.match.params.comment_id;
        let updatedComment = this.state.commentToUpdate;
        let filteredComments = this.state.comments.filter(comment => {
            return comment._id !== commentId;
        })
        let commentToUpdate = this.state.commentToUpdate;
        let updatedComments = filteredComments.concat(updatedComment);

        let formData = {
            title: this.state.title,
            teacher: this.state.teacher,
            info: this.state.info,
            image_url: this.state.image_url,
            comments: updatedComments,
            commentToUpdate,
        }
        console.log('onFormSubmit => Form Data ', formData)
        let classroomId = this.props.match.params.classroom_id;
        // let commentData = this.state.commentToUpdate;
        console.log('classroomId: ', classroomId, 'commentId: ', commentId);
        ClassRoomsModel.updateComment(classroomId, commentId, formData)
        .then(data => {
            console.log('ClassRoomsModel.updateComment => ', data.data);
            this.setState({
                comments: data.data.comments,
            });
            this.props.history.push(`/classrooms/${classroomId}`);
        });
    }

    render() {
        console.log("STATE: ", this.state)
        let classroomId = this.props.match.params.classroom_id;
        console.log('Render => Classroom ID: ',classroomId);
        // let comment = this.state.comments ? this.state.comments : "Loading";
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

export default UpdateComment;

