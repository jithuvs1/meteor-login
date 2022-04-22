import { Meteor } from "meteor/meteor";
import React, { Fragment } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { PostsCollection } from "../api/postsCollection";
import { PostForm } from "./PostForm";
import { Post } from "./Posts";
import { LoginForm } from "./LoginForm";

export const App = () => {
  const user = useTracker(() => Meteor.user());

  const { posts, isLoading } = useTracker(() => {
    const noDataAvailable = { posts: [] };
    if (!Meteor.user()) {
      return noDataAvailable;
    }
    const handler = Meteor.subscribe("posts");

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    const posts = PostsCollection.find(
      {},
      {
        sort: { createdAt: -1 },
      }
    ).fetch();

    return { posts };
  });

  const deletePost = ({ _id }) => {
    Meteor.call("posts.remove", _id, (error) => {
      if (error) {
        alert(error.error);
      }
    });
  };

  const logout = () => Meteor.logout();
  return (
    <div>
      <h1>Welcome {user && user.username}!</h1>
      {user ? (
        <Fragment>
          <button onClick={logout}>logout</button>
          <PostForm user={user} />
          <ul>
            {posts.map((post) => (
              <Post
                key={post._id}
                post={post}
                onDeleteClick={deletePost}
                user={user}
              />
            ))}
          </ul>
        </Fragment>
      ) : (
        <LoginForm />
      )}
    </div>
  );
};
