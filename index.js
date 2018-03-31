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
    
    projects.allContacts((err,contacts)=>{
        response.send(contacts);    
    });
});

app.post(baseAPI + "/projects", (request, response) => {
    console.log("POST /projects");
    var contact = request.body;
     var name = request.body.projname;
     
    projects.get(name,(err,contacts)=>{
        if (contacts.length != 0) {
            response.sendStatus(409);
        }
        else {
            projects.add(contact);
            response.sendStatus(201)
        }
    });
    
});

app.post(baseAPI  + "/projects/:projname", (request, response) => {
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

app.get(baseAPI + "/projects/:projname", (request, response) => {
    console.log("GET /projects/"+request.params.projname);
    var name = request.params.projname;

    projects.get(name,(err,contacts)=>{
        if (contacts.length === 0) {
            response.sendStatus(404);
        }
        else {
            response.send(contacts); 
        }
    });
});


app.delete(baseAPI + "/projects/:projname", (request, response) => {
    var name = request.params.projname;

    projects.remove(name,(err,numRemoved)=>{
        console.log("projects removed:"+numRemoved);
        if(numRemoved != 0)
        response.sendStatus(200)
        else
          response.sendStatus(404)
    });

    console.log("DELETE /projects/" + name);
});


app.put(baseAPI + "/projects/:projname", (request, response) => {
    var name = request.params.projname;
    var updatedContact = request.body;

    projects.update(name, updatedContact ,(err,numUpdates) => {
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