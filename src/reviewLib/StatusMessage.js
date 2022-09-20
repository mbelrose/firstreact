// take a status flag and a useRef for the timeout 
// and show/hide a popup with a custom status message
// defaults to "IDLE" as blank
import React from 'react';

export default function StatusMessage({status, setStatus, statusClear}) {

    const STATUS_TIMEOUT = 3000;
    let message = '';

    switch (status) {
        case 'IDLE': message = ''; break;
        case 'SAVING': message = 'Saving...'; break;
        case 'ERROR': message = 'Error.'; break;
        case 'SUCCESS': message = 'Saved.'; break;
        default: message =  '';
    }
    if (message !== '') {
        statusClear.current = setTimeout(() => {
            setStatus('');
        }, STATUS_TIMEOUT);
    }
    return (<div>{message}</div>);
}