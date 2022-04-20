import React, { useState } from "react";
import { PostsCollection } from "../api/postsCollection";

export const PostForm = ({ user }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim()) return;
    PostsCollection.insert({
      userId: user ? user._id : "",
      body: text.trim(),
      createdAt: new Date(),
    });

    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type to add new Message"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button type="submit">Post</button>
    </form>
  );
};
