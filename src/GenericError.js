const GenericError = (err) => {
    return( JSON.parse({
        "error": err.message
    }));
}

export default GenericError;