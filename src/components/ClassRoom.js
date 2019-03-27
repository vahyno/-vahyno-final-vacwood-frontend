import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/classrooms.css';


class ClassRoom extends Component {
    render() {
        // console.log('INDIVIDUAL CLASS :', this.props.classroom[0])
        const { title, teacher, image_url, info} = this.props.classroom[0]
        return (
            <div className="card">
                <div className="card-image">
                    <h4 className="center-align">{ title }</h4>
                    <h4 className="center-align">{ teacher }</h4>
                    <img src={ image_url } alt={ image_url }/>
                </div>
                <div className="card-content">
                    <p> { info } </p>
                </div>
            </div>
        )
    }
}

function mapStateToProps ({ classrooms }, { id }) {
    
    return {
        classroom: !classrooms 
            ? null
            : classrooms.data.filter( classroom => id === classroom._id)
    }
}

export default connect(mapStateToProps)(ClassRoom);

