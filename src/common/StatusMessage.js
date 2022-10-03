// take a status flag and a useRef for the timeout 
// and show/hide a popup with a custom status message
// defaults to "IDLE" as blank
import React from 'react';

export default function StatusMessage({status, setStatus, statusClear}) {

    const STATUS_TIMEOUT = 3000;
    let message = '';

    switch (status.type) {
        case 'IDLE': message = ''; break;
        case 'LOADING': message = 'Loading...'; break;
        case 'SAVING': message = 'Saving...'; break;
        case 'ERROR': message = 'Error: ' + status.errorMessage; break;
        case 'SUCCESS': message = 'Saved.'; break;
        case 'DELETING': message = 'Deleting...'; break;
        case 'DELETED': message = 'Deleted.'; break;
        default: message =  '';
    }
    if (status.type === 'SUCCESS' ) {
        statusClear.current = setTimeout(() => {
            setStatus({ type: 'IDLE' });
        }, STATUS_TIMEOUT);
    }
    return (<div className="status-message">{message}</div>);
}