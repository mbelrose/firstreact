import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import deleteReviewFetch from './deleteReviewFetch';
import StatusMessage from '../common/StatusMessage';

export default function ReviewDelete () {

    const [status, setStatus] = useState({ type: 'IDLE' });
    const statusClear = useRef(null);

    const id = useParams().id.match(/^\w{1,255}$/).shift();

    if (status.type === 'IDLE') {
        return (
            <div className="App-main">
                Are you sure you wish to delete?<br/>
                <a href="#"  onClick={e => deleteReviewFetch(id, setStatus)}>Yes</a>
                &nbsp;
                <a href="#"  onClick={e => window.history.back()}>No</a>
            </div>
        );
    } else {
        return (
            <div className="App-main">
                <div>
                <Link to="/reviews/">&lt;&lt;&lt;Go back to list.</Link>
                </div>
                <StatusMessage status={status} setStatus={setStatus} statusClear={(statusClear)} />
            </div>
        );
    }
}