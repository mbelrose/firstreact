import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ReviewForm from './ReviewForm';
import StarRating from './StarRating';
import StatusMessage from './StatusMessage';

export default function ReviewInsert () {

    const [review, setReview] = useState({rating: 1});

    const navigate = useNavigate();

    const [status, setStatus] = useState({ type: 'IDLE' });
    const statusClear = useRef(null);

    function insertReview (reviewPosting) {

        setStatus({ type: 'SAVING' });
        fetch(
            '/controller/reviews/', {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(reviewPosting)
            })
        .then( (res) => {
            if (res.ok) {
                setStatus({ type: 'SUCCESS' });
            } else {
                res.json().then( (msg) => {
                    setStatus({ type: 'ERROR', errorMessage: msg._errorMessage });
                }).catch( (err) => {
                    setStatus({ type: 'ERROR', errorMessage: 'No response.' });
                });
            }
            return res.json();
        }).then( (reviewResult) => { 

            if (reviewResult._id) {
                navigate('/reviews/' + reviewResult._id);
            }

        }).catch((err) => {
            setStatus({ type: 'ERROR', errorMessage: err.message});
         });

    }

    useEffect(() => {

        setStatus({ type: 'IDLE' });
        setReview({rating: 1});

    }, []);


    if (status.type === 'SUCCESS') {
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
                <StatusMessage 
                    status={status} setStatus={setStatus} 
                    statusClear={statusClear} 
                    />
            </div>
        );
    }
}

