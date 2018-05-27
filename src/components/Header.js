import React from 'react';
import {Link} from 'react-router-dom'
import '../App.css';


const Header = () => {
	return (

        <nav>
            <div className="nav-wrapper">
                <Link to='/' className="brand-logo">VacWood</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><Link to='/classrooms'>All Classrooms</Link></li>
                    <li><Link to='/classrooms' className="nav_link">New Classroom</Link></li>
                </ul>
            </div>
        </nav>

	);
}

export default Header;






