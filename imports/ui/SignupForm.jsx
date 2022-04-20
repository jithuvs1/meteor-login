import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

export const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e) => {
    e.preventDefault();

    Meteor.call("checkIfUserExists", username, function (err, result) {
      if (err) {
        alert("There is an error while checking username");
      } else {
        if (result === false) {
          Accounts.createUser(
            {
              username: username,
              password: password,
            },
            function (err) {
              if (err) {
                alert(`error : ${err.message}`);
              }
            }
          );
        } else {
          alert("A user with this username already exists..");
        }
      }
    });
  };

  return (
    <>
      <h2>Sign Up</h2>
      <form onSubmit={submit} className="login-form">
        <label htmlFor="username">Username</label>

        <input
          type="text"
          placeholder="Username"
          name="username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password</label>

        <input
          type="password"
          placeholder="Password"
          name="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Sign Up</button>
      </form>
    </>
  );
};
