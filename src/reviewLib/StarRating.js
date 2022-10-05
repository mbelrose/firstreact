// Takes a state and dynamically generates row of clickable rating stars


import React, {useEffect, useState} from 'react';
import { FaStar } from 'react-icons/fa';

export default function StarRating ({review, setField, updateRating}) {

    const STAR_LIMIT = 5;
    const [starSet, setStarSet] = useState([]);

    const starClick = (i) => (e) => {
        e.preventDefault();
        setField({rating: i});
        updateRating(i);
    }

    useEffect (()=> {
        
        let iSet = [];
        for (let i=1; i<=STAR_LIMIT; i++)  {
            iSet.push(
                <a 
                    key={i}
                    href="#" 
                    onClick={starClick(i)}
                >
                    <FaStar
                        key={i}
                        color={i<=(review.rating||1)?'red':'grey'} 
                    />
                </a>
            );
        }
        setStarSet(iSet);
    }, [review.rating]);
    return (
        <React.Fragment>
            {starSet}
        </React.Fragment>
    );

}