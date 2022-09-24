export default function deleteReviewFetch ( id , setStatus) {

    setStatus({ type: 'SAVING' });
    fetch(
        '/controller/reviews/' + id, {
            method: 'DELETE',
            headers: {'Content-Type' : 'application/json'}
        })
    .then( (res) => {
        if (res.ok) {
            setStatus({ type: 'DELETED' });
        } else {
            res.json().then( (msg) => {
                setStatus({ type: 'ERROR', errorMessage: msg._errorMessage });
            }).catch( (err) => {
                setStatus({ type: 'ERROR', errorMessage: 'No response.' });
            });
        }
        return res;
    }).catch((err) => {
        setStatus({ type: 'ERROR', errorMessage: err.message });
     });

}
