import React from 'react';
// import {Link} from 'react-router-dom'
import '../App.css';


const Footer = () => {
	return (

        <footer className="page-footer blue accent-2 center-align">
            <div className="container">
                        <h5 className="grey-text text-lighten-4">A Place for Teachers and Families to Connect.</h5>
                        <h6 className="white-text">App source code:</h6>
                        <ul>
                            <li><a className="grey-text text-lighten-3" href="https://github.com/vahyno/-vahyno-final-vacwood-frontend">github frontend</a></li>
                            <li><a className="grey-text text-lighten-3" href="https://github.com/vahyno/final-vacwood-backend">github backend</a></li>
                        </ul>
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










