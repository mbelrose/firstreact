// Takes a state and dynamically generates row of clickable rating stars


import React, {useEffect, useState} from 'react';
import { FaStar } from 'react-icons/fa';

export default function StarRating ({rating, setRating}) => {
    const STAR_LIMIT = 5;
    const [starSet, setStarSet] = useState([]);
    useEffect (()=> {
        let iSet = [];
        for (let i=1; i<=STAR_LIMIT; i++)  {
            iSet.push(
                <FaStar key={i}
                color={i<=rating?'red':'grey'} 
                onClick={() => setRating(i)}
            />);
        }
        setStarSet(iSet);
    }, [rating]);
    return (
        <React.Fragment>
            {starSet}
        </React.Fragment>
    );

}