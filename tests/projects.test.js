'use strict';

var chai = require('chai');
chai.use(require('chai-things'));
var expect = chai.expect;
var projects = require('../projects.js');

describe('Projects', function() {
    beforeEach(function(done) {
        projects.removeAll(function(err) {
            if (err) {
                return done(err);
            }
            
            projects.add([{
                projname: "proyecto1",
                tipo: "tipo1",
                referencia: "proyecto-1"
            }, {
                projname: "proyecto2",
                tipo: "tipo2",
                referencia: "proyecto-2"
            }], done);
        });
    });
    
    describe('#allContacts()', function() {
        it('should return all contacts', function(done) {
            projects.allContacts((err, res) => {
                if (err) {
                    return done(err);
                }
                
                expect(res).to.have.lengthOf(2);
                expect(res).to.contain.an.item.with.property('projname', 'proyecto1');
                expect(res).to.contain.an.item.with.property('projname', 'proyecto2');
                done();
            });
        });
    });
    
    describe('#remove()', function() {
        it('should remove the element', function(done) {
            projects.remove('proyecto1', (err) => {
                if (err) {
                    return done(err);
                }
                
                projects.allContacts((err,res) => {
                    if (err) {
                        return done(err);
                    }
                    
                    expect(res).to.have.lengthOf(1);
                    expect(res).not.to.contain.an.item.with.property('projname', 'proyecto1');
                    done();
                });
            });
        });
    });
});