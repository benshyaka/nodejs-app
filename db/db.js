import mongoose from "mongoose"

const url = process.env.MONGODB_URI;

const dbcon = new mongoose.connect(url)
    .then(() => {
        console.log('Connected to database')
    })
    .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

export default dbcon;