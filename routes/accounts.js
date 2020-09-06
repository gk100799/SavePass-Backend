const express = require('express');
const router = express.Router();
const Account = require('../models/Account')

router.get('/', async (req,res) => {
    try {
        const accounts = await Account.find();
        res.json(accounts)
    } catch(err) {
        res.json({message: err})
    }
})

router.post('/add', async (req, res) => {
    const account = new Account({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password
    });
    try {
    const savedAccount = await account.save()
    res.json(savedAccount)
    } catch(err) {
        res.json({message: err})
    }
})


module.exports = router