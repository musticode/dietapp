const express = require('express');
const {RPCServer, RPCClient} = require('ocpp-rpc');
const { CentralSystem } = require('ocpp-rpc');
const router = express.Router();


const rpcServer = new RPCServer();
// httpServer.on('upgrade', rpcServer.handleUpgrade);
// Initialize OCPP CentralSystem
const centralSystem = new CentralSystem();

/*
server.on('upgrade', (request, socket, head) => {
    centralSystem.handleUpgrade(request, socket, head);
});
 */


rpcServer.on('client', client => {
    // RPC client connected
    client.call('Say', `Hello, ${client.identity}!`);
});

const cli = new RPCClient({
    endpoint: 'ws://localhost:3000',
    identity: 'XYZ123'
});

cli.handle('Say', ({params}) => {
    console.log('Server said:', params);
});

await cli.connect();



/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});



module.exports = router;
