import React, {useState} from "react";
import {Link} from 'react-router-dom';


const ReviewList = () => { 

    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]);

    useState(() => { 
        
        fetch('/controller/reviews/')
        .then((response) => { 
            return response.json();
        }).then( (reviewList ) => { 

            setReviews(reviewList);
            setLoading(false);
            if (reviewList._errorMessage !== null) {
                throw new Error(reviewList._errorMessage); 
            }
            
        }).catch((err) => { 
            setErrorMessage(err.message);
        });
},[]);

        
    if (errorMessage !== '') {
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

export default ReviewList;