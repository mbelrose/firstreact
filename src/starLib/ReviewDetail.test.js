import React from 'react';
import ReactDOM from 'react-dom';
import { fireEvent, render } from '@testing-library/react';
import RatingDetail from './RatingDetail';

BeforeAll ( () => {
    //initialize db
})

test('renders a rating', () => {

    render(<RatingDetail />);

 });


