import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleUpdateClassroom } from '../actions/classroom';
// import ClassRoomsModel from '../models/ClassRoomsModel';
import {Row, Input} from 'react-materialize';
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
        // console.log('State passed through form: ', this.props.location.state.oldFormData)
        // let oldFormData = this.props.location.state.oldFormData;
        const { classroomData } = this.props;
        console.log('CLASSROOM DATA: ', classroomData);
        // classroomData !== null
             this.setState({
                title: classroomData.title,
                teacher: classroomData.teacher,
                info: classroomData.info,
                image_url: classroomData.image_url,
                comments: classroomData.comments,
                })
            // : null;
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
        // let classroomId = this.props.match.params.classroom_id;
        // console.log('Form Data ', formData)

        const { dispatch, classroom_id, history } = this.props;
        dispatch(handleUpdateClassroom(classroom_id, formData, history));

        // ClassRoomsModel.editClassroom(classroomId, formData)
        // .then(data => {
        //     console.log(data.data);
        //     this.setState({
        //         // classroom: data.data
        //             title: data.data.title,
        //             teacher: data.data.teacher,
        //             info: data.data.info,
        //             image_url: data.data.image_url,
        //             comments: data.data.comments
        //     });
        //     this.props.history.push(`/classrooms/${classroomId}`);
        // });
    }
       


    render(){
        const  classroomId = this.props.match.params.classroom_id;
        return (
            <div className="blue lighten-4">
            {JSON.stringify(this.props.classroomData)}
                <Header/>

                {/* classroom form */}
                <div className="column updateClassroomFormContainer center-align">
                    <form className="col s12" onSubmit={this.onFormSubmit}>
                       {/* <div className="input-field col s12">
                            <input onChange={ this.handleInputChange } name="title" value={this.state.title} placeholder="Title" id="title" type="text" className="validate" required/>
                        </div> */}
                        <Row className="input-field col s12">
                            <Input name="title" onChange={ this.handleInputChange } s={12} type='select' label="Classroom" defaultValue={ this.state.title }>
                                <option onChange={ this.handleInputChange } value='Kindergarten'>{this.state.title}</option>
                                <option onChange={ this.handleInputChange } value='Kindergarten'>Kindergarten</option>
                                <option onChange={ this.handleInputChange } value='1st Grade'>1st Grade</option>
                                <option onChange={ this.handleInputChange } value='2nd Grade'>2nd Grade</option>
                                <option onChange={ this.handleInputChange } value='3rd Grade'>3rd Grade</option>
                                <option onChange={ this.handleInputChange } value='4th Grade'>4th Grade</option>
                                <option onChange={ this.handleInputChange } value='5th Grade'>5th Grade</option>
                            </Input>
                        </Row>
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

function mapStateToProps({classrooms}, props ) {
    const { classroom_id } = props.match.params;
    return {
        classroom_id,
        classroomData: classrooms[classroom_id]
            ? classrooms[classroom_id]
            : {
                classroom: '',
                title: '',
                teacher: '',
                info: '',
                image_url: '',
                comments: [],           
            },
    }
}

export default withRouter(connect(mapStateToProps)(UpdateClassroom));
