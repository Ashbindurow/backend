import Jwt from "jsonwebtoken";

const checkToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(403).json({ message: "You are not authorized" });
    }

    const ogToken = token.split(" ")[1];
    //token number will be recieve on the 1st index position

    const isValid = Jwt.verify(ogToken, process.env.USER_SECRET_KEY);
    next();
  } catch (e) {
    return res.status(403).json({ message: "You are not authorized" });
  }
};

export default checkToken;
