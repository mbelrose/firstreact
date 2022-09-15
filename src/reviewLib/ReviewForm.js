//takes state hooks for a review and a submission hook and prints the form, for update and add
import React from 'react';

export default function ReviewForm (props) { 
    
    const {review, setReview, submitAction} = props;
    // const {review} = reviewProp;
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
                    onChange={(value) => setReview({...review, name: value})}
                 />
            </label>
        </form>

    );
 }