import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ClassRoomsModel from '../models/ClassRoomsModel';
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
                    <div className="row allclassrooms" key={classroom._id}>
                        <div className="col s12 m7">
                            <div className="card">
                                <div className="card-image">
                                    <h4 className="center-align">{ classroom.title }</h4>
                                    <h4 className="center-align">{ classroom.teacher }</h4>
                                    <img src={ classroom.image_url } alt={ classroom.image_url }/>
                                </div>
                            <div className="card-content">
                                <p> { classroom.info } </p>
                            </div>
                                <div className="card-action hoverable">
                                    <Link to='/' >More Details</Link>
                                </div>
                            </div>
                        </div>
                    </div>        
                );
            }); 

        return (
            <div>
                <Header/>

                 { results } 

                <Footer/>
               
            </div>
        )
    }
}

export default ClassRooms;