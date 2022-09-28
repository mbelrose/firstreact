import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ReviewForm from './ReviewForm';
import StarRating from './StarRating';
import StatusMessage from '../common/StatusMessage';

export default function ReviewUpdate () {

    const [review, setReview] = useState({});

    const [status, setStatus] = useState({ type: 'IDLE' });
    const statusClear = useRef(null);

    const id = useParams().id.match(/^\w{1,255}$/).shift();



    function updateReview (reviewPosting) {

        setStatus({ type: 'SAVING' });
        fetch(
            '/controller/reviews/' + id, {
                method: 'PUT',
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
        }).catch((err) => {
            setStatus({ type: 'ERROR', errorMessage: err.message });
         });

    }

    const setField = (field) => {
        setReview( review => {
            return ({...review, ...field});
        })
    }

    const updateRating = (rating) => {
        //save rating on every star click
        if (rating !== undefined ) {

            updateReview({rating: rating});

        }
    }

    useEffect(() => {
        setStatus({ type: 'LOADING' });

        fetch('/controller/reviews/' + id)
        .then(response => response.json())
        .then( ( reviewFound ) => {

            setReview(reviewFound);
            setStatus({ type: 'IDLE' });
            if (reviewFound._errorMessage !== undefined) {
                throw new Error(reviewFound._errorMessage);
            }

        }).catch((err) => {
            
            if (err.message.match(/^JSON.parse/)) {
                err.message = 'No response.';
            }
            setStatus({ type: 'ERROR', errorMessage: err.message });
        });

    }, []);


    return (
        <div>
            <ReviewForm
                review={review}
                setField={setField}
                submitAction={(event)=> {
                    event.preventDefault();
                    updateReview(review); }}
            />
            <StarRating
                review={review}
                setField={setField}
                updateRating={updateRating}
            />
            <StatusMessage status={status} setStatus={setStatus} statusClear={statusClear} />
        </div>
    );
}

