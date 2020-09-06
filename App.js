const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
var cors = require('cors');

const port = process.env.PORT || 4000
const app = express();

app.use(bodyParser.json());
app.use(cors())

const accountRoute = require('./routes/accounts')
const authRoute = require('./routes/auth')

app.use('/account', accountRoute);
app.use('/user', authRoute);

app.get('cron-job',(req,res) => {
    res.send("This is an api for Cron-Job")
})


mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@mandidb-sdbcm.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => console.log("Server running at port 4000"));
  })
  .catch(err => {
    console.log(err);
  });