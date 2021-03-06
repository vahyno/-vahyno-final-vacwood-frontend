import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAddClassroom } from '../actions/classroom';
import { Link, withRouter } from 'react-router-dom';
import {Row, Input} from 'react-materialize';

import '../styles/singleClassroom.css';
import Header from './Header';
import Footer from './Footer';

const defaultImg = 'https://kindercraze.com/wp-content/uploads/2015/10/vintage-carnival-9.jpg';


class NewClassRoom extends Component {
    state = {
        title: 'Kindergarten',
        teacher: '',
        info: '',
        image_url: defaultImg,
    }

    handleInputChange = (e) => {
        let inputFieldName = e.target.name;
        this.setState({
        [inputFieldName]: e.target.value //computer property
        })
    }

    handleURLChange = (e) => {
        // console.log('target', e.target)
        // check if state url is original value. if yes, delete.
        if (this.state.image_url === defaultImg) {
            this.setState({image_url: ''});
        } else {
            this.setState({
                image_url: e.target.value
            })
        }
    }


    onFormSubmit = (e) => {
        e.preventDefault();
        let formData = {
            title: this.state.title,
            teacher: this.state.teacher,
            info: this.state.info,
            image_url: this.state.image_url,
            comments: [],    
        }

        this.setState(()=> ({
            title: 'Kindergarten',
            teacher: '',
            info: '',
            image_url: defaultImg,
        }))

        this.props.dispatch(handleAddClassroom(formData, this.props.history));
    }

    render(){
        return (
            <div className="blue lighten-5">
                <Header/> 
                <div className="column newFormClassroom center-align">
                    <form className="col s12" onSubmit={this.onFormSubmit}>
                        <Row className="input-field col s12">
                            <Input name="title" onChange={ this.handleInputChange } s={12} type='select' label="Classroom" defaultValue='Kindergarten'>
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
                            <input 
                                onFocus={ this.handleURLChange } 
                                onChange={ this.handleURLChange }
                                name="image_url" 
                                value={this.state.image_url} 
                                placeholder="Add image url" 
                                id="image" 
                                type="text" 
                                className="validate" 
                                required/>
                        </div>
                        <Link
                            to ={`/classrooms`} 
                            className="commentButton waves-effect waves-light blue lighten-3 btn update-button">
                            Cancel
                        </Link>
                        <button 
                            className="commentButton waves-effect waves-light blue lighten-2 btn" 
                            type="submit" 
                            name="action">
                            Create New Classroom
                        </button>
                    </form>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default withRouter(connect()(NewClassRoom));

