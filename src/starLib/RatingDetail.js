// given a userid, checks validity and displays rating details
import React, { useState } from 'react';
import StarRating from './StarRating';

const RatingDetail = () => {


    const [rating, setRating] = useState(2);
    return (
        <React.Fragment>
            other details go here
            <StarRating rating={rating} setRating={setRating}/>
        </React.Fragment>
    );
}

export default RatingDetail;