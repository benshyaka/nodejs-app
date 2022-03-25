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

router.post('/blogs/add', async(req, res) => {
    if (req.user) {
        const blogpost = req.body
        console.log(blogpost)
        const blog = new Blog(blogpost);
        try {
            await blog.save();
            res.status(201).redirect("/user/blogs/all");
            // .json({ status: "success", data: blog });
        } catch (error) {
            res.status(500).json({ status: "failed", data: blog });
        }
    } else {
        return res.status(401).json({ status: "error", message: 'Unauthorized user! Please sign in to add new blog' });
    }

})


router.get('/user/blogs/all', async(req, res) => {
    if (req.user) {

        try {
            const blogs = await Blog.find({});
            res.render('allblogs', {
                title: 'User Blogs SHYAKA | all blogs',
                user: req.user,
                status: "success",
                data: blogs
            })
        } catch (error) {
            res.status(500).json({ status: "failed", data: blog });
        }
    } else {
        return res.status(401).json({ status: "error", message: 'Unauthorized user! Please sign in to add new blog' });
    }

})

router.get('/blogs/all', async(req, res) => {
    try {
        const blogs = await Blog.find({});
        // res.status(200).json({ status: "success", data: blog });
        res.render('allposts', {
            title: 'Blogs SHYAKA | all blogs',
            user: req.user,
            status: "success",
            data: blogs
        })
    } catch (error) {
        res.status(500).json({ status: "error", message: 'Unable to retrieve data from database' });
    }
})

router.get('/user/blogs/update/:id', async(req, res) => {
    if (req.user) {
        try {
            const blog = await Blog.findById(req.params.id);
            res.render('blogupdate', {
                title: 'update a Blogs SHYAKA | all blogs',
                user: req.user,
                status: "success",
                data: blog
            })
        } catch (error) {
            res.status(500).json({ status: "failed", data: blog });
        }
    } else {
        return res.status(401).json({ status: "error", message: 'Unauthorized user! Please sign in to add new blog' });
    }
})

router.get('/blogs/single/:id', async(req, res) => {
    try {
        const sblog = await Blog.findById(req.params.id);
        // console.log(sblog)
        if (!sblog) {
            return res.status(404);
        }
        // res.status(200).json({ status: "success", data: blog });
        res.render('blog', {
            title: 'Blog SHYAKA | single blog',
            user: req.user,
            status: "success",
            data: sblog
        })
    } catch (error) {
        res.status(500).json({ status: "error", message: 'Unable to retrieve data from database, id is required' })
    }
})
router.delete('/blogs/:id', async(req, res) => {
    if (req.user) {
        try {
            const blog = await Blog.findByIdAndDelete(req.params.id);
            if (!blog) {
                return res.status(200).json({ status: "success", data: blog });
            }
            res.status(200).json({ status: "success", data: blog });
        } catch (error) {
            res.status(500).json({ status: "error", message: 'Unable to delete data from database, id is required' })
        }
    } else {
        return res.status(401).json({ status: "fail", message: 'Unauthorized user! Please sign in' });
    }

})

router.put('/blogs/update/:id', async(req, res) => {
    if (req.user) {
        try {
            const blogup = req.body
            const blogupdate = await Blog.findOneAndUpdate(req.params.id, blogup);
            if (!blogupdate) {
                return res.status(404).json({ status: "fail", message: 'Unable to update data to the database, id is required' });
            }
            res.status(201).json({ status: "success", data: blog });
        } catch (error) {
            res.status(500).json({ status: "fail", message: 'Unable to update data to the database' });
        }
    } else {
        return res.status(401).json({ status: "fail", message: 'Unauthorized user! Please sign in' });
    }

})

router.post('/auth/register', async(req, res) => {
    var newUser = new User(req.body);
    newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
    newUser.save(function(err, user) {
        if (err) {
            return res.status(400).json({ status: "fail", message: err });
        } else if (user) {
            user.hash_password = undefined;
            return res.status(201).json({ status: "success", data: user });
        }
    });
})


router.get('/auth/signin', function(req, res, next) {
    if (req.user) {
        res.redirect('/')
    } else {
        res.render('login', {
            title: 'Blog SHYAKA | Login',
            user: req.user,
        })
    }
});

router.get('/user/dashboard', function(req, res, next) {
    if (req.user) {
        res.render('dashboard', {
            title: 'Blog SHYAKA | single blog',
            user: req.user,
            status: "success",
        })
    } else {
        res.redirect("../auth/signin")
    }
});


router.get('/user/addblog', function(req, res, next) {
    if (req.user) {
        res.render('addblog', {
            title: 'Blog SHYAKA | single blog',
            user: req.user,
            status: "success",
        })
    } else {
        res.redirect("../auth/signin")
    }
});

router.post('/auth/signin', (req, res) => {
    console.log(req.body)
    const userdata = User.findOne({
        email: req.body.email
    }, async(err, user) => {
        if (err) throw err;
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed. Invalid email or password.' });
        } else {
            const match = await bcrypt.compare(req.body.password, user.hash_password);
            if (match) {
                const token = jwt.sign({ email: user.email, fullName: user.names, _id: user._id }, 'RESTFULAPIs')
                return res.cookie("access_token", token, {
                        httpOnly: true,
                    })
                    .status(200)
                    .redirect('/user/dashboard');
            } else {
                return res.status(401).json({ status: "fail", message: 'Authentication failed. Invalid email or password.' });
            }
        }
    });
});

router.get("/auth/logout", (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.sendStatus(403);
    }
    try {
        const data = jwt.verify(token, "RESTFULAPIs");
        req.userId = data.id;
        req.userRole = data.role;
        return next();
    } catch {
        return res.sendStatus(403);
    }
}, (req, res) => {
    return res
        .clearCookie("access_token")
        .status(200)
        .redirect('/auth/signin');
});




export default router;