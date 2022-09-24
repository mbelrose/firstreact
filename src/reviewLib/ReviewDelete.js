import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import StatusMessage from './StatusMessage';

export default function ReviewDelete () {

    const [status, setStatus] = useState({ type: 'IDLE' });
    const statusClear = useRef(null);

    const id = useParams().id.match(/^\w{1,255}$/).shift();

    function deleteReview ( id ) {

        setStatus({ type: 'SAVING' });
        fetch(
            '/controller/reviews/' + id, {
                method: 'DELETE',
                headers: {'Content-Type' : 'application/json'}
            })
        .then( (res) => {
            if (res.ok) {
                setStatus({ type: 'DELETED' });
            } else {
                res.json().then( (msg) => {
                    setStatus({ type: 'ERROR', errorMessage: msg._errorMessage });
                }).catch( (err) => {
                    setStatus({ type: 'ERROR', errorMessage: 'No response.' });
                });
            }
            return res;
        }).catch((err) => {
            setStatus({ type: 'ERROR', errorMessage: err.message });
         });

    }

    useEffect(() => {

        setStatus({ type: 'IDLE' });

    }, []);



    if (status.type === 'IDLE') {
        return (
            <div>
                Are you sure you wish to delete?<br/>
                <div onClick={e => deleteReview(id)}>Yes</div>
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