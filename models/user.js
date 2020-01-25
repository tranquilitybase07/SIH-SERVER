const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = (module.exports = mongoose.model("User", UserSchema));

module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
};

module.exports.getUserByUsername = function(email, callback) {
  const query = { email: email };
  User.findOne(query, callback);
};

module.exports.addUser = function(newUser, callback) {
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      throw err;
    }
    bcrypt.hash(newUser.password, salt, function(err, hash) {
      if (err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    if (err) throw err;
    callback(null, isMatch);
  });
};

module.exports.updatepass = function(nuser, callback) {
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      throw err;
    }
    bcrypt.hash(nuser.password, salt, function(err, hash) {
      if (err) throw err;
      User.updateOne(
        { username: nuser.username },
        { password: hash },
        callback
      );
    });
  });
};

module.exports.delUser = function(username, callback) {
  User.deleteOne({ username: username }, callback);
};
