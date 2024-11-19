const express = require('express');
const {RPCServer, RPCClient} = require('ocpp-rpc');
const { CentralSystem } = require('ocpp-rpc');
const router = express.Router();


const rpcServer = new RPCServer();
// httpServer.on('upgrade', rpcServer.handleUpgrade);
// Initialize OCPP CentralSystem
const centralSystem = new CentralSystem();
