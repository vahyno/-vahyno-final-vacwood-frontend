import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../styles/homepage.css';

class HomePage extends Component {
	render() {
		console.log("sanity check homepage")
		return (
            <div className='container-fluid home'>
                <div className="center-align">
                    <h1 className="center-align home_text">Vacwood School Community</h1>
                    <div className="valign-wrapper">
                        <h5 className="home_text"> Connecting Teachers and Families</h5>
                        <Link to='/classrooms' className='alternate-option waves-effect waves-light blue btn-small'>Enter</Link>
                    </div>
                </div>
            </div>
        )
    }
}
    
export default HomePage;