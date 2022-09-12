// given a userid, checks validity and displays rating details
import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
import StarRating from './StarRating';
import GenericError from '../GenericError';


const ReviewDetail = () => {

    // const {id} = useParams();
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState({});
    const id = '63182cc192b3f2ea552f01fd';
    fetch('/controller/review/' + id)
    .then((response) => { 
        return response.json();
    }).then(( x ) => { 
        setReview(x);
        setRating(x.rating);
    }).catch(GenericError)
    .catch(() => { setReview({name: 'error', rating: 1});setRating(1) });

    return (
        <React.Fragment>
            <div>name: {review.name}</div>
            <StarRating rating={rating} setRating={setRating}/>
        </React.Fragment>
    );
}

export default ReviewDetail;