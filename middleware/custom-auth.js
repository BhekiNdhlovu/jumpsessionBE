const { sign, verify } = require('jsonwebtoken')

const createTokens = (user) => {
    const accessToken = sign({ username: user.username }, process.env.JWT_SECRET, {
        expiresIn: 60*30*1000
    })
    return accessToken
}

const validateToken = (req, res, next) => {
    const accessToken = req.cookies['access-token']
    if(!accessToken) return res.status(400).json({error: 'user not authenticated'})

    try {
        const validToken = verify(accessToken, process.env.JWT_SECRET)
        if(validToken) {
            req.authenticated = true
            return next()
        }
    } catch (error) {
        return res.status(400).json({error: error})
    }
}

const destroyToken = (req, res, next) => {
    const accessToken = req.cookies['access-token']
    if(!accessToken) {
        return res.json('user already logged out')
    }
    
    try {
        res.clearCookie('access-token')
        return next()
    } catch (error) {
        return res.status(400).json({error: error})
    }
}

module.exports = { createTokens, validateToken, destroyToken }