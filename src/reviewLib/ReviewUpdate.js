import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReviewForm from './ReviewForm';
import StarRating from './StarRating';

function updateReview (event) {
    //save rating
    event.preventDefault();
}

export default function ReviewUpdate () {

    const {id} = useParams();
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      //save rating on every star click
      console.log(rating);
    
      
    }, [rating]);
    

    useEffect(() => {
    
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
    }, [])


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
                <ReviewForm 
                    review={review} setReview={setReview}
                    submitAction={updateReview}
                />
                <StarRating rating={rating} setRating={setRating}/>
            </div>
        );
    }

}