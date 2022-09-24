import React, {useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from 'react-router-dom';
import DeleteButton from "./DeleteButton";
import StatusMessage from '../common/StatusMessage';


export default function ReviewList () { 

    const [reviews, setReviews] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const [status, setStatus] = useState({ type: 'IDLE' });
    const statusClear = useRef(null);


    const [pages, setPages] = useState(1)
    const [page, setPage] = useState(
        parseInt(searchParams.get('page'))
        || 1
    );

    useEffect(() => { 

        setStatus({ type: 'LOADING' });
        fetch('/controller/reviews/?page=' + page)
        .then((res) => {
            
            res.json().then( (msg) => {

                if (msg._errorMessage) {
                    setStatus({ type: 'ERROR', errorMessage: msg._errorMessage });
                } else {
                    setReviews(msg.reviews);
                    setPages(parseInt(msg.count / msg.PAGE_SIZE));
                    setStatus({ type: 'IDLE' });
                }

            }).catch( (err) => {
                setStatus({ type: 'ERROR', errorMessage: 'No response.' });
            });

        }).catch((err) => { 
            setStatus({ type: 'ERROR', errorMessage: err.message });
        });
    },[page]);

    return (
        <div>
            <ul>
                { reviews.map( (i,j) => <li key={j}>
                    <Link to={'/reviews/'+i._id}>
                        {i.name}
                    </Link>&nbsp;
                    <DeleteButton id={i._id} setStatus={setStatus} />
                </li> )}
            </ul>
            <Link 
                to={'/reviews/?page=' + ((page > 1)?page - 1:1) } 
                onClick={e=>{e.preventDefault;setPage((page > 1)?page - 1:1 )}}
            >&lt;&lt;PREV</Link>&nbsp;
            Page {page } of { pages } &nbsp;
            <Link 
                to={'/reviews/?page=' + ((page < pages)?page +1:pages) }
                onClick={e=>{e.preventDefault;setPage((page < pages)?page +1:pages )}}
            >NEXT&gt;&gt;</Link>
            <br/>
            <StatusMessage 
                status={status} setStatus={setStatus} 
                statusClear={statusClear} 
            />
        </div>
    );
}