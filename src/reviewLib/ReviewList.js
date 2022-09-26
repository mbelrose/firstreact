import React, {useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from 'react-router-dom';
import DeleteButton from "./DeleteButton";
import StatusMessage from '../common/StatusMessage';
import PaginationLinks from "../common/PaginationLinks";



export default function ReviewList () { 

    const [reviews, setReviews] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const [status, setStatus] = useState({ type: 'IDLE' });
    const statusClear = useRef(null);


    const [pageSize, setPageSize] = useState(3);
    const [count, setCount] = useState(1);
    const [page, setPage] = useState(
        parseInt(searchParams.get('page'))
        || 1
    );

    const [update, setUpdate] = useState(0);
    const forceUpdate = () => {
      setUpdate(update + 1);
    }
  

    useEffect(() => { 

        setStatus({ type: 'LOADING' });
        fetch('/controller/reviews/?page=' + page)
        .then((res) => {
            
            res.json().then( (msg) => {

                if (msg._errorMessage) {
                    setStatus({ type: 'ERROR', errorMessage: msg._errorMessage });
                } else {
                    setReviews(msg.reviews);
                    setCount(msg.count);
                    setPageSize(msg.PAGE_SIZE);
                    setStatus({ type: 'IDLE' });
                }

            }).catch( (err) => {
                setStatus({ type: 'ERROR', errorMessage: 'No response.' });
            });

        }).catch((err) => { 
            setStatus({ type: 'ERROR', errorMessage: err.message });
        });
    },[page, update]);

    return (
        <div>
            <ul>
                { reviews.map( (i,j) => <li key={j}>
                    <Link to={'/reviews/'+i._id}>
                        {i.name}
                    </Link>&nbsp;
                    <DeleteButton id={i._id} setStatus={setStatus} forceUpdate={forceUpdate} />
                </li> )}
            </ul>
            <PaginationLinks 
                count={count} 
                page={page} setPage={setPage}
                pageSize={pageSize} 
            />
            <br/>
            <StatusMessage 
                status={status} setStatus={setStatus} 
                statusClear={statusClear} 
            />
        </div>
    );
}