const ControllerError = (req, res, err) => {
    res.status(500).json({"error": err.message});
}

module.exports = ControllerError;