import React from 'react';
import ReactDOM from 'react-dom';
import { fireEvent, render } from '@testing-library/react';
import ReviewDetail from './ReviewDetail';

BeforeAll ( () => {
    //initialize db
})

test('renders a rating', () => {

    render(<ReviewDetail />);

 });


