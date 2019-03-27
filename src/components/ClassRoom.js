import React from 'react';
import '../styles/classrooms.css';

const ClassRoom = (props) => {
    const { title, teacher, image_url, info} = props.classroom

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

export default ClassRoom;

