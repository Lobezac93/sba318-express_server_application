import express from "express";
import path from "path";
import { fileURLToPath } from 'url'; // For ES Module __dirname equivalent
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

// Sample mock data
const mockUser = [
    { id: 1, username: "solomon", email: "solomonmayor@gmail.com" },
    { id: 2, username: "fabian", email: "fabianpatrick@gmail.com" },
    { id: 3, username: "mathias", email: "mathiasmanor@gmail.com" }
];

const app = express();

// Middleware: Parse JSON bodies
app.use(express.json());

// For static files (CSS, JS, images)
app.use(express.static(path.join(path.resolve(), 'public')));

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set the views engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Correct path to views folder

// Middleware: Logging
const loggingMiddleware = (req, res, next) => {
    console.log(`${req.method} - ${req.url}`);
    next();
};

// Middleware: Add timestamp to request
const timestampMiddleware = (req, res, next) => {
    req.timestamp = new Date().toISOString();
    next();
};

// Error-handling middleware
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: "Something went wrong!" });
};

// Use middlewares
app.use(loggingMiddleware);
app.use(timestampMiddleware);

// Use the route files
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

// View route (GET): Render users with a form for creating new users
app.get('/users-view', (req, res) => {
    res.render('users', { users: mockUser });
});

// Error-handling middleware (place at the bottom after all routes)
app.use(errorHandler);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
