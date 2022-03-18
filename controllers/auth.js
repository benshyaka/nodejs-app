import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
// User = mongoose.model('User');

const register = (req, res) => {
    console.log(req.body)
    var newUser = new User(req.body);
    newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
    newUser.save(function(err, user) {
        if (err) {
            return res.status(400).send({
                message: err
            });
        } else {
            user.hash_password = undefined;
            return res.json(user);
        }
    });
};

const sign_in = (req, res) => {
    User.findOne({
        email: req.body.email
    }, function(err, user) {
        if (err) throw err;
        if (!user || !user.comparePassword(req.body.password)) {
            return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
        }
        return res.json({ token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id }, 'RESTFULAPIs') });
    });
};

const loginRequired = (req, res, next) => {
    if (req.user) {
        next();
    } else {

        return res.status(401).json({ message: 'Unauthorized user!!' });
    }
};

export default register