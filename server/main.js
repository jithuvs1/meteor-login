import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

import "../imports/api/postsMethods";
import "../imports/api/userMethods";
import "../imports/api/postsPublications";

const SEED_USERNAME = "meteorite";
const SEED_PASSWORD = "password";

Meteor.startup(() => {
  // If User  is empty, add default data.
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }
});
