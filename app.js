const express = require("express");
const path = require('path');
const app = express();
const  data  = require("./data.json");

app.set("view engine", "pug");
app.use('/static',express.static(path.join(__dirname,'public')));

app.get("/", (req, res) => {
    res.render("index", { projects: data.projects }); 
  });

app.get("/about", (req,res) => {
 res.render('about');
});

app.get('/projects/:id', (req, res) => {
    const projectId = req.params.id;
    const project = data.projects.find(p => p.id == projectId);
  
    if (project) {
      res.render('project', { project });
    } else {
      res.status(404).send('Project not found');
    }
  });

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  app.use((err, req, res, next) => {
    res.status(err.status|| 500);
    res.render('error',{
     message: err.message,
     error: {}
    });
  });

app.listen(3000,() => {
    console.log("Port:3000 Running");
});