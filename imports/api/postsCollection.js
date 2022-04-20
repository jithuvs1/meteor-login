import { Mongo } from "meteor/mongo";

export const PostsCollection = new Mongo.Collection("posts");

PostsCollection.allow({
  insert(userId, doc) {
    // The user must be logged in and the document must be owned by the user.
    return userId && doc.userId === userId;
  },

  update(userId, doc, _fields, _modifier) {
    // Can only change your own documents.
    return doc.userId === userId;
  },

  remove(userId, doc) {
    // Can only remove your own documents.
    return doc.userId === userId;
  },

  fetch: ["userId"],
});

PostsCollection.deny({
  update(_userId, _doc, fields, _modifier) {
    // Can't change owners.
    return _.contains(fields, "userId");
  },

  remove(_userId, doc) {
    // Can't remove locked documents.
    return doc.locked;
  },

  fetch: ["locked"], // No need to fetch `owner`
});
