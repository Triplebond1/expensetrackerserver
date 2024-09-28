

//@desc GET Health check
//@route GET /health
//@access public

const healthCheckHandler =  (req, res) => {
    res.status(201).json({status: 'user created successfully'});
};

module.exports = {
    healthCheckHandler,
}