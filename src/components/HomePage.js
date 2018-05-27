import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../styles/homepage.css';

class HomePage extends Component {
	render() {
		console.log("sanity check homepage")
		return (
            <div className='container-fluid home'>
                <div className="center-align">
                    <h1 className="home_text">VacWood School Community</h1>
                    <h5 className="home_text">A Place for Teachers and Families to Connect</h5>
                    <Link to='/' className='waves-effect waves-light blue btn-large'>Enter</Link>
                </div>
            </div>
		);
	}
}

export default HomePage;