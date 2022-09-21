import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ReviewForm from './ReviewForm';
import StarRating from './StarRating';
import StatusMessage from './StatusMessage';

export default function ReviewInsert () {

    const [review, setReview] = useState({rating: 1});

    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState('_NONE');
    const [status, setStatus] = useState('IDLE');
    const statusClear = useRef(null);

    function insertReview (reviewPosting) {

        setStatus('SAVING');
        fetch(
            '/controller/reviews/', {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(reviewPosting)
            })
        .then( (res) => {
            if (res.ok) {
                setStatus('SUCCESS');
            } else {
                setStatus('ERROR');
            }
            return res.json();
        }).then( (reviewResult) => { 
            setReview(reviewResult);
            navigate('/reviews/' + reviewResult._id);

        }).catch((err) => {
            setStatus('ERROR');
            setErrorMessage(err.message);
         });

    }

    useEffect(() => {

        setStatus('IDLE');
        setErrorMessage('_NONE');
        setReview({rating: 1});

    }, []);


    if (errorMessage !== '_NONE') {
        return(
            <div>{errorMessage}</div>
        );
    } else if (status === 'SUCCESS') {
        return (<div>redirecting</div>);
    } else {
        return (
            <div>
                <ReviewForm
                    review={review}
                    setReview={setReview}
                    submitAction={(event)=> {
                        event.preventDefault();
                        insertReview(review); }}
                />
                <StarRating
                    review={review}
                    setReview={setReview}
                    updateRating={e=>e}
                    clickable="true"
                />
                <StatusMessage status={status} setStatus={setStatus} statusClear={statusClear} />
            </div>
        );
    }
}

