import { createSocket } from 'dgram';
import { api } from './api'
import { accMessageParser } from './acc-message-parser';

const PORT = 9000;
const LOCAL_PORT = 9001;
const HOST = '192.168.178.24';
// const HOST = '127.0.0.1';
const DISPLAY_NAME = 'your';
const CONNECTION_PASSWORD = 'asd';
const COMMAND_PASSWORD = '';

const acc = createSocket('udp4');
acc.bind(LOCAL_PORT);

acc.on('message', accMessageParser);

acc.on('listening', () => {
    const address = acc.address();
    console.log(`server listening ${address.address}:${address.port}`);
});


function handleError(err: Error | null) {
    if (err) {
        console.log('ERROR');
        console.log(err);
    }
}

const requestConnection = api.requestConnection(DISPLAY_NAME, CONNECTION_PASSWORD, COMMAND_PASSWORD);
acc.send(requestConnection, 0, requestConnection.length, PORT, HOST, handleError);
