import React from 'react';
import ReactDOM from 'react-dom';
import { fireEvent, render } from '@testing-library/react';
import RatingDetail from './RatingDetail';
import ReviewDetail from './ReviewDetail';

BeforeAll ( () => {
    //initialize db
})

test('renders a rating', () => {

    render(<ReviewDetail />);

 });


