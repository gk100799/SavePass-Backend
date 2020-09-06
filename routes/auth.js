const router = require('express').Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

router.post('/register', async (req, res) => {

    const userExists = await User.findOne({ username: req.body.username })
    if (userExists) return res.status(400).send('Email already exists')


    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        username: req.body.username,
        password: hashPassword
    })

    try {
        const savedUser = await user.save();
        res.send({ user: user._id })
    } catch (err) {
        res.status(400).send(err)
    }
})

router.post('/login', async (req, res) => {
    const user = await User.findOne({ username: req.body.username })
    if (!user) return res.status(400).send('User doesn\'t exist')
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass) return res.status(400).send('Invalid Password')
    
    // const roken = jwt.sign()
    
    res.send('Logged in!!')
})

module.exports = router;