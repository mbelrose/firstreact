// given a userid, checks validity and displays rating details
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import StarRating from './StarRating';
import GenericError from '../GenericError';


const ReviewDetail = () => {

    const {id} = useParams();
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState({});
    fetch('/controller/review/' + id)
    .then((response) => { 
        return response.json();
    }).then(( reviewFetch ) => { 
        setReview(reviewFetch);
        setRating(reviewFetch.rating);
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