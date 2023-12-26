const errorHandler = (error, req, res, next) => {
    const statuscode = res.statuscode ? res.statuscode : 500;

    res.status(statuscode);

    res.json({
        message : error.message,
        stack : process.env.NODE_ENV === 'production' ? null : error.stack
    })
}

module.exports={
    errorHandler
}