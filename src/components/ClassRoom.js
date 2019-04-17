import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/classrooms.css';


class ClassRoom extends Component {
    render() {
        const { title, teacher, image_url, info} = this.props.classroom
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
            : classrooms[Object.keys(classrooms).filter( key => id === key)]
    }
}

export default connect(mapStateToProps)(ClassRoom);

