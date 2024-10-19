/*
*   Express App Setup
*/
// Import necessary modules
const express = require("express");
const path = require('path');
const app = express();
const data = require("./data.json");

// Set view engine to Pug and serve static files from the 'public' directory
app.set("view engine", "pug");
app.use('/static', express.static(path.join(__dirname, 'public')));

/*
*   Route Handlers
*/
// Homepage route
app.get("/", (req, res) => {
    res.render("index", { projects: data.projects });
});

// About page route
app.get("/about", (req, res) => {
    res.render("about");
});

// Route for displaying project details based on project ID
app.get('/projects/:id', (req, res, next) => {
    const projectId = req.params.id;
    const project = data.projects.find(p => p.id == projectId);

    if (project) {
        res.render('project', { project });
    } else {
        const err = new Error('Project not found');
        err.status = 404;
        next(err);
    }
});

/*
*   Error Handlers
*/
// 404 error handler for undefined routes
app.use((req, res, next) => {
    const err = new Error('Sorry, this page is not found');
    err.status = 404;
    next(err);
});

// Global error handler for all errors
app.use((err, req, res, next) => {
    const status = err.status || 500;
    console.error(`Error Status: ${status}`);
    console.error(`Error Message: ${err.message}`);
    
    res.status(status);
    
    // Show a custom error message based on the status
    const errorMessage = status === 404
        ? "Oops! Unfortunately, we are unable to locate this page!"
        : "Something went wrong on our end!";

    res.render('error', {
        message: errorMessage,
        error: status === 500 ? err.message : {} // only show error message if 500
    });
});

/*
*   Start the server
*/
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
