const jwt = require('jsonwebtoken');
const User = require('sequelize');

module.exports = function (req, res, next) {
    if (req.method == 'OPTIONS') {
        next();   // allowing options as a method for request
    } else {
        const sessionToken = req.headers.authorization;
        console.log('sessionToken', sessionToken);
        if (!sessionToken) return res.status(403).send({ auth: false, message: "No token provided." });
        else {
            jwt.verify(sessionToken, process.env.SECRET_TOKEN, (err, decoded) => {
                if (decoded) {
                    User.findOne({ where: { id: decoded.id } }).then(user => {
                        req.user = user;
                        console.log(`user: ${user}`)
                        next()
                    },
                        function () {
                            res.status(401).send({ error: "not authorized" });
                        })

                } else {
                    res.status(400).send({ error: "not authorized" })
                }
            });
        }
    }
}