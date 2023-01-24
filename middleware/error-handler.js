const handleErrorMiddleware = (err, req, res, next) => {
  const defaultError = {
    status: err.statusCode || 500,
    msg: err.message || "Der skete en fejl, prøv igen.",
  };

  if (err.name === "ValidationError") {
    (defaultError.status = 400),
      (defaultError.msg = Object.values(err.errors)
        .map((item) => item.message)
        .join(","));
  }

  // Handle for unique values
  if (err.code && err.code === 11000) {
    (defaultError.status = 400),
      (defaultError.msg = `${Object.keys(err.keyValue)} skal være unik.`);
  }

  res.status(defaultError.status).json({ msg: defaultError.msg });
};

export default handleErrorMiddleware;
