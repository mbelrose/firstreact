// given a userid, checks validity and displays rating details
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import StarRating from './StarRating';

const ReviewDetail = () => {

    const {id} = useParams();
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(true);
    
    fetch('/controller/reviews/' + id)
    .then((response) => { 
        return response.json();
    }).then(( reviewFound ) => { 
        setReview(reviewFound);
        setRating(reviewFound.rating);
        setLoading(false);
        if (reviewFound._errorMessage !== null) {
            throw new Error(reviewFound._errorMessage);
        }
    }).catch((err) => { 
        setErrorMessage(err.message);
    });

    if (errorMessage !== '') {
        return(
            <div>{errorMessage}</div>
        );
    } else if (loading) {
        return (
            <div>LOADING...</div>
        );
    } else {
        return (
            <div>
                <div>name: {review.name}</div>
                <StarRating rating={rating} setRating={setRating}/>
            </div>
        );
    }

}

export default ReviewDetail;