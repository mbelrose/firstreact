// take count, state for page, and pagesize constant
// make links to next and previous page
import React from "react";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import {Link} from 'react-router-dom'

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
                <FaLongArrowAltLeft /> PREV
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
                NEXT <FaLongArrowAltRight />
            </Link>
        );
    }

    const formSubmit = (e) => {
        e.preventDefault;
        setPage(
            parseInt(e.target.querySelector('[name=page]').value)
            || 1
        );
    }
    
    const userPage = (
        <React.Fragment>
            <input 
                name="page"
                type="text" 
                placeholder={page} 
                size="2" 
            />
        </React.Fragment>
    )

    return (
        <div className="pagination-links">
            <form action="#" onSubmit={formSubmit}>
                {prevLink}
                Page {userPage} of {pages}
                {nextLink}            
            </form>
        </div>
    );

}