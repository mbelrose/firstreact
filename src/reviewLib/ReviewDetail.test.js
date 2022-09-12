
import React from 'react';
import { render } from '@testing-library/react';
import ReviewDetail from './ReviewDetail';
import PopulateTest from '../../controller/PopulateTest';
const logError = require('../../TestErrorLog');

describe ('main test',()=>{
    
    test('renders a rating', () => {
        
        const populate = PopulateTest()
        .then( prom => {
            render(<ReviewDetail />);
            return prom;
        }).catch(logError);
        
    });

}); 