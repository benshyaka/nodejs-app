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
            // console.log(blogpost)
        const blog = new Blog(blogpost);
        try {
            await blog.save();
            res.status(201).redirect('/user/blogs/all')
                // render('allblogs', { status: "success", data: blog })
                // json({ status: "success", data: blog });
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
            res.render('allblogs', { status: "", user: req.user });
        } catch (error) {
            res.status(500).json({ status: "error", message: 'Unable to add the blog' })
        }
    } else {
        return res.status(401).json({ status: "fail", message: 'Unauthorized user! Please sign in' });
    }
})


router.get('/api/blogs/all', async(req, res) => {
    try {
        const blogs = await Blog.find({}).sort({ createdAt: -1 });
        res.status(200).json({ status: "success", data: blogs });
    } catch (error) {
        res.status(500).json({ status: "error", message: 'Unable to retrieve data from database' });
    }
})

router.get('/blogs/all', async(req, res) => {
    try {
        const blogs = await Blog.find({});
        res.render('allposts');
    } catch (error) {
        res.status(500).json({ status: "error", message: 'Unable to retrieve data from database' });
    }
})

router.get('/blogs/addblog', async(req, res) => {
    if (req.user) {
        try {
            res.render('addblog');
        } catch (error) {
            res.status(500).json({ status: "error", message: 'Unable to addtblog' })
        }
    } else {
        return res.status(401).json({ status: "fail", message: 'Unauthorized user! Please sign in' });
    }
})

router.get('/dashboard', async(req, res) => {
    if (req.user) {
        try {
            res.render('dashboard');
        } catch (error) {
            res.status(500).json({ status: "error", message: 'Unable to view dashboard' })
        }
    } else {
        return res.status(401).json({ status: "fail", message: 'Unauthorized user! Please sign in' });
    }
})


router.get('/auth/signin', async(req, res) => {
    try {
        res.render('login', { message: "" });
    } catch (error) {
        res.status(500).json({ status: "error", message: 'Unable to addtblog' })
    }
})

router.get('/blogs/single/:id', async(req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404);
        }
        res.status(200).render('blog', { status: "success", data: blog })
            // json({ status: "success", data: blog });
    } catch (error) {
        res.status(500).json({ status: "error", message: 'Unable to delete data from database, id is required' })
    }
})

// router.get('/blogs/single/:id', async(req, res) => {
//     try {

//         res.status(200).render('blog');
//     } catch (error) {
//         res.status(500).json({ status: "error", message: 'Unable to delete data from database, id is required' })
//     }
// })




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

router.get('/user/blogs/delete/:id', async(req, res) => {
    if (req.user) {
        try {
            const blog = await Blog.findByIdAndDelete(req.params.id);
            if (!blog) {
                return res.status(200).render('allblogs', { status: "Blog successful deleted", data: blog })
                    // redirect('/user/blogs/all');
            }
            res.status(200).render('allblogs', { status: "Blog successful deleted", data: blog });
        } catch (error) {
            res.status(500).json({ status: "error", message: 'Unable to delete data from database, id is required' })
        }
    } else {
        return res.status(401).json({ status: "fail", message: 'Unauthorized user! Please sign in' });
    }
})

router.get('/user/blogs/update/:id', async(req, res) => {
    if (req.user) {
        try {
            const blog = await Blog.findById(req.params.id);
            console.log(req.params.id)
            if (!blog) {
                return res.status(200).render('update', { status: "", data: blog })
                    // redirect('/user/blogs/all');
            }
            res.status(200).render('update', { status: "", data: blog });
        } catch (error) {
            res.status(500).json({ status: "error", message: 'Unable to retrive data from database to update, id is required' })
        }
    } else {
        return res.status(401).json({ status: "fail", message: 'Unauthorized user! Please sign in' });
    }
})

router.post('/user/blogs/update/:id', async(req, res) => {
    if (req.user) {
        try {
            const blogup = req.body
            const blogupdate = await Blog.findOneAndUpdate(req.params.id, blogup);
            if (!blogupdate) {
                return res.status(404).redirect('/user/blogs/all');
            }
            res.status(201).redirect('/user/blogs/all');
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

router.post('/auth/signin', (req, res) => {
    const userdata = User.findOne({
        email: req.body.email
    }, async(err, user) => {
        if (err) throw err;
        if (!user) {
            return res.status(401).render('login', { message: 'Authentication failed. Invalid email or password.' })
                // json({ message: 'Authentication failed. Invalid email or password.' });
        } else {
            const match = await bcrypt.compare(req.body.password, user.hash_password);
            if (match) {
                const token = jwt.sign({ status: "success", email: user.email, fullName: user.names, _id: user._id }, 'RESTFULAPIs')
                    // res.redirect('../dashboard')
                return res.cookie("access_token", token, {
                        httpOnly: true,
                    })
                    .status(200).render('dashboard')
                    // json({ token: jwt.sign({ status: "success", email: user.email, fullName: user.names, _id: user._id }, 'RESTFULAPIs') }).redirect('dashboard');
            } else {
                return res.status(401).render('login', { message: 'Authentication failed. Invalid email or password.' })
                    // json({ status: "fail", message: 'Authentication failed. Invalid email or password.' });
            }
        }
    });
})

router.get("/auth/logout", (req, res) => {
    return res
        .clearCookie("access_token")
        .status(200)
        .redirect('/auth/signin')
});




export default router;