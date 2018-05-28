import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ClassRoomsModel from '../models/ClassRoomsModel';
import '../styles/classrooms.css';

// import header , footer
import Header from './Header';
import Footer from './Footer';


class ClassRooms extends Component {

    state = {
        results: null,
    }

    componentDidMount() {
        ClassRoomsModel.getAll()
        .then(data => {
            console.log(data.data)
            this.setState({
                results: data.data
            });
        });
    }
    

    render (){

        let results = this.state.results === null ? null : this.state.results
            .map(classroom => {
                console.log("1 Classroom: ", classroom);
                return (
                    <div className="row allclassrooms card-action hoverable" key={classroom._id}>
                        <Link to ={`/classrooms/${classroom._id}`} className="col s12 m7">
                            <div className="card">
                                <div className="card-image">
                                    <h4 className="center-align">{ classroom.title }</h4>
                                    <h4 className="center-align">{ classroom.teacher }</h4>
                                    <img src={ classroom.image_url } alt={ classroom.image_url }/>
                                </div>
                                <div className="card-content">
                                    <p> { classroom.info } </p>
                                </div>
                            </div>
                        </Link>
                    </div>        
                );
            }); 

        return (
            <div className="blue accent-1">
                <Header/>

                <div className="row center-cols center-align">
                 { results } 
                </div>
                <Footer/>
               
            </div>
        )
    }
}

export default ClassRooms;