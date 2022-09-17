//takes state hooks for a review and a submission hook and prints the form, for update and add
import React from 'react';

export default function ReviewForm (props) { 
    
    const {review, setReview, submitAction} = props;

    return (
        <form onSubmit={submitAction}>
            <label>
                Name: 
                <input
                    name="name" 
                    placeholder="Name" 
                    type="text" 
                    required
                    value={review.name}
                    onChange={(e) => setReview({...review, name: e.target.value})}
                 />
            </label>
        </form>

    );
 }