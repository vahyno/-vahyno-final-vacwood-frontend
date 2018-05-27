import React from 'react';
import {Link} from 'react-router-dom'
import '../App.css';


const Footer = () => {
	return (

        <footer className="page-footer center-align">
            <div className="container">
                <div className="row">
                    <div className="col l6 s12">
                        <h5 className="white-text">Footer Content</h5>
                        <p className="grey-text text-lighten-4">Blah blah blah.</p>
                    </div>
                    <div className="col l4 offset-l2 s12">
                        <h5 className="white-text">Links</h5>
                        <ul>
                            <li><Link to='/classrooms' className="grey-text text-lighten-3" href="#!">Link 1</Link></li>
                            <li><Link to='/classrooms' className="grey-text text-lighten-3" href="#!">Link 2</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-copyright center-align">
                <div className="container">
                © 2018 MV
                </div>
            </div>
        </footer>  

	);
}

export default Footer;










