/*
*   Setup for the Express app
*/
// Imports necessary modules
const express = require("express");
const path = require('path');
const app = express();
const  data  = require("./data.json");
// view engine to Pug and Serves static files from the public directory
app.set("view engine", "pug");
app.use('/static',express.static(path.join(__dirname,'public')));
/*
*   Route Handlers
*/
// Route for the homepage
app.get("/", (req, res) => {
    res.render("index", { projects: data.projects }); 
  });
// Route for the about page
app.get("/about", (req,res) => {
 res.render('about');
});
// Route for displaying project details
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
// 404 Handler
app.use((req, res, next) => {
    const err = new Error('Sorry this Page is Not Found');
    err.status = 404;
    next(err);
  });
  // Global Error Handler
  app.use((err, req, res, next) => {

    console.log(`Error Status: ${err.status || 500}`);
  console.log(`Error Message: ${err.message}`);
    res.status(err.status|| 500);
    res.render('page not found',{
     message: "Oops Unfortunately We are unable to locate this page!!!",
     error: {}
    });
  });
/*
*   Starting the server
*/
app.listen(3000,() => {
    console.log("Port:3000 Running");
});