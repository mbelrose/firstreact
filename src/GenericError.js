const GenericError = (err) => {
    return( {
        "_errorMessage": err.message
    });
}

export default GenericError;