const express = require('express');
const router = express.Router();
const Account = require('../models/Account')
const verify = require('./verifyToken');
const User = require('../models/User');

router.get('/', verify, async (req, res) => {
    try {
        const accounts = await Account.find();
        res.json(accounts)
    } catch (err) {
        res.json({ message: err })
    }
})

router.post('/add', verify, async (req, res) => {
    const account = new Account({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password
    });
    try {
        const savedAccount = await account.save()
        res.json(savedAccount)
    } catch (err) {
        res.json({ message: err })
    }
})

router.post('/delete', verify, async (req, res) => {
    try {
        await Account.findByIdAndDelete(req.body._id)
        res.json(user)
    } catch (err) {
        res.json({ message: err })
    }
})

router.post('/modify', verify, async (req, res) => {
    try {
        const _id = req.body._id
        delete req.body._id
        await Account.findByIdAndUpdate(_id, req.body)
        res.json(user)
    } catch (err) {
        res.json({ message: err })
    }
})


module.exports = router