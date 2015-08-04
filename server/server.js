var expressio = require('express.io');
var jwt = require('jsonwebtoken');
var socketioJwt = require("socketio-jwt");
var path = require('path');
var md5 = require('MD5');
var config = require('./lib/config');

var app = expressio().http().io();

// models
var TicketModel = require('./lib/mongoose').TicketModel;
var ProjectModel = require('./lib/mongoose').ProjectModel;
var UserModel = require('./lib/mongoose').UserModel;

// CORS
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if (req.method == 'OPTIONS') {
      	res.send(200);
    } else {
      	next();
    }
});

// TODO uncomment for authorization by token
//app.io.set('authorization', socketioJwt.authorize({
//  secret: config.get('jwt:secret'),
//  handshake: true
//}));

app.io.set('transports', [
    'websocket', 
    'xhr-polling'
]);


app.use(expressio.logger('dev')); // выводим все запросы со статусами в консоль
app.use(expressio.bodyParser()); // стандартный модуль, для парсинга JSON в запросах
app.use(expressio.methodOverride()); // поддержка put и delete
app.use(app.router); // модуль для простого задания обработчиков путей

app.post('/join', function(req, res) {
	if(!req.body.email || !req.body.password) {
		return res.send({error: {type: 'NoDataError'}});
	}

	var user = new UserModel({
		email: req.body.email,
		pwHash: md5(req.body.password)
	});

	user.save(function(err) {
		if(!err) {
			console.log('user registered');
			var token = jwt.sign({
				user: user
			}, config.get('jwt:secret'), { expiresInMinutes: 1000 * 60 });
			return res.send({jwt: token});			
		} else {			
			if(err.name == 'ValidationError' || err.name == 'MongoError') {
				res.statusCode = 400;
				return res.send({error: {
					type: err.name, 
					code: err.code
				}});
			} else {
				res.statusCode = 500;
				return res.send({error: {type: 'ServerError'}});
			}
		}
	})
});

app.post('/signup/beta', function(req, res) {
	if(!req.body.email) {
		return res.send({error: {type: 'NoDataError'}});
	}

	var user = new UserModel({
		email: req.body.email		
	});

	user.save(function(err) {
		if(!err) {
			console.log('user registered');
			return res.send();			
		} else {
			if(err.name == 'ValidationError' || err.name == 'MongoError') {
				res.statusCode = 400;
				return res.send({error: {
					type: err.name,
					code: err.code
				}});
			} else {
				res.statusCode = 500;
				return res.send({error: {type: 'ServerError'}});
			}
		}
	})
});


app.post('/login', function(req, res) {
	if(!req.body.email || !req.body.password) {
		return res.send(400, {error: {type: 'NoDataError'}});
	}

	UserModel.findOne({
		email: req.body.email,
		pwHash: md5(req.body.password)
	}, function(err, user) {
		if(err) {
			return res.send({error: {
				type: err.name,
				code: err.code
			}});
		}

		if(user) {
			var token = jwt.sign({
				user: user
			}, config.get('jwt:secret'), { expiresInMinutes: 1000 * 60 });
			return res.send({jwt: token});
		} else {
			return res.send(404);
		}
	});
});

app.io.on('connection', function (socket) {
  	console.log('hello! ', socket.handshake.decoded_token);
});


app.io.route('jwt', {
    make: function(req) {

    	// search user model and verify
    	UserModel.findOne({
			email: req.data.email
		}, function(err, user) {
			if(user !== null && md5(req.data.password) == user.pwHash) {
				var token = jwt.sign({
					user: user
				}, config.get('jwt:secret'), { expiresInMinutes: 1000 * 60 });

				req.io.emit('jwt:make:success', {
					jwt: token
				});				
			} else {
				req.io.emit('jwt:make:error', err);
			}
		});
    },

    auth: function(req) {
	  	jwt.verify(req.data.token, config.get('jwt:secret'), function(err, decoded) {
	  		if (err) {
	  			req.io.emit('jwt:auth:fail');
          		return;
        	}
		    req.io.decoded_token = decoded;		    
		    req.io.emit('jwt:auth:success', decoded.user);
	  	});
    }
});

