import express from "express";

const router = express.Router();

let comments = [
    { id: 1, postId: 1, content: "Great post!" },
    { id: 2, postId: 2, content: "Interesting read." }
];

// GET all comments
router.get("/", (req, res) => {
    res.send(comments);
});

// POST (create) new comment
router.post("/", (req, res) => {
    const { body } = req;
    const newComment = { id: comments.length + 1, ...body };
    comments.push(newComment);
    res.status(201).send(newComment);
});

// DELETE comment by ID
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return res.sendStatus(400);

    const findCommentIndex = comments.findIndex((comment) => comment.id === parsedId);
    if (findCommentIndex === -1) return res.sendStatus(404);

    comments.splice(findCommentIndex, 1);
    res.sendStatus(200);
});

export default router;
