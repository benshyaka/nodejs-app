const mongoose = require('mongoose')

const url = `mongodb+srv://benjamin:benjamin@cluster0.ywrfg.mongodb.net/nodejs?retryWrites=true&w=majority`;

const dbcon = mongoose.connect(url)
    .then(() => {
        console.log('Connected to database ')
    })
    .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

module.exports = dbcon;