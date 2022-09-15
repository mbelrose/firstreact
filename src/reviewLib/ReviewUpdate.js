import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReviewForm from './ReviewForm';
import StarRating from './StarRating';


function updateReviewSubmit (event, reviewTmp) {
    //save rating on form submit
    event.preventDefault();
    updateReview(reviewTmp);
}

function updateReview (reviewTemp) {

}

export default function ReviewUpdate () {

    const id = useParams().id.match(/^\w{1,255}$/).shift();

    const [rating, setRating] = useState();
    const [review, setReview] = useState();

    const [errorMessage, setErrorMessage] = useState('_NONE');
    const [status, setStatus] = useState('idle');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      //save rating on every star click
      updateReview({rating: rating});
    
    }, [rating]);
    
    function statusMessage(status) {
        switch (status) { 
            case 'saving': return (<div>saving</div>);
            case 'error': return (<div>error</div>);
            default: return ('');
        }
        
    }


    useEffect(() => {
        fetch('/controller/reviews/' + id)
        .then(response => response.json())
        .then( ( reviewFound, err ) => { 

            setStatus(status);
            console.log('in object: '+ Object.keys({...reviewFound}) );
            setReview({test: 1});
            let x = review;
            console.log('in review: ' + Object.keys(x) );
            setRating(reviewFound.rating);
            setLoading(false);
            if (reviewFound._errorMessage !== undefined) {
                throw new Error(reviewFound._errorMessage);
            }
    
        })
        .catch((err) => { 
            setErrorMessage(err.message);
        });
    }, []);


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
                <ReviewForm 
                    review={review} setReview={setReview}
                    submitAction={(event)=>updateReviewSubmit(event,review)}
                />
                <StarRating rating={rating} setRating={setRating}/>
                {statusMessage(status)}
            </div>
        );
    }

}