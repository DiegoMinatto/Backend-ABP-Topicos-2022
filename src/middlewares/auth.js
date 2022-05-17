const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader)
        return res.status(401).send({unauth: true, error: 'No token'})

    const parts = authHeader.split(' ');

    if(!parts.lenght === 2)
        return res.status(401).send({unauth: true, error: 'Token error'})

    const [scheme, token] = parts;

    if(!/^Bearer$/i.test(scheme))
        return res.status(401).send({unauth: true, error: 'Token malformatted'});

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if(err) return res.status(401).send({unauth: true, error: 'Token invalid'});


        req.id = decoded.id;   
        
        return next();
    });
}