import React from 'react';
import '../styles/pages/NotFound.css';

const NotFound = () => {
    return (
        <div className="notFoundPage">
        	<span className="floatingUFO"></span>
            <h1 className="notFoundNumber"> 404</h1>
            <p className="notFoundText">The page you're looking for does not exist.</p>
        </div>
    )
}

export default NotFound