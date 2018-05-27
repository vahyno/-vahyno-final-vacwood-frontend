import React, { Component } from 'react';
import ClassRoomsModel from '../models/ClassRoomsModel';
import Header from './Header';
import Footer from './Footer';


class NewClassRoom extends Component {
    state = {
        title: '',
        teacher: '',
        info: '',
        image_url: `http://www.smilesforall.com/wp-content/uploads/2013/10/schoolbus.png`,
    }

    handleInputChange = (e) => {
        // console.log('event', e)
        // console.log('target', e.target)
        let inputFieldName = e.target.name;
        this.setState({
        [inputFieldName]: e.target.value //computer property
        })
        // console.log('state', this.state)
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        console.log('Form Submit');
        let formData = {
            title: this.state.title,
            teacher: this.state.teacher,
            info: this.state.info,
            image_url: this.state.image_url,
            comments: [],    
        }
        ClassRoomsModel.createNew(formData)
            .then(data => {
                console.log(data);
                this.setState({
                    results: data.data
                });
                this.props.history.push('/classrooms');
            });
    }

    render(){
        return (
            <div>
                <Header/>
                <div className="column newformclass">
                    <form className="col s12" onSubmit={this.onFormSubmit}>
                        <div className="input-field col s12">
                            <input onChange={ this.handleInputChange } name="title" value={this.state.title} placeholder="Title" id="title" type="text" className="validate" required/>
                        </div>
                        <div className="input-field col s12">
                            <input onChange={ this.handleInputChange } name="teacher" value={this.state.teacher} placeholder="Teacher's name" id="teacher" type="text" className="validate" required/>
                        </div>
                        <div className="input-field col s12" >
                            <textarea cols="40" rows="10" onChange={ this.handleInputChange } name="info" value={this.state.info} placeholder="Additional information" className="validate" id="info"></textarea>
                        </div>
                        <div className="input-field col s12">
                            <input onChange={ this.handleInputChange } name="image_url" value={this.state.image_url} placeholder="Add image url" id="image" type="text" className="validate" required/>
                        </div>
                        <button className="waves-effect waves-light indigo lighten-2 btn create-btn" type="submit" name="action">Create New Classroom</button>
                    </form>
                </div>
                <Footer/>
            </div>
        )
    }
    
}

export default NewClassRoom;

