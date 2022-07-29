require("dotenv").config();
const jwt = require("jsonwebtoken");

const corsAuth = {
  origin: `${process.env.CLIENT_URL}`,
  methods: "GET,PUT,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

const corsSocketAuth = {
  origin: `${process.env.CLIENT_URL}`,
  methods: ["GET", "POST"],
};

const tokenAuth = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  const token = authHeader.split(" ")[1];
  if (!token || token === "") {
    req.isAuth = false;
    return next();
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "somesupersecreatekey");
  } catch (e) {
    req.isAuth = false;
    return next();
  }
  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }
  req.isAuth = true;
  req.userId = decodedToken.userId;
  next();
};

exports.corsAuth = corsAuth;
exports.corsSocketAuth = corsSocketAuth;
exports.istokenAuth = tokenAuth;
