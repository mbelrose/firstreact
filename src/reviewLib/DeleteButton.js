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
        Are you sure you wish to delete?<br/>
          <div onClick={deleteAction}>Yes</div>
          <div onClick={e => setShowPopup(false)}>No</div>
        </div>
      );
    } else {
      setPopup(
        <span className="delete-button-main" 
          onClick={e => setShowPopup(true)}
        >
          DELETE
        </span>
      );
    }
    
  }, [showPopup]);
  
  return (
    <React.Fragment>
      {popup}
    </React.Fragment>
  );
}