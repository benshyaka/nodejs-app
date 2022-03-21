import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from "jsonwebtoken";

const should = chai.should();
import mongoose from "mongoose";

// Import server
import server from '../app.js';

// Import Todo Model   
import Todo from "../routes/index.js";


chai.use(chaiHttp);



    it('should list ALL blogs on /blogs/all GET', function(done) {
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


    // describe('POST blogs', function() {
    //     it('Adds a new blog', function(done) {
    //         chai.request(server)
    //         .post('/auth/register')
    //         .send({ email: "API testing rocks!" })
    //         .end(function(err, res) {
    //             res.should.have.status(200);
    //             res.should.be.json;
    //             done();
    //         });
    //     });
    // });


    describe("/POST blog", () => {
        it("it should POST a blog ", (done) => {
          let newblog = {
            title: "The Lord of the Rings",
            author: "Lorem ipsum dolor sit amet, ",
          };
          chai
                .request(server)
                .post("/blogs")
                .set("Authorization", `JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJlbnNoeWFrYUBnbWFpbC5jb20iLCJfaWQiOiI2MjM0NmE0OGNlYzc1ZTJmNDI4NmU0MzkiLCJpYXQiOjE2NDc2MDIyNTd9.Otall9XH0dnn3CMcLhnZBNRybhzEXO354oUgaL9XvjM`)
                .send(newblog)
                .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a("object");
                  res.should.be.json;
                  done();
                });
        });
      });


    // it('it should POST the signle blog', function(done) {
    //     let body = {
    //                     "author": "rutonesha",
    //                     "title": "Blog title  updated",
    //                     "body": "Body text dfddf",
    //                     "image": "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80",
    //                     "createdAt": "2022-03-08T10:58:22.502Z"
    //                 }
    //     chai.request(server)
    //        .post('blogs')
    //        .set('Accept', 'raw/JSON')
    //        .send(body)
    //         .end((err, res) => {
    //             res.should.have.status(200);
    //             res.should.be.json;
    //             done();
    //         });
    // });

    describe("/POST blog", () => {
        it("it should POST a blog ", (done) => {
          let blog = {
            title: "The Lord of the Rings",
            content: "Lorem ipsum dolor sit amet, ",
          };
          jwt.sign(
            { email: "info@email.com", username: "rchl" },
            { expiresIn: "1250s" },
          
          );
        });
      });


    // describe('/POST blog', () => {
    //     it('it should not POST a book without pages field', (done) => {
    //         let body = {
    //             "author": "rutonesha",
    //             "title": "Blog title  updated",
    //             "body": "Body text dfddf",
    //             "image": "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80",
    //             "createdAt": "2022-03-08T10:58:22.502Z"
    //             }
    //       chai.request(server)
    //           .post('/blogs')
    //           .send(body)
    //           .end((err, res) => {
    //                 res.should.have.status(201);
    //             done();
    //           });
    //     });
  
    // });

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