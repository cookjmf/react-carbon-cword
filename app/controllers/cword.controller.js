
const Cword = require("../models/cword.model.js");

// Create and Save a new Cword
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Cword
  var contAsJson = JSON.stringify(req.body);

  const cword = new Cword({
    name: req.body.name,
    contents: contAsJson
  });

  // Save Cword in the database
  Cword.create(cword, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Cword."
      });
    else res.send(data);
  });
};

// Retrieve all Cwords from the database.
exports.findAll = (req, res) => {
  Cword.getAll((err, data) => {
    if (err) {
      var myJSON = JSON.stringify(err);
      console.log("Sending error : ..."+myJSON+"...");
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving cwords."
      });
      console.log("Sent error");
    }
    else {
      var myJSON = JSON.stringify(data);
      console.log("Sending response : ..."+myJSON+"...");
      res.send(data);
      console.log("Sent response");
    };
  });
};



// Find a single Cword with a cwordId
exports.findOne = (req, res) => {
  Cword.findById(req.params.cwordId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Cword with id ${req.params.cwordId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Cword with id " + req.params.cwordId
        });
      }
    } else res.send(data);
  });
};

// Find a single Cword with a name
exports.findOneByName = (req, res) => {
  Cword.findByName(req.params.name, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Cword with name ${req.params.name}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Cword with name " + req.params.name
        });
      }
    } else res.send(data);
  });
};

// Update a Cword identified by the cwordId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Cword.updateById(
    req.params.cwordId,
    new Cword(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Cword with id ${req.params.cwordId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Cword with id " + req.params.cwordId
          });
        }
      } else res.send(data);
    }
  );
};

// Update a Cword identified by the name in the request
exports.updateByName = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  var cw = {};
  cw.name = req.params.name;
  cw.contents = req.body;
  var cword = new Cword(cw);

  Cword.updateByName(
    cw.name,
    cword,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Cword with name ${req.params.name}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Cword with name " + req.params.name
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Cword with the specified cwordId in the request
exports.delete = (req, res) => {
  Cword.remove(req.params.cwordId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Cword with id ${req.params.cwordId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Cword with id " + req.params.cwordId
        });
      }
    } else res.send({ message: `Cword was deleted successfully!` });
  });
};

// Delete a Cword with the specified name in the request
exports.deleteByName = (req, res) => {
  Cword.removeByName(req.params.name, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Cword with name ${req.params.name}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Cword with name " + req.params.name
        });
      }
    } else res.send({ message: `Cword was deleted successfully!` });
  });
};

// Delete all Cwords from the database.
exports.deleteAll = (req, res) => {
  Cword.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all cwords."
      });
    else res.send({ message: `All Cwords were deleted successfully!` });
  });
};

