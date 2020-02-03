const jwt = require('jsonwebtoken')
const User = require('../model/Hr')

const auth = async (req, res, next) => {
    const bearer = req.headers.authorization
    console.log(bearer)
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = await jwt.verify(token, 'secretKey')
        
        
        console.log(decoded)
        console.log(token)
    
        const user = await User.findOne({ email:decoded.email, 'tokens.token': token })
        console.log(user)

        if (!user) {
            throw new Error()
        }

        
        console.log('from auth')
        
        req.user = user
        
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth