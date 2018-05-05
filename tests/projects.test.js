'use strict';

var chai = require('chai');
chai.use(require('chai-things'));
var expect = chai.expect;
var projects = require('../projects.js');

var updateproject = {
                            projname:"Proyecto updated",
                            tipo:"Ayuda comunitaria con nombre",
                            referencia:"AWS1718-01",
                            fecha_ini:"2016-01-30",
                            fecha_fin:"2018-12-30",
                            grResp:[{"Resp_name":"Pablo Fernández Montes"},{"Resp_name":"Octavio Martín Díaz"}],
                            grFnc:[{"Fnc_name":"Amador Durán Toro"}],
                            grInv:[{"inv_name":"Margarita Cruz Risco"},{"inv_name":"José Antonio Parejo Maestre"}],
                            grTrb:[{"trb_name":"Alfonso Eduardo Márquez Chamorro"},{"trb_name":"Ana Belén Sánchez Jerez"}],
                            grSoc:[{"Soc_name":"Margarita Cruz Risco"},{"Soc_name":"José María García Rodríguez"}],
                            grCtr:[{"Ctr_name":"José María García Rodríguez"},{"Ctr_name":"Sergio Segura Rueda"}]
                
                        };


describe('Projects', function() {
    beforeEach(function(done) {
        projects.connectDb((err) => {
            if (err) {
                return done(err);
            }


            projects.removeAll(function(err) {
                if (err) {
                    return done(err);
                }

                projects.add([{
                        projname: "Proyecto para la investigacion",
                        tipo: "Ayuda comunitaria con nombre",
                        referencia: "AWS1718-01",
                        fecha_ini: "2016-01-30",
                        fecha_fin: "2018-12-30",
                        grResp: [{ "Resp_name": "Pablo Fernández Montes" }, { "Resp_name": "Octavio Martín Díaz" }],
                        grFnc: [{ "Fnc_name": "Amador Durán Toro" }],
                        grInv: [{ "inv_name": "Margarita Cruz Risco" }, { "inv_name": "José Antonio Parejo Maestre" }],
                        grTrb: [{ "trb_name": "Alfonso Eduardo Márquez Chamorro" }, { "trb_name": "Ana Belén Sánchez Jerez" }],
                        grSoc: [{ "Soc_name": "Margarita Cruz Risco" }, { "Soc_name": "José María García Rodríguez" }],
                        grCtr: [{ "Ctr_name": "José María García Rodríguez" }, { "Ctr_name": "Sergio Segura Rueda" }]

                    },
                    {
                        projname: "Proyecto AWS1718",
                        tipo: "Ayuda comunitaria con nombre",
                        referencia: "AWS1718-02",
                        fecha_ini: "2015-03-30",
                        fecha_fin: "2017-03-30",
                        grResp: [{ "Resp_name": "Pablo Fernández Montes" }, { "Resp_name": "Octavio Martín Díaz" }],
                        grFnc: [{ "Fnc_name": "Amador Durán Toro" }],
                        grInv: [{ "inv_name": "Margarita Cruz Risco" }, { "inv_name": "José Antonio Parejo Maestre" }],
                        grTrb: [{ "trb_name": "Alfonso Eduardo Márquez Chamorro" }, { "trb_name": "Ana Belén Sánchez Jerez" }],
                        grSoc: [{ "Soc_name": "Margarita Cruz Risco" }, { "Soc_name": "José María García Rodríguez" }],
                        grCtr: [{ "Ctr_name": "José María García Rodríguez" }, { "Ctr_name": "Sergio Segura Rueda" }]

                    }
                ], done);
            });
        });
    });
    describe('#allProjects()', function() {
        it('should return all projects', function(done) {
            projects.allProjects((err, res) => {
                if (err) {
                    return done(err);
                }

                expect(res).to.have.lengthOf(2);
                expect(res).to.contain.an.item.with.property('referencia', 'AWS1718-01');
                expect(res).to.contain.an.item.with.property('referencia', 'AWS1718-02');
                done();
            });
        });
    });

    describe('#update()', function() {
        it('should update the element', function(done) {
            projects.update('AWS1718-02', updateproject, (err) => {
                if (err) {
                    return done(err);
                }

                projects.allProjects((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    expect(res).to.have.lengthOf(2);
                    expect(res).not.to.contain.an.item.with.property('projname', 'Proyecto AWS1718');
                    expect(res).to.contain.an.item.with.property('projname', 'Proyecto updated');
                    done();
                });
            });
        });
    });

    describe('#get()', function() {
        it('should get the element', function(done) {
            projects.get('AWS1718-01', (err, res) => {
                if (err) {
                    return done(err);
                }
                expect(res).to.have.lengthOf(1);
                expect(res).to.contain.an.item.with.property('referencia', 'AWS1718-01');
                done();
            });
        });
    });


    describe('#remove()', function() {
        it('should remove the element', function(done) {
            projects.remove('AWS1718-01', (err) => {
                if (err) {
                    return done(err);
                }

                projects.allProjects((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    expect(res).to.have.lengthOf(1);
                    expect(res).not.to.contain.an.item.with.property('referencia', 'AWS1718-01');
                    done();
                });
            });
        });
    });


    describe('#removeAll()', function() {
        it('should remove all element', function(done) {
            projects.removeAll((err) => {
                if (err) {
                    return done(err);
                }

                projects.allProjects((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    expect(res).to.have.lengthOf(0);
                    done();
                });
            });
        });
    });


});
