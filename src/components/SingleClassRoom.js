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
                                    className="commentButton btn-flat btn-small waves-effect waves-light green right"
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

                <h6>here will be comment form</h6>

                {/* end of comment form */}

                { classroomComments }               

                <Footer/>
            </div>
        )
    }
}

export default SingleClassRoom;
