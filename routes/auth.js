const router = require('express').Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const verify = require('./verifyToken')

router.post('/register', async (req, res) => {

    const userExists = await User.findOne({ username: req.body.username })
    if (userExists) return res.status(400).send('Email already exists')


    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name: req.body.name,
        username: req.body.username,
        password: hashPassword
    })

    try {
        const savedUser = await user.save();
        res.send({ user: user._id, name: user.name })
    } catch (err) {
        res.status(400).send({ message: err })
    }
})

router.post('/login', async (req, res) => {
    // console.log(req.body)
    const user = await User.findOne({ username: req.body.username })
    if (!user) return res.status(400).send({ message: 'User doesn\'t exist' })

    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) return res.status(400).send({ message: 'Invalid Password' })

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '1h' })

    res.header('auth-token', token).send({ name: user.name, token: token, tokenExpiration: 1 })
    // res.send('Logged in!!')
})

router.get('/login/currentUser', verify, async (req, res) => {
    res.send({user: req.user})
})

module.exports = router;