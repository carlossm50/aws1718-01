'use strict';

var express = require("express");
var bodyParser = require("body-parser");
var path = require('path');
var projects = require("./projects.js");

var port = (process.env.PORT || 16778);
var baseAPI = "/api/v1";

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

 
app.get(baseAPI + "/projects", (request, response) => {
    console.log("GET /projects"); 
    
    projects.allProjects((err,projects)=>{
        response.send(projects);    
    });
});

app.post(baseAPI + "/projects", (request, response) => {
    console.log("POST /projects");
    var newproject = request.body;
     var name = request.body.referencia;
     
    projects.get(name,(err,project)=>{
            if (project.length != 0) {
                response.sendStatus(409);
            }
            else {
                projects.add(newproject);
                response.sendStatus(201)
            }
        
 
    });
    
});

app.post(baseAPI  + "/projects/:referencia", (request, response) => {
    console.log("POS /projects");
    response.sendStatus(405);    
});

app.delete(baseAPI + "/projects", (request, response) => {
    console.log("DELETE /projects");

    projects.removeAll((err,numRemoved)=>{
        console.log("projects removed:"+numRemoved);
        response.sendStatus(200);    
    });

});

app.get(baseAPI + "/projects/:referencia", (request, response) => {
    console.log("GET /projects/"+request.params.referencia);
    var name = request.params.referencia;

    projects.get(name,(err,projects)=>{
        if (projects.length === 0) {
            response.sendStatus(404);
        }
        else {
            response.send(projects); 
        }
    });
});


app.delete(baseAPI + "/projects/:referencia", (request, response) => {
    var name = request.params.referencia;

    projects.remove(name,(err,numRemoved)=>{
        console.log("projects removed:"+numRemoved);
        if(numRemoved != 0)
        response.sendStatus(200)
        else
          response.sendStatus(404)
    });

    console.log("DELETE /projects/" + name);
});


app.put(baseAPI + "/projects/:referencia", (request, response) => {
    var name = request.params.referencia;
    var updatedProject = request.body;

    projects.update(name, updatedProject ,(err,numUpdates) => {
        console.log("projects updated:"+numUpdates);
        if (numUpdates === 0) {
            response.sendStatus(404);    
        } else {
            response.sendStatus(200);    
        }
        
    });

    console.log("UPDATE /projects/"+name);
});

app.put(baseAPI  + "/projects", (request, response) => {
    console.log("PUT /projects");
    response.sendStatus(405);    
});

app.listen(port, () => {
    console.log("Server with GUI up and running!!");
});