
import express from "express";

const router = express.Router();

let posts = [
    { id: 1, userId: 1, title: "First Post", content: "This is the first post." },
    { id: 2, userId: 2, title: "Second Post", content: "This is the second post." }
];

// GET all posts
router.get("/", (req, res) => {
    res.send(posts);
});

// POST (create) new post
router.post("/", (req, res) => {
    const { body } = req;
    const newPost = { id: posts.length + 1, ...body };
    posts.push(newPost);
    res.status(201).send(newPost);
});

// PATCH (update partially) post by ID
router.patch("/:id", (req, res) => {
    const { id } = req.params;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return res.sendStatus(400);

    const findPostIndex = posts.findIndex((post) => post.id === parsedId);
    if (findPostIndex === -1) return res.sendStatus(404);

    posts[findPostIndex] = { ...posts[findPostIndex], ...req.body };
    res.send(posts[findPostIndex]);
});

// DELETE post by ID
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return res.sendStatus(400);

    const findPostIndex = posts.findIndex((post) => post.id === parsedId);
    if (findPostIndex === -1) return res.sendStatus(404);

    posts.splice(findPostIndex, 1);
    res.sendStatus(200);
});

export default router;
