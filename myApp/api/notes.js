const express = require("express");
const noteRouter = express.Router();
const Note = require("../models/Note");

//get note/notes
noteRouter.get("/getnotes", (req, res) => {
  
    Note.find({}, (err, documents) => {
      if (err) {
        res.status(500).json({
          msg: {
            msgBody: "An error occured while retrieving notes",
            msgError: true,
          },
        });
      } else {
        res.status(200).json({ notes: documents });
      }
    });
});

  //add note
  noteRouter.post("/newnote", (req, res) => {
    console.log("Note to add: ", req.body);
    //res.status(200).json({ msg: `Added note: ${req.body.title}` });
    const newNote = new Note({
      title: req.body.title,
      body: req.body.body,
    });
    newNote.save((err) => {
      if (err) {
        res.status(500).json({
          msg: {
            msgBody: "An error occured while saving note",
            msgError: true,
          },
        });
      } else {
        res.status(201).json({
          msg: {
            msgBody: "Note was saved",
            msgError: false,
          },
        });
      }
    });
  });
  
  //update note
  noteRouter.put("/updatenote/:id", (req, res) => {
    /*console.log("Note to update: ", req.body);
    console.log("Note ID", req.params.id);
    res.status(200).json({ msg: `Updated note: ${req.params.id}` });*/
    Note.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title, body: req.body.body },
      (err) => {
        if (err) {
          res.status(500).json({
            msg: {
              msgBody: "An error occured while updating note",
              msgError: true,
            },
          });
        } else {
          res.status(200).json({
            msg: {
              msgBody: "Note was updated",
              msgError: false,
            },
          });
        }
      }
    );
  });
  
  //delete note
  noteRouter.delete("/deletenote/:id", (req, res) => {
    /*console.log("Note ID", req.params.id);
    res.status(200).json({ msg: `Deleted note: ${req.params.id}` });*/
    Note.findByIdAndDelete(req.params.id, (err) => {
      if (err) {
        res.status(500).json({
          msg: {
            msgBody: "An error occured while deleting note",
            msgError: true,
          },
        });
      } else {
        res.status(200).json({
          msg: {
            msgBody: "Note was deleted",
            msgError: false,
          },
        });
      }
    });
  });
  
  module.exports = noteRouter;