import React, { useState } from 'react';
import { fireEvent, render } from '@testing-library/react';
import StarRating from './StarRating';
const logError = require('../../TestErrorLog');

test('renders a star', () => { 

    render(<StarRating />);

 });


test('click star', () => {

  let mockRating = 3;
  const [ rating, setRating ]= [ jest.fn(()=> mockRating), jest.fn((x) => mockRating = x)];
  const testStarRating = render(
      <StarRating
        rating={rating} setRating={setRating}
      />
  );

    let testStar = testStarRating.container.querySelectorAll('svg')[3];
    fireEvent.click(testStar);
    expect(setRating).toHaveBeenCalledWith(4);
 });
