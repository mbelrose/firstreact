//takes state hooks for a review and a submission hook and prints the form, for update and add
import React from 'react';

export default function ReviewForm ({review, setField, submitText, submitAction}) { 

    const fieldProps = {
        onChange: (e) => setField({[e.target.name]: e.target.value})
    };

    const submitForm = e => {
        e.preventDefault();
        submitAction();
    }

    return (
        <form onSubmit={submitAction} className="review-form">
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
            <br/><a href="#" onClick={submitForm}>{submitText || 'SUBMIT'}</a>
        </form>

    );
 }