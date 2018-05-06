'use strict';
var MongoClient = require('mongodb').MongoClient;
var db;

var Projects = function () {};

Projects.prototype.connectDb = function(callback) {
    MongoClient.connect(process.env.MONGODB_URL, function(err, database) {
        if(err) {
            callback(err);
        }
        
        db = database.db('aws').collection('projects');
        
        callback(err, db);
    });
};


Projects.prototype.allProjects = function(callback) {
    return db.find({}).toArray(callback);
};

Projects.prototype.add = function(project, callback) {
    return db.insert(project, callback);
};

Projects.prototype.removeAll = function(callback) {
    return db.remove({},{ multi: true},callback);
};

Projects.prototype.get = function(name, callback) {
    return db.find({referencia:name}).toArray(callback);
};

Projects.prototype.remove = function(name, callback) {
    return db.remove({referencia:name},{ multi: true}, callback);
};

Projects.prototype.update = function(name, updatedProject, callback) {
    return db.update({referencia:name},updatedProject,{}, callback);
};

module.exports = new Projects();