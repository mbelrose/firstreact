// given a userid, checks validity and displays rating details
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import StarRating from './StarRating';

const ReviewDetail = () => {

    const id = useParams().id.match(/^\w{1,255}$/).shift();

    const [rating, setRating] = useState(0);
    const [review, setReview] = useState({});
    const [errorMessage, setErrorMessage] = useState('_NONE');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/controller/reviews/' + id)
        .then((response) => { 

            return response.json();
        }).then(( reviewFound ) => { 
            setReview(reviewFound);
            setRating(reviewFound.rating);
            setLoading(false);
            if (reviewFound._errorMessage !== undefined) {
                throw new Error(reviewFound._errorMessage);
            }
        }).catch((err) => { 
            setErrorMessage(err.message);
        });
    }, [])

    if (errorMessage !== '_NONE') {
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
                <br/>
                <Link to={'/reviews/update/'+review._id}>UPDATE</Link>
            </div>

        );
    }

}

export default ReviewDetail;