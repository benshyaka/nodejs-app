import chai from 'chai';
import chaiHttp from 'chai-http';

const should = chai.should();
import mongoose from "mongoose";

// Import server
import server from '../app.js';

// Import Todo Model   
import Todo from "../routes/index.js";

// use chaiHttp for making the actual HTTP requests   
chai.use(chaiHttp);
describe('The home API', function() {
    beforeEach(function(done) {
        var newTodo = new Todo({
            text: 'Cook Indomie',
            status: true
        });
        newTodo.save(function(err) {
            done();
        });
    });



    it('should list ALL Todos on /todos GET', function(done) {
        chai.request(server)
            .get('/blogs/all')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
    });

    it('should list ALL Todos on /todos GET', function(done) {
        chai.request(server)
            .get('/blogs/all')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
    });


});