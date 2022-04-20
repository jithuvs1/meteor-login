import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { SignUpForm } from "./SignupForm";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [sigup, toggleSignup] = useState(false);

  const submit = (e) => {
    e.preventDefault();

    Meteor.loginWithPassword(username, password, function (err) {
      if (err) {
        alert(`errorMessage ${err.message}`);
      }
    });
  };

  return (
    <>
      {sigup ? (
        <SignUpForm />
      ) : (
        <>
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

            <button type="submit">Log In</button>
          </form>
          <p onClick={(e) => toggleSignup(true)}>Don't have an account?</p>
        </>
      )}
    </>
  );
};
