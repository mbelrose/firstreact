import React, {useEffect, useState} from 'react';
import deleteReviewFetch from './deleteReviewFetch';

export default function DeleteButton ({id, setStatus, forceUpdate}) {

  const [showPopup, setShowPopup] = useState(false);
  const [popup, setPopup] = useState('');

  const deleteAction = () => {
    deleteReviewFetch(id, setStatus);
    setShowPopup(false);
    forceUpdate();
  }

  useEffect(() => {
    setShowPopup(false);
  }, [])

  useEffect(() => {
    
    if (showPopup) {
      setPopup(
        <div className="delete-button-popup">
        Are you sure you wish to delete?
          &nbsp;
          <a href="#" onClick={deleteAction}>Yes</a>
          &nbsp;
          <a href="#" onClick={e => setShowPopup(false)}>No</a>
        </div>
      );
    } else {
      setPopup(
        <a href="#" className="delete-button-main" 
          onClick={e => setShowPopup(true)}
        >
          DELETE
        </a>
      );
    }
    
  }, [showPopup]);
  
  return (
    <React.Fragment>
      {popup}
    </React.Fragment>
  );
}