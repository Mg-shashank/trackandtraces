'use strict';
var log4js = require('log4js');
log4js.configure({
	appenders: {
	  out: { type: 'stdout' },
	},
	categories: {
	  default: { appenders: ['out'], level: 'info' },
	}
});
var logger = log4js.getLogger('NGOAPI');
const WebSocketServer = require('ws');
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var util = require('util');
var app = express();
var cors = require('cors');
var hfc = require('fabric-client');
const uuidv4 = require('uuid/v4');

var connection = require('./connection.js');
var query = require('./query.js');
var invoke = require('./invoke.js');
var blockListener = require('./blocklistener.js');

hfc.addConfigFile('config.json');
var host = 'localhost';
var port = 3000;
var username = "";
var orgName = "";
var channelName = hfc.getConfigSetting('channelName');
var chaincodeName = hfc.getConfigSetting('chaincodeName');
var peers = hfc.getConfigSetting('peers');
///////////////////////////////////////////////////////////////////////////////
//////////////////////////////// SET CONFIGURATIONS ///////////////////////////
///////////////////////////////////////////////////////////////////////////////
app.options('*', cors());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(function(req, res, next) {
	logger.info(' ##### New request for URL %s',req.originalUrl);
	return next();
});

//wrapper to handle errors thrown by async functions. We can catch all
//errors thrown by async functions in a single place, here in this function,
//rather than having a try-catch in every function below. The 'next' statement
//used here will invoke the error handler function - see the end of this script
const awaitHandler = (fn) => {
	return async (req, res, next) => {
		try {
			await fn(req, res, next)
		} 
		catch (err) {
			next(err)
		}
	}
}

///////////////////////////////////////////////////////////////////////////////
//////////////////////////////// START SERVER /////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
var server = http.createServer(app).listen(port, function() {});
logger.info('****************** SERVER STARTED ************************');
logger.info('***************  Listening on: http://%s:%s  ******************',host,port);
server.timeout = 240000;

function getErrorMessage(field) {
	var response = {
		success: false,
		message: field + ' field is missing or Invalid in the request'
	};
	return response;
}

///////////////////////////////////////////////////////////////////////////////
//////////////////////////////// START WEBSOCKET SERVER ///////////////////////
///////////////////////////////////////////////////////////////////////////////
const wss = new WebSocketServer.Server({ server });
wss.on('connection', function connection(ws) {
	logger.info('****************** WEBSOCKET SERVER - received connection ************************');
	ws.on('message', function incoming(message) {
		console.log('##### Websocket Server received message: %s', message);
	});

	ws.send('something');
});

///////////////////////////////////////////////////////////////////////////////
///////////////////////// REST ENDPOINTS START HERE ///////////////////////////
///////////////////////////////////////////////////////////////////////////////
// Health check - can be called by load balancer to check health of REST API
app.get('/health', awaitHandler(async (req, res) => {
	res.sendStatus(200);
}));

// Register and enroll user. A user must be registered and enrolled before any queries 
// or transactions can be invoked
app.post('/users', awaitHandler(async (req, res) => {
	logger.info('================ POST on Users');
	username = req.body.username;
	orgName = req.body.orgName;
	logger.info('##### End point : /users');
	logger.info('##### POST on Users- username : ' + username);
	logger.info('##### POST on Users - userorg  : ' + orgName);
	let response = await connection.getRegisteredUser(username, orgName, true);
	logger.info('##### POST on Users - returned from registering the username %s for organization %s', username, orgName);
    logger.info('##### POST on Users - getRegisteredUser response secret %s', response.secret);
    logger.info('##### POST on Users - getRegisteredUser response secret %s', response.message);
    if (response && typeof response !== 'string') {
        logger.info('##### POST on Users - Successfully registered the username %s for organization %s', username, orgName);
		logger.info('##### POST on Users - getRegisteredUser response %s', response);
		// Now that we have a username & org, we can start the block listener
		await blockListener.startBlockListener(channelName, username, orgName, wss);
		res.json(response);
	} else {
		logger.error('##### POST on Users - Failed to register the username %s for organization %s with::%s', username, orgName, response);
		res.json({success: false, message: response});
	}
}));


/************************************************************************************
 * Batch methods
 ************************************************************************************/

// GET Batch
app.get('/batch', awaitHandler(async (req, res) => {
	logger.info('================ GET on Batch');
	let args = {};
	let fcn = "queryAllBatch";


    logger.info('##### GET on Batch - username : ' + username);
	logger.info('##### GET on Batch - userOrg : ' + orgName);
	logger.info('##### GET on Batch - channelName : ' + channelName);
	logger.info('##### GET on Batch - chaincodeName : ' + chaincodeName);
	logger.info('##### GET on Batch - fcn : ' + fcn);
	logger.info('##### GET on Batch - args : ' + JSON.stringify(args));
	logger.info('##### GET on Batch - peers : ' + peers);

    let message = await query.queryChaincode(peers, channelName, chaincodeName, args, fcn, username, orgName);
 	res.send(message);
}));

