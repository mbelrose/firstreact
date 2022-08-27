import React from 'react';

import { FaStar } from 'react-icons/fa';

const Star = () => {
    return (
        <React.Fragment>
            <FaStar color='red'/>
            <FaStar color='red'/>
            <FaStar color='red'/>
            <FaStar color='grey'/>
            <FaStar color='grey'/>
        </React.Fragment>
    );
}

export default Star;