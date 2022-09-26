// Takes a state and dynamically generates row of clickable rating stars


import React, {useEffect, useState} from 'react';
import { FaStar } from 'react-icons/fa';

export default function StarRating ({review, setField, updateRating}) {

    const STAR_LIMIT = 5;
    const [starSet, setStarSet] = useState([]);

    useEffect (()=> {
        
        let iSet = [];
        for (let i=1; i<=STAR_LIMIT; i++)  {
            iSet.push(
                <FaStar key={i}
                color={i<=review.rating?'red':'grey'} 
                onClick={e=> {
                    setField({rating: i});
                    updateRating(i);
                }}
            />);
        }
        setStarSet(iSet);
    }, [review.rating]);
    return (
        <React.Fragment>
            {starSet}
        </React.Fragment>
    );

}