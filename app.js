const express = require("express");
const app = express();
const { data } = require("../data.json");

app.set("view engine", "pug");
app.use('/static',express.static('public'));

app.get("/", (req,res) => {
  res.render("index");
});

app.get("/about", (req,res) => {
 res.render('about');
});

app.get('/projects/:id', (req, res) => {
    const projectId = req.params.id;
    const project = projects[projectId];
  
    if (project) {
      res.render('project', { project });
    } else {
      res.status(404).send('Project not found');
    }
  });

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
  });
  
  app.use((err, req, res, next) => {

    err.status = err.status || 500;
    err.message = err.message || 'Internal Server Error';
    console.error(`Status: ${err.status}, Message: ${err.message}`);
    
    res.status(err.status).json({
      error: {
        status: err.status,
        message: err.message
      }
    });
  });

app.listen(3000,() => {
    console.log("Port:3000 Running");
});