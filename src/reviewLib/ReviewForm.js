//takes state hooks for a review and a submission hook and prints the form, for update and add
import React from 'react';

export default function ReviewForm ({review, setField, submitAction}) { 
    
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
                    onChange={(e) => setField({name: e.target.value})}
                 />
            </label>
            <br/><input type="submit" />
        </form>

    );
 }