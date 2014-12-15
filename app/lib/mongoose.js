var mongoose = require('mongoose');
var config = require('./config'); 

mongoose.connect(config.get('mongoose:uri'));
var db = mongoose.connection;

db.once('open', function callback () {
    console.log('mongoDB connection extablished');
});

var Schema = mongoose.Schema;

// Schemas

/*  USER  */
var User = new Schema({
	firstName: {
		type: String		
	},
	lastName: {
		type: String		
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	pwHash: {
		type: String,
		// required: true
	}
});

User.path('email').validate(function (email) {
   var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
   return emailRegex.test(email);
}, 'The e-mail field cannot be empty.');

User.path('email').index({unique: true});


/*  MESSAGE  */
var Message = new Schema({
    author: { 
    	type: Schema.ObjectId, 
    	ref: 'User' 
    },
    msg: { 
    	type: String 
    }
});


/*  TICKET  */
var Ticket = new Schema({
	project: {
    	type: Schema.ObjectId, 
    	ref: 'Project' 		
	},
	author: { 
    	type: Schema.ObjectId, 
    	ref: 'User' 
    },
    subj: { 
    	type: String, 
    	required: true 
    },
    messages: [{ 
    	type: Schema.ObjectId, 
    	ref: 'Message' 
    }],
    cX: Number,
    cY: Number
});


/*  PROJECT  */
var Project = new Schema({
	author: {
    	type: Schema.ObjectId, 
    	ref: 'User'
	},
	url: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	members: [{
		type: Schema.ObjectId, 
		ref: 'User'
	}]
});

var UserModel = mongoose.model('User', User);
var MessageModel = mongoose.model('Message', Message);
var TicketModel = mongoose.model('Ticket', Ticket);
var ProjectModel = mongoose.model('Project', Project);

module.exports.UserModel = UserModel;
module.exports.MessageModel = MessageModel;
module.exports.TicketModel = TicketModel;
module.exports.ProjectModel = ProjectModel;