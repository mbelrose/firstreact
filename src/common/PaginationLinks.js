// take count, state for page, and pagesize constant
// make links to next and previous page
import React from "react";
import {Link} from 'react-router-dom';

export default function PaginationLinks ({count, page : oldPage, setPage, pageSize}) {


    pageSize = parseInt(pageSize);
    if ( isNaN(pageSize) || pageSize < 1 ) { pageSize = 1 }
    count = parseInt(count);
    if ( isNaN(count) ) { count = 1 }
    let page = (parseInt(oldPage));
    if ( isNaN(page) || page < 1 ) { page = 1 }
    
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

    
    let userPage = (
        <React.Fragment>
        <form action="#" onSubmit={ 
                    e=>{e.preventDefault;
                    setPage(
                        e.target.querySelector('[name=userPage]').value;
                    )}}>
            <input 
                name="userPage"
                type="text" 
                placeholder={page} 
                size="2" 
            />
        </form>
        </React.Fragment>
    )

    let text = (
        <React.Fragment>
            {prevLink}
            &nbsp; Page { userPage } of { pages } &nbsp;
            
            {nextLink}            
        </React.Fragment>
    );

    return text;
}