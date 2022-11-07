import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  //console.log("middleware Condition write here");

  const bearerHeader = req.headers["authorization"];
  if (bearerHeader) {
    //console.log("bearerHeader", bearerHeader);
    const token = bearerHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
      if (err) {
        res.status(500).json("You are not authnticated");
      }
      if (decoded) {
        //console.log("decoded", decoded);
        req.user = decoded;
        next();
      }
    });
  } else {
    // Forbidden
    res.status(403).json("Token isnot defined");
  }
};
