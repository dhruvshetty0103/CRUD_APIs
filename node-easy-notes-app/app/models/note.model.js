const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    title: String,
    content: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, {
    timestamps: true
});

const myNote = mongoose.model("Note", NoteSchema);

class noteModel {
    //creates a note and saves it in database
    createNote = (title, content, userId, callback) => {
      const note = new myNote({
        title: title,
        content: content,
        userId: userId,
      });
      return note.save((err, data) => {
        return err ? callback(err, null) : callback(null, data);
      });
    };
  
    // Retrieve and return all notes from the database.
    findAll = (userId,callback) => {
      return myNote
      .find({ userId: userId })
      .populate({
        path: "userId",
        select: ["firstName", "lastName", "email"],
      })
      .exec((error, data) => {
        return error ? callback(error, null) : callback(null, data);
      });
    };
  
    // Find a single note with a noteId
    findOne = (userId,noteId, callback) => {
      return myNote.findOne({ userId: userId, _id: noteId }, (error, data) => {
        if (error) {
          return callback(error, null);
        }
        if (!data) {
          return callback("You dont have access to this note", null);
        } else {
          return callback(null, data);
        }
      });
    };
    
  
    // Update a note identified by the noteId in the request
    updateNote = (userId, noteId, body, callback) => {
      return myNote.findOneAndUpdate(
        { 
          userId: userId, 
          _id: noteId 
        },
        {
          title: body.title,
          content: body.content,
        },
        { new: true },
        (error, data) => {
          if (error) {
            return callback(error, null);
          }
          if (!data) {
            return callback("You dont have access to this note", null);
          } else {
            return callback(null, data);
          }
        }
      );
    };
  
    // Delete a note with the specified noteId in the request
    deleteOne = (userId,noteId, callback) => {
      myNote.findOneAndRemove({ userId: userId, _id: noteId }, (error, data) => {
        if (error) {
          return callback(error, null);
        }
        if (!data) {
          return callback("You dont have access to this note", null);
        } else {
          return callback(null, data);
        }
      });
    };

}
  
module.exports = new noteModel();