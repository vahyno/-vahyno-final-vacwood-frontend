import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ClassRoomsModel from '../models/ClassRoomsModel';
import '../styles/singleClassroom.css';
import Header from './Header';
import Footer from './Footer';


class UpdateClassroom extends Component {
    state = {
        classroom: null,
    }

    render(){


        return (
            <div>
                <Header/>

                {/* comment form */}
                YO
                {/* updated classroom */}


                <Footer/>
            </div>
        )
    }
}

export default UpdateClassroom;
