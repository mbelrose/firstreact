import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReviewForm from './ReviewForm';
import StarRating from './StarRating';

export default function ReviewUpdate () {

    const [rating, setRating] = useState();
    const [review, setReview] = useState();

    const [errorMessage, setErrorMessage] = useState('_NONE');
    const [status, setStatus] = useState('IDLE');
    const [loading, setLoading] = useState(true);

    const id = useParams().id.match(/^\w{1,255}$/).shift();

    function updateReview (reviewPosting) {

        setStatus('SAVING');
        fetch(
            '/controller/reviews/' + id, {
                method: 'PUT',
                body: JSON.stringify(reviewPosting)
            })
        .then( (res) => {
            if (res.ok) {
                setStatus('SUCCESS');
            } else {
                setStatus('ERROR');
            }
        }).catch((err) => { 
            setStatus('ERROR');
            setErrorMessage(err.message);
         });
    
    }

    function statusMessage(status) {
        switch (status) { 
            case 'IDLE': return ('');
            case 'SAVING': return (<div>Saving...</div>);
            case 'ERROR': return (<div>Error.</div>);
            case 'SUCCESS': return (<div>Saved.</div>);
            default: return ('');
        }
    }

    const updateRating = (rating) => {
        //save rating on every star click
        if (rating !== undefined ) {
            
            setRating(rating);
            updateReview({rating: rating});

        }
    }

    useEffect(() => {
        setStatus('IDLE');
        setErrorMessage('_NONE');
        
        fetch('/controller/reviews/' + id)
        .then(response => response.json())
        .then( ( reviewFound ) => { 

            setReview(reviewFound);
            setRating(reviewFound.rating);
            setLoading(false);
            if (reviewFound._errorMessage !== undefined) {
                throw new Error(reviewFound._errorMessage);
            }
    
        }).catch((err) => { 
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
                    review={review} 
                    setReview={setReview}
                    submitAction={(event)=> {
                        event.preventDefault();
                        updateReview(review); }}
                />
                <StarRating 
                    rating={rating} 
                    setRating={updateRating}
                />
                {statusMessage(status)}
            </div>
        );
    }
}

