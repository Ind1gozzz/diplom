const jwt = require('jsonwebtoken');

module.exports = function(role)
{
    return function (req, res, next)
    {
        if (req.method === "OPTIONS")
        {
            next();
        }
        try
        {
            const token = req.headrs.authorization.split(' ')[1];
            if (!token)
            {
                return res.status(401).json({message: "Не авторизован"});
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            if (jwt.decode.role !== role)
            {
                return res.status(403).json({message: "Access denied"});
            }
            req.user = decoded;
            next();
        } catch (e)
        {
            res.status(401).json({message: "Не авторизован"});
        }
    };
}


