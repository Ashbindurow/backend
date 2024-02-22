import Jwt from "jsonwebtoken";

const checkToken = role => {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        return res.status(403).json({ message: "You are not authorized" });
      }

      const ogToken = token.split(" ")[1];
      //token number will be recieve on the 1st index position

      const isValid = Jwt.verify(ogToken, process.env.SECRET_KEY);

      //passing single role
      // if (role != isValid.role) {
      //   return res.status(403).json({ message: "You are not authorized" });
      // }

      // FOR MULTIPLE ROLES TYO ACCESS, passed the values inside an array
      if (!role.includes(isValid.role)) {
        return res.status(403).json({ message: "You are not authorized" });
      }
      next();
    } catch (e) {
      return res.status(403).json({ message: "You are not authorized" });
    }
  };
};

export default checkToken;
