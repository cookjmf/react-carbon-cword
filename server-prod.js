
const express = require("express");
const bodyParser = require("body-parser");

const port = 8080;
var path = require('path');

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

require("./app/routes/cword.routes.js")(app);

// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', express.static(__dirname+'/app/build'))

app.listen(port, () => {
  console.log(`Crossword server at http://localhost:${port}`);
})
