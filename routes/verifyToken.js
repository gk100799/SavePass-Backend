const jwt = require('jsonwebtoken')

module.exports = function (req,res,next) {
    const token = req.header('auth-token')
    // console.log(token)
    if(!token) return res.status(401).send({message:'Access Denied'})

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        // console.log(verified)
        next()
    } catch(err) {
        res.status(401).send({message:'Invalid Token'})
    }
}