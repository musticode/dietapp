const { RPCServer, createRPCError } = require('ocpp-rpc');

const server = new RPCServer({
    protocols: ['ocpp1.6'], // server accepts ocpp1.6 subprotocol
    strictMode: true,       // enable strict validation of requests & responses
});


server.auth((accept, reject, handshake) => {
   accept({
     sessionId : 'sessionId1'
   });
});

server.on('client', async (client) => {

    console.log(`${client.session.sessionId} connected`); // sessionId1


    client.handle('BootNotification', ({params}) => {
        console.log(`Server got BootNotification from ${client.identity} : `, params);

        return {
            status : "Accepted",
            interval : 300,
            currentTime : new Date().toISOString()
        }
    });


    // create a specific handler for handling Heartbeat requests
    client.handle('Heartbeat', ({params}) => {
        console.log(`Server got Heartbeat from ${client.identity}:`, params);

        // respond with the server's current time.
        return {
            currentTime: new Date().toISOString()
        };
    });


    // create a specific handler for handling StatusNotification requests
    client.handle('StatusNotification', ({params}) => {
        console.log(`Server got StatusNotification from ${client.identity}:`, params);
        return {};
    });

    // create a wildcard handler to handle any RPC method
    client.handle(({method, params}) => {
        // This handler will be called if the incoming method cannot be handled elsewhere.
        console.log(`Server got ${method} from ${client.identity}:`, params);

        // throw an RPC error to inform the server that we don't understand the request.
        throw createRPCError("NotImplemented");
    });


});