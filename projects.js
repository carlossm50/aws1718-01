'use strict';

var path = require('path');
var DataStore = require('nedb');
var dbFileName = path.join(__dirname, 'projects.json');

var db = new DataStore({
    filename : dbFileName,
    autoload : true
});


var Contacts = function () {};

Contacts.prototype.allContacts = function(callback) {
    return db.find({}, callback);
};

Contacts.prototype.add = function(contact, callback) {
    return db.insert(contact, callback);
};

Contacts.prototype.removeAll = function(callback) {
    return db.remove({},{ multi: true},callback);
};

Contacts.prototype.get = function(name, callback) {
    return db.find({projname:name}, callback);
};

Contacts.prototype.remove = function(name, callback) {
    return db.remove({projname:name},{ multi: true}, callback);
};

Contacts.prototype.update = function(name, updatedContact, callback) {
    return db.update({projname:name},updatedContact,{}, callback);
};

module.exports = new Contacts();