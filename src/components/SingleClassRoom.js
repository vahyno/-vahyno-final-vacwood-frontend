import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ClassRoomsModel from '../models/ClassRoomsModel';
import '../styles/singleClassroom.css';
import Header from './Header';
import Footer from './Footer';


class SingleClassRoom extends Component {
    state = {
        classroom: null,
        newComment: '',
    }

    componentDidMount() {
        let classroomId = this.props.match.params.classroom_id;
        ClassRoomsModel.getOneClassroom(classroomId)
        .then(data => {
            console.log('Single Classroom by ID: ',data.data);
            this.setState({
                classroom: data.data,
            });
        });
    }

    deleteComment = (comment_id) => {
        let classroomId = this.props.match.params.classroom_id;
        console.log("classroomId: ", classroomId);
        console.log("comment_id: ", comment_id );
        ClassRoomsModel.destroyComment(classroomId, comment_id)
        .then(commentUpdate => {
            console.log(commentUpdate);
            let updatedComments = this.state.classroom.comments.filter(comment =>{
                return comment._id !== comment_id;
            });
            console.log(updatedComments);
            this.setState({
                classroom: {
                    ...this.state.classroom,
                    comments: updatedComments,
                }
            });
        });
    }

    replyComment = (comment_id) => {
        console.log(comment_id);
    }

    handleCommentForm = (event) => {
        let newComment = event.target.value;
        this.setState({
            newComment,
        })
        console.log(newComment);
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        let classroomId = this.props.match.params.classroom_id;
        let commentContent = this.state.newComment;
        ClassRoomsModel.newComment(classroomId, commentContent)
        .then(newComment => {
            this.setState({
                classroom: {
                    ...this.state.classroom,
                    comments: this.state.classroom.comments.concat(newComment.data),
                },
                newComment: '',
            });
        });
        console.log(this.state)
    }


    render(){
        let singleClassroom = this.state.classroom === null ? <h2>Loading...</h2> : this.state.classroom
        console.log(this.state.classroom);

        let classroomComments = this.state.classroom === null ? null : this.state.classroom.comments
            .map( comment => {
                console.log(comment);
                // let datenumber = parseInt(comment.created_at.replace( /\D+/g, ''));
                let formatedCreated_at = `${comment.created_at.slice(0,10)} at ${comment.created_at.slice(11,19)}`
                return (
                    <div className="comment" key={comment._id}>
                        <div className="card">
                            <div className="created_at">{ formatedCreated_at }</div>
                            <div className="card-body">{ comment.content }
                                <button  
                                    className="commentButton btn-flat btn-small waves-effect waves-light red right"
                                    onClick={()=>this.deleteComment(comment._id)}>
                                    X
                                </button>
                                <button  
                                    className="commentButton btn-flat btn-small waves-effect waves-light blue right"
                                    onClick={()=>this.replyComment(comment._id)}>
                                    reply
                                </button>
                            </div>
                        </div>
                    </div>
                )
            })

        return (
            <div>
                <Header/>
                <h4 className="center-align"> { singleClassroom.title } </h4>
                <h4 className="center-align">teacher: { singleClassroom.teacher } </h4>
                <Link to ={`/classrooms`} className="col s12 m7">
                <img src={ singleClassroom.image_url } alt={singleClassroom.title} className="hoverable singleClassroomImg"/>
                </Link>

                {/* comment form */}
                <div className="row comment_form">
                    <form className="col s12" onSubmit={ this.onFormSubmit }>
                        <div className="row">
                            <div className="input-field col s6">
                                <input onInput={this.handleCommentForm}
                                value={this.state.newComment}
                                placeholder="Write your message!"
                                id="comment"
                                type="text"
                                className="validate" required/>
                            </div>
                        </div>
                        <button className="commentButton btn-flat btn-small waves-effect waves-light blue right" type="submit" name="action">New Message</button>
                    </form>
                </div>


                {/* end of comment form */}

                { classroomComments }               

                <Footer/>
            </div>
        )
    }
}

export default SingleClassRoom;
