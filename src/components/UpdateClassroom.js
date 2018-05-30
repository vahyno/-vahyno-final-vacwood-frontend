import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ClassRoomsModel from '../models/ClassRoomsModel';
import '../styles/singleClassroom.css';
import Header from './Header';
import Footer from './Footer';


class UpdateClassroom extends Component {
    state = {
        classroom: '',
        title: '',
        teacher: '',
        info: '',
        image_url: '',
        comments: [],   
    }

    componentDidMount() {
        console.log('State passed through form: ', this.props.location.state.oldFormData)
        let oldFormData = this.props.location.state.oldFormData;
        this.setState({
          title: oldFormData.title,
          teacher: oldFormData.teacher,
          info: oldFormData.info,
          image_url: oldFormData.image_url,
          comments: oldFormData.comments,
        });
    }

    handleInputChange = (event) => {
        // console.log('event', event)
        // console.log('target', event.target)
        let inputFieldName = event.target.name;
        this.setState({
        [inputFieldName]: event.target.value //computer property
        })
        // console.log('state', this.state)
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        // console.log('Form Submit', event);
        let formData = {
            title: this.state.title,
            teacher: this.state.teacher,
            info: this.state.info,
            image_url: this.state.image_url,
            comments: this.state.comments,
        }
        let classroomId = this.props.match.params.classroom_id;
        console.log('Form Data ', formData)

        ClassRoomsModel.editClassroom(classroomId, formData)
        .then(data => {
            console.log(data.data);
            this.setState({
                // classroom: data.data
                    title: data.data.title,
                    teacher: data.data.teacher,
                    info: data.data.info,
                    image_url: data.data.image_url,
                    comments: data.data.comments
            });
            this.props.history.push(`/classrooms/${classroomId}`);
        });
    }
       


    render(){
        let classroomId = this.props.match.params.classroom_id;
        return (
            <div className="view-fix blue lighten-4">
                <Header/>

                {/* classroom form */}
                <div className="column newformclass center-align">
                    <form className="col s12" onSubmit={this.onFormSubmit}>
                        <div className="input-field col s12">
                            <input onChange={ this.handleInputChange } name="title" value={this.state.title} placeholder="Title" id="title" type="text" className="validate" required/>
                        </div>
                        <div className="input-field col s12">
                            <input onChange={ this.handleInputChange } name="teacher" value={this.state.teacher} placeholder="Teacher's name" id="teacher" type="text" className="validate" required/>
                        </div>
                        <div className="input-field col s12" >
                            <textarea cols="40" rows="10" onChange={ this.handleInputChange } name="info" value={this.state.info} placeholder="Additional information" className="textarea validate" id="info"></textarea>
                        </div>
                        <div className="input-field col s12">
                            <input onChange={ this.handleInputChange } name="image_url" value={this.state.image_url} placeholder="Add image url" id="image" type="text" className="validate" required/>
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
                
                {/* classroom form */}


                <Footer/>
            </div>
        )
    }
}

export default UpdateClassroom;
