import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { handleInitialData } from '../actions/classroom';


// import ClassRoomsModel from '../models/ClassRoomsModel';
import '../styles/classrooms.css';

import Header from './Header';
import Footer from './Footer';
import Classroom from './ClassRoom';

import { connect } from 'react-redux';

class ClassRooms extends Component {
    render (){
        // console.log('PROPS!!!!', this.props)
        const { classroomIDs } = this.props;

        return (
            <div>
            <Header/>
            <div className="allClassroomsContainer blue accent-1">
                <div className="row center-cols center-align">
                    { classroomIDs.length > 0 && (
                        classroomIDs.map((classID) => (
                            <div className="row allclassrooms card-action hoverable" key={classID}>
                                <Link to ={`/classrooms/${classID}`} className="col s12 m7">
                                    <Classroom id={classID} /> 
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

function mapStateToProps({classrooms}) {
    return {
        classroomIDs: !classrooms ? [] : Object.keys(classrooms),
    }
}

export default connect(mapStateToProps)(ClassRooms);