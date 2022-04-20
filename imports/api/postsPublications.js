import { Meteor } from "meteor/meteor";
import { PostsCollection } from "./postsCollection";

Meteor.publish("posts", function publishPosts() {
  return PostsCollection.find();
});
