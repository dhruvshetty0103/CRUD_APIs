const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();
chai.use(chaiHttp);
/**
 * /POST request test
 * positive and negative - login test
 */
describe("POST users/registeration", () => {
  it("positive test case dor registeration", (done) => {
    let data = {
      firstName: "Ziyan",
      lastName: "Abdul",
      email: "ziyanabdul@gmail.com",
      password: "ziyan@123",
    };
    chai
      .request(server)
      .post("/users")
      .send(data)
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.be.a("object");
        if (err) {
          return done(err);
        }
        done();
      });
  });
  
  
  it("Negative test case for registeration", (done) => {
    let data = {
      firstName: "Adithya",
      lastName: "",
      email: "adi@gmail.com",
      password: "adi@123",
    };
    chai
      .request(server)
      .post("/users")
      .send(data)
      .end((err, res) => {
        res.body.should.have.status(500);
        res.body.should.be.a("object");
        if (err) {
          return done(err);
        }
        done();
      });
  });
});
/**
 * /POST request test
 * positive and negative - login test
 */
describe("POST users/login", () => {
  it("positive test case ", (done) => {
    let data = {
      email: "dhruvshetty0103@gmail.com",
      password: "joe",
    };
    chai
      .request(server)
      .post("/users/login")
      .send(data)
      .end((err, res) => {
        res.body.should.have.status(200);
        res.body.should.be.a("object");
        res.body.message.should.have.property("Token");
        if (err) {
          return done(err);
        }
        done();
      });
  });
  it("Negative test case", (done) => {
    let data = {
      email: "adi@gmail.com",
      password: "Adithya",
    };
    chai
      .request(server)
      .post("/users/login")
      .send(data)
      .end((err, res) => {
        res.body.should.have.status(500);
        res.body.should.have.property("message").eql("password mismatch");
        if (err) {
          return done(err);
        }
        done();
      });
  });
});