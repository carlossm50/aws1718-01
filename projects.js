'use strict';

var path = require('path');
var DataStore = require('nedb');
var dbFileName = path.join(__dirname, 'projects.json');

var db = new DataStore({
    filename : dbFileName,
    autoload : true
});


var Projects = function () {};

Projects.prototype.allProjects = function(callback) {
    return db.find({}, callback);
};

Projects.prototype.add = function(project, callback) {
    return db.insert(project, callback);
};

Projects.prototype.removeAll = function(callback) {
    return db.remove({},{ multi: true},callback);
};

Projects.prototype.get = function(name, callback) {
    return db.find({referencia:name}, callback);
};

Projects.prototype.remove = function(name, callback) {
    return db.remove({referencia:name},{ multi: true}, callback);
};

Projects.prototype.update = function(name, updatedProject, callback) {
    return db.update({referencia:name},updatedProject,{}, callback);
};

module.exports = new Projects();