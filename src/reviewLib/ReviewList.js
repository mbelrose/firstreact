import React, {useState} from "react";
import {Link} from 'react-router-dom';


export default function ReviewList () { 

    const [errorMessage, setErrorMessage] = useState('_NONE');
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]);

    useState(() => { 
        
        fetch('/controller/reviews/')
        .then((response) => { 
            return response.json();
        }).then( (reviewList ) => { 

            setReviews(reviewList);
            setLoading(false);
            if (reviewList._errorMessage !== undefined) {
                throw new Error(reviewList._errorMessage); 
            }
            
        }).catch((err) => { 
            setErrorMessage(err.message);
        });
},[]);

        
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
            { reviews.length} Review(s)<br/>
                <ul>
                    { reviews.map( (i,j) => <li key={j}>
                        <Link to={'/reviews/'+i._id}>
                            {i.name}
                        </Link>
                    </li> )}
                </ul>
            </div>
        );
    }

}