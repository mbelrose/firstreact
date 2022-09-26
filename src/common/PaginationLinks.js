// take count, state for page, and pagesize constant
// make links to next and previous page
import React, { useEffect } from "react";
import {Link} from 'react-router-dom';

export default function PaginationLinks ({count, page, setPage, pageSize}) {

    pageSize = parseInt(pageSize);
    if ( isNaN(pageSize) || pageSize < 1 ) { pageSize = 1 }
    count = parseInt(count);
    if ( isNaN(count) ) { count = 1 }
    setPage(parseInt(page));
    if ( isNaN(page) ) { setPage(1) }
    
    const pages = Math.ceil(count / pageSize);
    const prevPage = (page > 1) ? page-1 : 0;
    let prevLink = '';
    if ( prevPage > 0 ) {
        prevLink = (
            <Link 
                to={ '/reviews/?page='+prevPage } 
                onClick={ 
                    e=>{e.preventDefault;
                    setPage(prevPage)}}
            >
                &lt;&lt;PREV
            </Link>
        );
    }
    const nextPage = (page < pages) ? page+1 : 0;
    let nextLink = '';
    if ( nextPage > 0 ) {
        nextLink = (
            <Link 
                to={ '/reviews/?page='+nextPage }
                onClick={ 
                    e=>{e.preventDefault;
                    setPage(nextPage)}}
            >
                NEXT&gt;&gt;
            </Link>
        );
    }

    let text = (
        <React.Fragment>
            {prevLink}
            &nbsp; Page { page } of { pages } &nbsp;
            {nextLink}            
        </React.Fragment>
    );

    return text;
}