exports.isAdmin = (req, res, next) => {
  const role = req.headers["x-user-role"];

  if (role !== "admin") {
    return res.status(403).json({
      message: "Akses hanya untuk admin"
    });
  }

  next();
};

exports.isUser = (req, res, next) => {
  const role = req.headers["x-user-role"];
  const userId = req.headers["x-user-id"];

  if (role !== "user" || !userId) {
    return res.status(403).json({
      message: "Akses hanya untuk user"
    });
  }

  req.userId = userId;
  next();
};
