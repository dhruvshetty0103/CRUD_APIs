const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const note = require("./note.json")
chai.should();
chai.use(chaiHttp);
describe("Note API", () => {
  let token = "";
  let noteId = "";
  let data = note.loginDetails
  beforeEach((done) => {
    chai
      .request(server)
      .post("/users/login")
      .send(data)
      .end((err, res) => {
        token = res.body.message.Token;
        res.body.should.have.status(200);
        if (err) {
          return done(err);
        }
        done();
      });
  });
  /**
   * /GET request test
   * Positive and Negative - Get all Notes data from database note
   */
  describe("GET /notes", () => {
    it("Given a valid request it should get all the notes from database", (done) => {
      chai
        .request(server)
        .get("/notes")
        .set("token", `bearer ${token}`)
        .end((err, res) => {
          res.body.should.have.status(200);
          res.body.should.have.property("message").should.be.a("object");
          if (err) {
            return done(err);
          }
          done();
        });
    });
    it("Given a Invalid request it should throw error", (done) => {
      chai
        .request(server)
        .get("/notes")
        .set("token", "bearer ")
        .end((err, res) => {
          res.body.should.have.property("name").eql("JsonWebTokenError");
          res.body.should.have.property("message").eql("jwt must be provided");
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });
  /**
   * /POST request test
   * Positive and Negative - Add Note to the database
   */
  describe("POST /notes", () => {
    it("Given a valid data and request it should add note to the database", (done) => {
      let data = note.ValidNoteData
      chai
        .request(server)
        .post("/notes")
        .set("token", `bearer ${token}`)
        .send(data)
        .end((err, res) => {
          noteId = res.body.message._id;
          res.should.have.status(200);
          res.body.should.have.property("message").should.be.a("object");
          if (err) {
            return done(err);
          }
          done();
        });
    });
    it("Passed a invalid data should throw error", (done) => {
      let data = note.InvalidNoteData
      chai
        .request(server)
        .post("/notes")
        .set("token", `bearer ${token}`)
        .send(data)
        .end((err, res) => {
          res.body.should.have
            .property("message")
            .eql(
              "Title name should begin with alphabets and can contain only alphanumeric values and should be minimum of length 3"
            );
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });
  /**
   * /GET request test
   * Positive and Negative - Get individual Notes from database
   */
  describe("GET /notes/:id", () => {
    it("Given a valid request and noteId it should get particular note from database", (done) => {
      chai
        .request(server)
        .get(`/notes/${noteId}`)
        .set("token", `bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("message").should.be.a("object");
          if (err) {
            return done(err);
          }
          done();
        });
    });
    it("Given a Invalid request and noteId should throw error", (done) => {
      chai
        .request(server)
        .get(`/notes/${noteId}`)
        .set("token", `bearer `)
        .end((err, res) => {
          res.body.should.have.property("name").eql("JsonWebTokenError");
          res.body.should.have.property("message").eql("jwt must be provided");
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });
  /**
   * /PUT request test
   * Positive and Negative - update Note from the database
   */
  describe("PUT /notes/:id", () => {
    it("Given a valid data and request it should update note from the database", (done) => {
      let data = note.ValidNoteData
      chai
        .request(server)
        .put(`/notes/${noteId}`)
        .set("token", `bearer ${token}`)
        .send(data)
        .end((err, res) => {
          res.body.should.have.status(200);
          res.body.should.have.property("message").should.be.a("object");
          if (err) {
            return done(err);
          }
          done();
        });
    });
    it("Passed a invalid data for update should throw error", (done) => {
      let data = note.InvalidNoteData
      chai
        .request(server)
        .put(`/notes/${noteId}`)
        .set("token", `bearer ${token}`)
        .send(data)
        .end((err, res) => {
          res.body.should.have
            .property("message")
            .eql(
              "Title name should begin with alphabets and can contain only alphanumeric values and should be minimum of length 3"
            );
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });
  /**
   * /Delete request test
   * Positive and Negative - Delete Note of given id from database
   */
  describe("Delete /notes/:id", () => {
    it("Given a valid request and noteId it should delete a note from database", (done) => {
      chai
        .request(server)
        .delete(`/notes/${noteId}`)
        .set("token", `bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("message").eql("deleted successfully");
          if (err) {
            return done(err);
          }
          done();
        });
    });
    it("Given a Invalid token should throw error", (done) => {
      chai
        .request(server)
        .delete(`/notes/${noteId}`)
        .set("token", `bearer ${token}az`)
        .end((err, res) => {
          res.body.should.have.property("name").eql("JsonWebTokenError");
          res.body.should.have.property("message").eql("invalid signature");
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });
});