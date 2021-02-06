const sql = require("./cword.db.js");

// constructor
const Cword = function(cword) {
  this.name = cword.name;
  this.contents = cword.contents;
};

Cword.create = (newCword, result) => {
  sql.query("INSERT INTO cword SET ?", newCword, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created cword: ", { id: res.insertId, ...newCword });
    result(null, { id: res.insertId, ...newCword });
  });
};

Cword.findById = (cwordId, result) => {
  sql.query(`SELECT * FROM cword WHERE id = ${cwordId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found cword: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Cword with the id
    result({ kind: "not_found" }, null);
  });
};

Cword.findByName = (name, result) => {
  sql.query("SELECT * FROM cword WHERE name = ?", [name], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found cword: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Cword with the name
    result({ kind: "not_found" }, null);
  });
};

Cword.getAll = result => {
  sql.query("SELECT * FROM cword", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("cwords: ", res);
    result(null, res);
  });
};

Cword.updateById = (id, cword, result) => {
  sql.query(
    "UPDATE cword SET name = ?, contents = ? WHERE id = ?",
    [cword.name, cword.contents, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Cword with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated cword: ", { id: id, ...cword });
      result(null, { id: id, ...cword });
    }
  );
};

Cword.updateByName = (name, cword, result) => {
  var cont = JSON.stringify(cword.contents);
  var name = name;
  sql.query(
    "UPDATE cword SET contents = ? WHERE name = ?",
    [cont, name],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Cword with the name
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated cword: ", { name: name, ...cword });
      result(null, { name: name, ...cword });
    }
  );
};

Cword.remove = (id, result) => {
  sql.query("DELETE FROM cword WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Cword with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted cword with id: ", id);
    result(null, res);
  });
};

Cword.removeByName = (name, result) => {
  sql.query("DELETE FROM cword WHERE name = ?", name, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Cword with the name
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted cword with name: ", name);
    result(null, res);
  });
};

Cword.removeAll = result => {
  sql.query("DELETE FROM cword", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} cwords`);
    result(null, res);
  });
};

module.exports = Cword;
