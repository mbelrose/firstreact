function ControllerError (req, res, err) {
    res.status(500).json({"_errorMessage": err.message});
}

module.exports = ControllerError;