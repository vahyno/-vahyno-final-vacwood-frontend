import React from 'react';
import {Link} from 'react-router-dom'
import '../App.css';


const Header = () => {
	return (

        <header>
            <nav>
                <div className="nav-wrapper blue accent-2">
                    <Link to='/' className="brand-logo">Vacwood</Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><Link to='/classrooms'>All Classrooms</Link></li>
                        <li><Link to='/classrooms/new' className="nav_link">New Classroom</Link></li>
                    </ul>
                </div>
            </nav>
        </header>
	);
}

export default Header;






