import express from "express";

const router = express.Router();

let users = [
    { id: 1, username: "solomon", email: "solomonmayor@gmail.com" },
    { id: 2, username: "fabian", email: "fabianpatrick@gmail.com" },
    { id: 3, username: "mathias", email: "mathiasmanor@gmail.com" }
];

// GET all users
router.get("/", (req, res) => {
    res.send(users);
});

// POST (create) new user
router.post("/", (req, res) => {
    const { body } = req;
    const newUser = { id: users.length + 1, ...body };
    users.push(newUser);
    res.status(201).send(newUser);
});

// PUT (update) user by ID
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return res.sendStatus(400);

    const findUserIndex = users.findIndex((user) => user.id === parsedId);
    if (findUserIndex === -1) return res.sendStatus(404);

    users[findUserIndex] = { id: parsedId, ...req.body };
    res.send(users[findUserIndex]);
});

// DELETE user by ID
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return res.sendStatus(400);

    const findUserIndex = users.findIndex((user) => user.id === parsedId);
    if (findUserIndex === -1) return res.sendStatus(404);

    users.splice(findUserIndex, 1);
    res.sendStatus(200);
});

export default router;
