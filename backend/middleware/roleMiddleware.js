exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (req.user.role === "ADMIN") return next();

    if (!roles.includes(req.user.role))
      return res.status(403).json({ message: "Forbidden" });

    next();
  };
};
