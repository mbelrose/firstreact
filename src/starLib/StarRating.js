import React, {useEffect, useState} from 'react';

import { FaStar } from 'react-icons/fa';

const StarRating = () => {
    const starLimit = 5;
    const [rating, setRating] = useState(3);
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