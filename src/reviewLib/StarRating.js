// Takes a state and dynamically generates row of clickable rating stars


import React, {useEffect, useState} from 'react';
import { FaStar } from 'react-icons/fa';

const StarRating = ({rating, setRating}) => {
    const STAR_LIMIT = 5;
    let starSet = [];
    useEffect (()=> {
        starSet = [];
        for (let i=1; i<=STAR_LIMIT; i++)  {
            starSet.push(
                <FaStar key={i}
                color={i<=rating?'red':'grey'} 
                onClick={() => setRating(i)}
            />);
        }
    }, [rating]);
    return (
        <React.Fragment>
            {starSet}
        </React.Fragment>
    );

}

export default StarRating;