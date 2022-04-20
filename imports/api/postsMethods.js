import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { PostsCollection } from "./postsCollection";

Meteor.methods({
  "posts.remove"(postId) {
    check(postId, String);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    const post = PostsCollection.findOne({ _id: postId, userId: this.userId });

    if (!post) {
      throw new Meteor.Error("Access denied.");
    }

    PostsCollection.remove(postId);
  },
});
