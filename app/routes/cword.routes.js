
module.exports = app => {
  const cwords = require("../controllers/cword.controller.js");

  // Create a new Cword
  app.post("/cwords", cwords.create);

  // Retrieve all Cwords
  app.get("/cwords", cwords.findAll);

  // Retrieve a single Cword with cwordId
  app.get("/cwords/:cwordId", cwords.findOne);

  // Retrieve a single Cword with name
  app.get("/cwords/name/:name", cwords.findOneByName);

  // Update a Cword with cwordId
  app.put("/cwords/:cwordId", cwords.update);

  // Update a Cword with name
  app.put("/cwords/name/:name", cwords.updateByName);

  // Delete a Cword with cwordId
  app.delete("/cwords/:cwordId", cwords.delete);

  // Delete a Cword with name
  app.delete("/cwords/name/:name", cwords.deleteByName);

  // Delete all Cwords
  app.delete("/cwords", cwords.deleteAll);
};
