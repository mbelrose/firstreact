import React, {useEffect, useState} from 'react';

import { FaStar } from 'react-icons/fa';

const Star = () => {
    const starLimit = 5;
    const [rating = 3, setRating] = useState();
    let ratingStars = [];
//    useEffect ( () => {
    ratingStars = [];
        for (let i=1; i<=starLimit; i++)  {
            ratingStars.push(
                <FaStar 
                color={i<=rating?'red':'grey'} 
                onClick={() => setRating(i)}
            />);
        }
 //   }, []);
    return (
        <React.Fragment>
            {ratingStars}
        </React.Fragment>
    );

}

export default Star;