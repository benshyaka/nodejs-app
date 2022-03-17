import express from "express";
const router = express.Router();
import "../db/db.mjs"
import Blog from "../models/blog.js";
impo
/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' });
});

router.post('/blogs', async(req, res) => {
    const blogpost = req.body
    console.log(blogpost)
    const blog = new Blog(blogpost);
    try {
        await blog.save();
        res.status(201).send(blog);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.get('/blogs', async(req, res) => {
    try {
        const blogs = await Blog.find({});
        console.log(blogs)
        res.status(200).send(blogs);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.get('/blogs/:id', async(req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404);
        }
        res.status(200).send(blog);
    } catch (error) {
        res.status(500).send(error);
    }
})


router.delete('/blogs/:id', async(req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) {
            return res.status(404).send();
        }
        res.send(blog);
    } catch (error) {
        res.status(500).send(error);
    }
})

export default router;