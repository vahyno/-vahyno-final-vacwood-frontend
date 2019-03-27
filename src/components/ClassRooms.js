import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ClassRoomsModel from '../models/ClassRoomsModel';
import '../styles/classrooms.css';

import Header from './Header';
import Footer from './Footer';
import Classroom from './ClassRoom';


class ClassRooms extends Component {

    state = {
        results : null,
    }

    componentDidMount() {
        ClassRoomsModel.getAll()
        .then(data => {
            // console.log(data.data)
            this.setState({
                results: data.data
            });
        });
    }

    render (){

        const { results } = this.state;
        // console.log('results', results)

        return (
            <div>
            <Header/>
            <div className="allClassroomsContainer blue accent-1">
                <div className="row center-cols center-align">
                    { results !== null && (
                        results.map((classroom) => (
                            <div className="row allclassrooms card-action hoverable" key={classroom._id}>
                                <Link to ={`/classrooms/${classroom._id}`} className="col s12 m7">
                                    <Classroom classroom={classroom} /> 
                                </Link>    
                            </div>
                        )))
                    } 
                </div>
            </div>
            <Footer/>
            </div>
        )
    }
}

export default ClassRooms;