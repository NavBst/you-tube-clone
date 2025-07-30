export const createError = (status, message) => {
    const error = new Error();
    error.status = status;
    error.message = message;
    return error;
};

export const handleError = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    
    res.status(status).json({
        success: false,
        status,
        message
    });
};