app.io.route('project', {
	get: function(req) {
		ProjectModel.findOne({_id: req.data.id}).populate('author', '_id').populate('author', 'email').populate('members').exec(function(err, project) {
			if(!err) {
				return req.io.emit('project:get:success', project);
			} else {
				return req.io.emit('project:get:error', err);
			}
		});
	},
	query: function(req) {
		ProjectModel.find({author: req.handshake.decoded_token.user._id}).populate('author', '_id').populate('author', 'email').exec(function(err, projects) {
			if(!err) {
				return req.io.emit('project:query:success', projects);
			} else {
				return req.io.emit('project:query:error', err);
			}
		});
	},
	create: function(req) {
		var project = new ProjectModel({
			author: req.handshake.decoded_token.user._id,
			url: req.data.project.url,
	    	title: req.data.project.title,
	    	members: []
		});

		project.save(function(err) {
			if(!err) {
				console.log('project created');
				return req.io.emit('project:create:success');
			} else {
				console.log(err);
				return req.io.emit('project:create:error', err);
			}
		});
	},
	update: function(req) {
		ProjectModel.findOne({_id: req.data.project._id}, function(err, project) {
			project.title = req.data.project.title,
			project.url = req.data.project.url
			project.save(function(err) {
				if(!err) {					
					return req.io.emit('project:update:success');
				} else {
					console.log(err);
					return req.io.emit('project:update:error', err);
				}
			});
		});
	}
});

app.io.route('ticket', {
	get: function(req) {
		ProjectModel.findOne({_id: req.data.id}).populate('author', '_id').populate('author', 'email').populate('members').exec(function(err, project) {
			if(!err) {
				return req.io.emit('project:get:success', project);
			} else {
				return req.io.emit('project:get:error', err);
			}
		});
	},
	query: function(req) {
		TicketModel.find({project: req.data.project_id}).populate('author', '_id').populate('author', 'email').exec(function(err, tickets) {
			if(!err) {
				console.log(tickets);
				return req.io.emit('ticket:query:success', tickets);
			} else {
				console.log(err);
				return req.io.emit('ticket:query:error', err);
			}
		});
	},
	create: function(req) {
		var ticket = new TicketModel({
			project: req.data.ticket.project,
			author: req.handshake.decoded_token.user._id,
			subj: req.data.ticket.subj,
			messages: [],
	    	cX: req.data.ticket.cX,
	    	cY: req.data.ticket.cY
		});

		ticket.save(function(err) {
			if(!err) {
				ticketCopy = ticket;
				ticket.author = {
					_id: req.handshake.decoded_token.user._id,
					email: req.handshake.decoded_token.user.email
				};
				console.log(ticketCopy);
				return req.io.emit('ticket:create:success', ticketCopy);
			} else {
				console.log(err);
				return req.io.emit('ticket:create:error', err);
			}
		});
	},
	update: function(req) {
		ProjectModel.findOne({_id: req.data.project._id}, function(err, project) {
			project.title = req.data.project.title,
			project.url = req.data.project.url
			project.save(function(err) {
				if(!err) {					
					return req.io.emit('project:update:success');
				} else {
					console.log(err);
					return req.io.emit('project:update:error', err);
				}
			});
		});
	}
});


// app.post('/tickets', function(req, res) {
// 	var ticket = new TicketModel({
// 		subj: req.body.subj,
// 		author: null,
//     	cX: req.body.cX,
//     	cY: req.body.cY
// 	});

// 	ticket.save(function(err) {
// 		if(!err) {
// 			console.log('ticket created');
// 			return res.send({status: 'OK', ticket: ticket});
// 		} else {
// 			console.log(err);
// 			if(err.name == 'ValidationError') {
// 				res.statusCode = 400;
// 				return res.send({error: 'ValidationError'});
// 			} else {
// 				res.statusCode = 500;
// 				return res.send({error: 'ServerError'});
// 			}			
// 		}
// 	})
// });

// app.get('/tickets', function(req, res) {
// 	TicketModel.find(function(err, tickets) {
// 		if(!err) {
// 			return res.send(tickets);
// 		} else {
// 			res.statusCode = 500;
// 			return res.send({error: 'ServerError'});
// 		}
// 	})
// });

app.listen(config.get('port'), function() {
	console.log('listen');
});
