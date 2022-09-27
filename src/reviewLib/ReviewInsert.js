import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ReviewForm from './ReviewForm';
import StarRating from './StarRating';
import StatusMessage from '../common/StatusMessage';

export default function ReviewInsert () {

    const [review, setReview] = useState({});

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
                return res.json();
            } else {
                res.json().then( (msg) => {
                    setStatus({ type: 'ERROR', errorMessage: msg._errorMessage });
                }).catch( (err) => {
                    setStatus({ type: 'ERROR', errorMessage: 'No response.' });
                });
                return res;
            }
        }).then( (reviewResult) => { 

            if (reviewResult._id !== undefined) {
                navigate('/reviews/' + reviewResult._id);
            }

        }).catch((err) => {
            setStatus({ type: 'ERROR', errorMessage: err.message});
         });

    }

    const setField = (field) => {
        setReview( review => {
            return ({...review, ...field});
        })
    }

    useEffect(() => {

        setStatus({ type: 'IDLE' });

    }, []);


    if (status.type === 'SUCCESS') {
        return (<div>redirecting</div>);
    } else {
        return (
            <div>
                <ReviewForm
                    review={review}
                    setField={(field) => setReview({...review, ...field})}
                    submitAction={(event)=> {
                        event.preventDefault();
                        insertReview(review); }}
                />
                <StarRating
                    review={review}
                    setField={setField}
                    updateRating={e=>e}
                />
                <StatusMessage 
                    status={status} setStatus={setStatus} 
                    statusClear={statusClear} 
                    />
            </div>
        );
    }
}

