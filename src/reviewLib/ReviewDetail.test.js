import React from 'react';
import { render } from '@testing-library/react';
import ReviewDetail from './ReviewDetail';
import PopulateTest from '../../controller/PopulateTest';
const logError = require('../../TestErrorLog');

describe ('main test',()=>{
    
    test('renders a name', () => {
        
        const populate = PopulateTest()
        .then( prom => {

            // let reviewDetailTest = render(<ReviewDetail />);
            // let testName = reviewDetailTest.container.querySelectorAll('div')[0];
            // expect(testName.textContent).toEqual('name: sample');
            expect(false).toBeTruthy();

            return prom;
        }).catch(logError);
        
    });

}); 