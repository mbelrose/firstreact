// Takes a state and dynamically generates row of clickable rating stars


import React, {useEffect, useState} from 'react';
import { FaStar } from 'react-icons/fa';

const StarRating = ({rating, setRating}) => {
    const starLimit = 5;
    const [starSet, setStarSet] = useState([]);
    useEffect (()=> {
        let iSet = [];
        for (let i=1; i<=starLimit; i++)  {
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

export default StarRating;