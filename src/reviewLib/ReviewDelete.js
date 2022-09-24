import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import deleteReviewFetch from './deleteReviewFetch';
import StatusMessage from '../common/StatusMessage';

export default function ReviewDelete () {

    const [status, setStatus] = useState({ type: 'IDLE' });
    const statusClear = useRef(null);

    const id = useParams().id.match(/^\w{1,255}$/).shift();


    useEffect(() => {

        setStatus({ type: 'IDLE' });

    }, []);



    if (status.type === 'IDLE') {
        return (
            <div>
                Are you sure you wish to delete?<br/>
                <div onClick={e => deleteReviewFetch(id, setStatus)}>Yes</div>
                <div onClick={e => window.history.back()}>No</div>
            </div>
        );
    } else {
        return (
            <div>
                <div>
                <Link to="/reviews/">&lt;&lt;&lt;Go back to list.</Link>
                </div>
                <StatusMessage status={status} setStatus={setStatus} statusClear={(statusClear)} />
            </div>
        );
    }
}