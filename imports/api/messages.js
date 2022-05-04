import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Messages = new Mongo.Collection('messages');
 
if (Meteor.isServer) {
  // Only publish messages that belong to the current user
  Meteor.publish('messages', function messagesPublication() {
		return Messages.find(); //{ owner: this.userId }	
  });
  
}

//authentication foruser
Meteor.methods({
  'messages.remove'(messageId) {
	check(messageId, String);


	messageOwner = Messages.findOne({_id: messageId});
	console.log("messageId is, ", messageId);
	console.log("target messageId of request, ", messageOwner, messageOwner._id);
	

	(messageOwner.owner === this.userId) ?	Messages.remove(messageId) : console.log("Sorry. Not Authorized")
  
  },

});

Messages.allow({
	insert:function(userId,doc){
		//return userId;
		// doc.owner === userId
		return userId && doc.owner === userId;
   },
   update:function(userId,doc,flields,modifier){
	   return doc.owner === userId;
   },
   remove: function(userId,doc){
	   return false;
    },
	fetch: ['owner']
 })
