import express from "express";
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
    if (req.user) {
        res.send(req.user);
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user! Please sign in' });
    }
});

export default router;