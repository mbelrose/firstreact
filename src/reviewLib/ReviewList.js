import React, {useState} from "react";
import { Link, useSearchParams } from 'react-router-dom';


export default function ReviewList () { 

    const [errorMessage, setErrorMessage] = useState('_NONE');
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const [count, setCount] = useState(0);
    const [pages, setPages] = useState(1)
    const [page, setPage] = useState(
        parseInt(searchParams.get('page'))
        || 1
    );

    useState(() => { 

        fetch('/controller/reviews/?page=' + page)
        .then((response) => { 
            return response.json();
        }).then( (res ) => { 

            setReviews(res.reviews);
            setCount(res.count);
            setPages(parseInt(res.count / res.PAGE_SIZE));
            setLoading(false);
            if (res._errorMessage !== undefined) {
                throw new Error(res._errorMessage); 
            }
            
        }).catch((err) => { 
            setErrorMessage(err.message);
        });
    },[page]);

        
    if (errorMessage !== '_NONE') {
        return (
            <div>Error: {errorMessage}</div>
        );
    } else if (loading) {
        return (
            <div>LOADING...</div>
        );
    } else {
        return (
            <div>
                <ul>
                    { reviews.map( (i,j) => <li key={j}>
                        <Link to={'/reviews/'+i._id}>
                            {i.name}
                        </Link>
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
            </div>
        );
    }

}