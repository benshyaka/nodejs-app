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
// describe('The home API', function() {
//     beforeEach(function(done) {
//         var newTodo = new Todo({
//             text: 'Cook Indomie',
//             status: true
//         });
//         newTodo.save(function(err) {
//             done();
//         });
//     });

    // describe('/GET single blog with id', () => {
    //     it('it should GET the signle blog with the id', (done) => {
    //       chai.request(server)
    //           .get('/blogs/single/6227396dbd3b3b24697230bd')
    //           .end((err, res) => {
    //                 res.should.have.status(200);
    //                 res.body.should.be.json;
    //             done();
    //           });
    //     });
    // });



    it('should list ALL Todos on /blogs/all GET', function(done) {
        chai.request(server)
            .get('/blogs/all')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
    });

    it('it should GET the signle blog with the id', function(done) {
        chai.request(server)
            .get('/blogs/single/6227396dbd3b3b24697230bd')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
    });

    it('it should POST the signle blog', function(done) {
        let body = {
                        "author": "rutonesha",
                        "title": "Blog title  updated",
                        "body": "Body text dfddf",
                        "image": "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80",
                        "createdAt": "2022-03-08T10:58:22.502Z"
                    }
        chai.request(server)
           .post('blogs')
           .set('Accept', 'raw/JSON')
           .send(body)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
    });


    describe('/POST blog', () => {
        it('it should not POST a book without pages field', (done) => {
            let body = {
                "author": "rutonesha",
                "title": "Blog title  updated",
                "body": "Body text dfddf",
                "image": "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80",
                "createdAt": "2022-03-08T10:58:22.502Z"
                }
          chai.request(server)
              .post('/blogs')
              .send(body)
              .end((err, res) => {
                    res.should.have.status(201);
                done();
              });
        });
  
    });

    // describe('/POST blogs', () => {
        // it('it should not POST a blog without body data', (done) => {
        //     let blog = {
        //         "author": "rutonesha",
        //         "title": "Blog title  updated",
        //         "body": "Body text dfddf",
        //         "image": "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80",
        //         "createdAt": "2022-03-08T10:58:22.502Z"
        //     }
        //   chai.request(server)
        //       .post('http://localhost:3000/blogs')
        //       .set('Accept', 'raw/json')
        //       .send(blog)
        //       .end((err, res) => {
        //           console.log(blog)
        //             res.should.have.status(200);
        //             res.should.be.json;

        //             // res.body.should.be.a('object');
        //             // res.body.should.have.property('errors');
        //             // res.body.errors.should.have.property('pages');
        //             // res.body.errors.pages.should.have.property('kind').eql('required');
        //         done();
        //       });
        // });
  
    // });






    // it("adds 2 numbers", done => {
    //     chai
    //     .request(server)
    //     .post("/add")
    //      .send({
    //                     author: "rutonesha",
    //                     title: "Blog title  updated",
    //                     body: "Body text dfddf"
    //                 })
    //     .end((err, res) => {
    //         res.should.have.status(200);
    //             res.should.be.json;
    //      done();
    //      });
    //      });