//takes state hooks for a review and a submission hook and prints the form, for update and add
import React from 'react';

export default function ReviewForm ({review, setField, submitAction}) { 

    const fieldProps = {
        onChange: (e) => setField({[e.target.name]: e.target.value})
    };
    return (
        <form onSubmit={submitAction}>
            <label>
                Name: 
                <input
                    name="name" 
                    placeholder="Name" 
                    type="text" 
                    required
                    value={review.name || ''}
                    {...fieldProps}
                 />
            </label>
            <br/><input type="submit" />
        </form>

    );
 }