// GET a specific Batch
app.get('/batch/:batchId', awaitHandler(async (req, res) => {
	logger.info('================ GET on Batch by ID');
	let args = req.params;
	let fcn = "queryBatch";

    logger.info('##### GET on Batch - username : ' + username);
	logger.info('##### GET on Batch - userOrg : ' + orgName);
	logger.info('##### GET on Batch - channelName : ' + channelName);
	logger.info('##### GET on Batch - chaincodeName : ' + chaincodeName);
	logger.info('##### GET on Batch - fcn : ' + fcn);
	logger.info('##### GET on Batch - args : ' + JSON.stringify(args));
	logger.info('##### GET on Batch - peers : ' + peers);

    let message = await query.queryChaincode(peers, channelName, chaincodeName, args, fcn, username, orgName);
 	res.send(message);
}));


// POST Batch
app.post('/batch', awaitHandler(async (req, res) => {
	logger.info('================ POST on Batch');
	var args = req.body;
	var fcn = "createBatch";

    logger.info('##### POST on Batch- username : ' + username);
	logger.info('##### POST on Batch - userOrg : ' + orgName);
	logger.info('##### POST on Batch- channelName : ' + channelName);
	logger.info('##### POST on Batch- chaincodeName : ' + chaincodeName);
	logger.info('##### POST on Batch- fcn : ' + fcn);
	logger.info('##### POST on Batch- args : ' + JSON.stringify(args));
	logger.info('##### POST on Batch - peers : ' + peers);

	let message = await invoke.invokeChaincode(peers, channelName, chaincodeName, args, fcn, username, orgName);
	res.send(message);
}));

/************************************************************************************
 * Order methods
 ************************************************************************************/

// GET Order
app.get('/order', awaitHandler(async (req, res) => {
	logger.info('================ GET on Donation');
	let args = {};
	let fcn = "queryAllOrder";

    logger.info('##### GET on OrderOrder - username : ' + username);
	logger.info('##### GET on Order - userOrg : ' + orgName);
	logger.info('##### GET on Order - channelName : ' + channelName);
	logger.info('##### GET on Order - chaincodeName : ' + chaincodeName);
	logger.info('##### GET on Order - fcn : ' + fcn);
	logger.info('##### GET on Order - args : ' + JSON.stringify(args));
	logger.info('##### GET on Order - peers : ' + peers);

    let message = await query.queryChaincode(peers, channelName, chaincodeName, args, fcn, username, orgName);
 	res.send(message);
}));

// GET a specific Order
app.get('/order/:orderId', awaitHandler(async (req, res) => {
	logger.info('================ GET on Order by ID');
	logger.info('Order ID : ' + req.params);
	let args = req.params;
	let fcn = "queryOrder";

    logger.info('##### GET on Order - username : ' + username);
	logger.info('##### GET on Order - userOrg : ' + orgName);
	logger.info('##### GET on Order - channelName : ' + channelName);
	logger.info('##### GET on Order - chaincodeName : ' + chaincodeName);
	logger.info('##### GET on Order - fcn : ' + fcn);
	logger.info('##### GET on Order - args : ' + JSON.stringify(args));
	logger.info('##### GET on Order - peers : ' + peers);

    let message = await query.queryChaincode(peers, channelName, chaincodeName, args, fcn, username, orgName);
 	res.send(message);
}));


// POST Order
app.post('/order', awaitHandler(async (req, res) => {
	logger.info('================ POST on OrderOrder');
	var args = req.body;
	var fcn = "createOrder";

    logger.info('##### POST on Order - username : ' + username);
	logger.info('##### POST on Order - userOrg : ' + orgName);
	logger.info('##### POST on Order - channelName : ' + channelName);
	logger.info('##### POST on Order - chaincodeName : ' + chaincodeName);
	logger.info('##### POST on Order - fcn : ' + fcn);
	logger.info('##### POST on Order - args : ' + JSON.stringify(args));
	logger.info('##### POST on Order - peers : ' + peers);

	let message = await invoke.invokeChaincode(peers, channelName, chaincodeName, args, fcn, username, orgName);
	res.send(message);
}));

/************************************************************************************
 * Blockchain metadata methods
 ************************************************************************************/

// GET details of a blockchain transaction using the record key (i.e. the key used to store the transaction
// in the world state)
app.get('/blockinfos/:docType/keys/:key', awaitHandler(async (req, res) => {
	logger.info('================ GET on blockinfo');
	logger.info('Key is : ' + req.params);
	let args = req.params;
	let fcn = "queryHistoryForKey";
	
	logger.info('##### GET on blockinfo - username : ' + username);
	logger.info('##### GET on blockinfo - userOrg : ' + orgName);
	logger.info('##### GET on blockinfo - channelName : ' + channelName);
	logger.info('##### GET on blockinfo - chaincodeName : ' + chaincodeName);
	logger.info('##### GET on blockinfo - fcn : ' + fcn);
	logger.info('##### GET on blockinfo - args : ' + JSON.stringify(args));
	logger.info('##### GET on blockinfo - peers : ' + peers);

	let history = await query.queryChaincode(peers, channelName, chaincodeName, args, fcn, username, orgName);
	logger.info('##### GET on blockinfo - queryHistoryForKey : ' + util.inspect(history));
	res.send(history);
}));



/************************************************************************************
 * Error handler
 ************************************************************************************/

app.use(function(error, req, res, next) {
	res.status(500).json({ error: error.toString() });
});

