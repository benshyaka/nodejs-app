import express from "express";
const router = express.Router();
import "../db/db.js"
import Blog from "../models/Blog.js";
import register from "../controllers/auth.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import User from "../models/user.js";

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' });
});

router.post('/blogs', async(req, res) => {
    if (req.user) {
        const blogpost = req.body
            // console.log(blogpost)
        const blog = new Blog(blogpost);
        try {
            await blog.save();
            res.status(201).send(blog);
        } catch (error) {
            res.status(500).send(error);
        }
    } else {
        return res.status(401).json({ message: 'Unauthorized user! Please sign in to add new blog' });
    }

})

router.get('/blogs/all', async(req, res) => {
    try {
        const blogs = await Blog.find({});
        console.log(blogs)
        res.status(200).send(blogs);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.get('/blogs/single/:id', async(req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404);
        }
        res.status(200).send(blog);
    } catch (error) {
        res.status(500).send("Bolg with that id can not be found");
    }
})


router.delete('/blogs/:id', async(req, res) => {
    if (req.user) {
        try {
            const blog = await Blog.findByIdAndDelete(req.params.id);
            if (!blog) {
                return res.status(404).send("Bolg with that id can not be found");
            }
            res.send("this blog is deleted" + blog);
        } catch (error) {
            res.status(500).send("Bolg with that id can not be found");
        }
    } else {
        return res.status(401).json({ message: 'Unauthorized user! Please sign in' });
    }

})

router.post('/blogs/update/:id', async(req, res) => {
    if (req.user) {
        try {
            const blogup = req.body
            const blogupdate = await Blog.findOneAndUpdate(req.params.id, blogup);
            if (!blogupdate) {
                return "error could not update blog" + res.status(404);
            }
            res.send("Blog is updated: " + blogupdate);
        } catch (error) {
            res.status(500).send(error);
        }
    } else {
        return res.status(401).json({ message: 'Unauthorized user! Please sign in' });
    }

})

router.post('/auth/register', async(req, res) => {
    console.log(req.body)
    var newUser = new User(req.body);
    newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
    newUser.save(function(err, user) {
        if (err) {
            return res.status(400).send({
                message: "Can't add new user " + err
            });
        } else {
            user.hash_password = undefined;
            return res.json(user);
        }
    });
})

router.post('/auth/signin', (req, res) => {
    const userdata = User.findOne({
        email: req.body.email
    }, async(err, user) => {
        console.log(req.body.password, user)

        if (err) throw err;
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed. Invalid email or password.' });
        } else {
            const match = await bcrypt.compare(req.body.password, user.hash_password);
            if (match) {
                return res.json({ token: jwt.sign({ email: user.email, fullName: user.names, _id: user._id }, 'RESTFULAPIs') });
            } else {
                return res.status(401).json({ message: 'Authentication failed. Invalid email or password.' });
            }
        }
    });
})




export default router;