const jwt = require("jsonwebtoken");

const middleWareControllers = {
  //Verify Token
  verifyToken: (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, "12022002", (err, member) => {
        if (err) {
          return res.status(403).json("Token is not valid!");
        }
        req.member = member;
        next();
      });
    } else {
      return res.status(401).json("You are not authenticated!");
    }
  },

  //Verify Admin
  verifyAdmin: (req, res, next) => {
    middleWareControllers.verifyToken(req, res, () => {
      if (req.member.id == req.params.id || req.member.admin) {
        next();
        return;
      } else {
        return res.status(401).json("You are not authorized!");
      }
    });
  },
  //Verify Member
  verifyMember: (req, res, next) => {
    middleWareControllers.verifyToken(req, res, () => {
      if (req.member.id == req.params.id || req.member.admin != true) {
        next();
        return;
      } else {
        return res.status(401).json("You are not authorized!");
      }
    });
  },
};

module.exports = middleWareControllers;
