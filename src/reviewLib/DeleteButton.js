import React, {useEffect, useState} from 'react';
import deleteReviewFetch from './deleteReviewFetch';

export default function DeleteButton ({id, setStatus}) {

  const [showPopup, setShowPopup] = useState(false);
  const [popup, setPopup] = useState('');

  const deleteAction = () => {
    deleteReviewFetch(id, setStatus);
    setShowPopup(false);
  }

  useEffect(() => {
    setShowPopup(false);
  }, [])

  useEffect(() => {
    
    if (showPopup) {
      setPopup(
        <div>
        Are you sure you wish to delete?<br/>
          <div onClick={e => deleteAction()}>Yes</div>
          <div onClick={e => setShowPopup(false)}>No</div>
        </div>
      );
    } else {
      setPopup(
        <span onClick={e => setShowPopup(true)}>DELETE</span>
      );
    }
    
  }, [showPopup]);
  
  return (
    <React.Fragment>
      {popup}
    </React.Fragment>
  );
}