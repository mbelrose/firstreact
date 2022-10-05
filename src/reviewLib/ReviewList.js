import React, {useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from 'react-router-dom';
import DeleteButton from "./DeleteButton";
import StatusMessage from '../common/StatusMessage';
import PaginationLinks from "../common/PaginationLinks";



export default function ReviewList () { 

    const [reviews, setReviews] = useState([]);
    const [params, setParams] = useSearchParams();

    const [status, setStatus] = useState({ type: 'IDLE' });
    const statusClear = useRef(null);

    const [search, setSearch] = useState(
        params.get('search') || ''  
    );

    const [pageSize, setPageSize] = useState(3);
    const [count, setCount] = useState(1);
    const [page, setPage] = useState(
        parseInt(params.get('page'))
        || 1
    );

    const [update, setUpdate] = useState(0);
    const forceUpdate = () => {
      setUpdate(update + 1);
    }

    const clickSearch = (action) => (e) => {

        e.preventDefault();
        const searchBox = document
            .querySelector('.review-list-form')
            .querySelector('[name=search]');

        switch (action) {

            case 'CLEAR' : 
                setSearch('');
                searchBox.value = '';
                break;

            case 'SEARCH': 
                setSearch(searchBox.value);
                setPage(1);

        }
    }
  

    useEffect(() => { 

        let searchText = '';
        if (search !== '' && search !== undefined) {
            searchText = '&search='
                + encodeURIComponent(
                String(search)
                .substring(0,255));
        }
        setStatus({ type: 'LOADING' });
        fetch('/controller/reviews/?page=' + page + searchText)
        .then( (res) => {
            return res.json();
        }).then((msg) => {

            if (msg._errorMessage  !== undefined) {
                throw new Error(msg._errorMessage);
            }
            setReviews(msg.reviews);
            setCount(msg.count);
            setPageSize(msg.PAGE_SIZE);
            setStatus({ type: 'IDLE' });

        }).catch((err) => { 

            if (err.message.match(/^JSON/)) {
                err.message = 'No response.';
            }
            setStatus({ type: 'ERROR', errorMessage: err.message });

        });
    },[page, search, update]);

    return (
        <div className="App-main">
            <form 
                className="review-list-form"
                id="searchForm"
                action="#" 
                method="get" 
                onSubmit={clickSearch('SEARCH')}>
                <label>
                    <input 
                        type="search" 
                        name="search" 
                        placeholder={search
                        || 'Search for...'}
                    />
                </label>&nbsp;
                <a href="#" onClick={clickSearch('CLEAR')}>Clear</a>&nbsp;
                <a href="#" onClick={clickSearch('SEARCH')}>Search</a>
            </form>
            <ul className="review-list-items">
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