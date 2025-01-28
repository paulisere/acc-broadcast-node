import { createSocket } from 'dgram';
import { api } from './api'
import { accMessageParser } from './acc-message-parser';
import 'dotenv/config'

const PORT = parseInt(process.env.ACC_PORT ?? "0");
const LOCAL_PORT = parseInt(process.env.LOCAL_PORT ?? "0");
const HOST = process.env.ACC_HOST;
const DISPLAY_NAME = process.env.DISPLAY_NAME ?? "DisplayName";
const CONNECTION_PASSWORD = process.env.CONNECTION_PASSWORD ?? "ConnectionPassword";
const COMMAND_PASSWORD = process.env.COMMAND_PASSWORD ?? "CommandPassword";

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
