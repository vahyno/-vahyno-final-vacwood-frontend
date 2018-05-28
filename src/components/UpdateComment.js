import React, { Component } from 'react';
import ClassRoomsModel from '../models/ClassRoomsModel';
import Header from './Header';
import Footer from './Footer';


class UpdateComment extends Component {
    state = {
        comment : '',
    }



    render() {
        return (
            <div>
                <Header/>
                <h1>update comment</h1>
                <Footer/>
            </div>
        )
    }
    
}

export default UpdateComment;

