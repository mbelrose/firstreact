
import React from 'react';
import ReactDOM from 'react-dom';
import { fireEvent, render } from '@testing-library/react';
import ReviewDetail from './ReviewDetail';
import PopulateTest from '../../controller/PopulateTest';

describe ('main test',()=>{
    
    beforeAll( () => {
        const populate = PopulateTest();
    });
    
    test('renders a rating', () => {
        
        render(<ReviewDetail />);
        
    });

}); 