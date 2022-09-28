// given a userid, checks validity and displays rating details
import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import StarRating from './StarRating';
import StatusMessage from '../common/StatusMessage';

export default function ReviewDetail() {

    const id = useParams().id.match(/^\w{1,255}$/).shift();

    const [review, setReview] = useState({});
    
    const [status, setStatus] = useState({ type: 'LOADING' });
    const statusClear = useRef(null);
    const [text, setText] = useState('');

    useEffect(() => {
        fetch('/controller/reviews/' + id)
            .then((response) => {

                return response.json();
            }).then((reviewFound) => {

                setReview(reviewFound);
                setStatus({ type: 'IDLE' });
                if (reviewFound._errorMessage !== undefined) {
                    throw new Error(reviewFound._errorMessage);
                }
            }).catch((err) => {

                setStatus({ type: 'ERROR', errorMessage: err.message});
            });
    }, [])

    if (status.type == 'IDLE') {
        setText (
        <React.Fragment>
            <div>name: {review.name}</div>
            <StarRating 
                review={review} 
                setField={() => {}}
                updateRating={()=>{}}
            />
            <br />
            <Link to={'/reviews/update/' + id}>UPDATE</Link>&nbsp;
            <Link to={'/reviews/delete/' + id}>DELETE</Link>
        </React.Fragment>
        );

    }

    return (
        <div>
            {text}
            <StatusMessage 
                status={status} setStatus={setStatus} 
                statusClear={statusClear} 
            />
        </div>
    );
}