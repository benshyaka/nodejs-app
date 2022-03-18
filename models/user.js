import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;


const users = new Schema({
    names: String,
    email: String,
    hash_password: String,
    createdAt: Date
});

users.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.hash_password);
};

export default mongoose.model('users', users)