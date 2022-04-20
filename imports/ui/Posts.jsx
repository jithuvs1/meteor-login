import React from "react";

export const Post = ({ post, user, onDeleteClick }) => {
  return (
    <li>
      {post.body}
      {user._id === post.userId && (
        <button onClick={() => onDeleteClick(post)}>&times;</button>
      )}
    </li>
  );
};
