import { Meteor } from "meteor/meteor";

Meteor.methods({
  checkIfUserExists: function (username) {
    return Meteor.users.findOne({ username: username }) ? true : false;
  },
});
