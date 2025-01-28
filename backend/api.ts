const constants = require('./constants');
// TODO: Typings don't exist for this. Look to remove in future
const binutils = require('binutils');
const utf8 = require('utf8-bytes');

export const api = {

    readString: (reader: any) => {
        const length = reader.ReadUInt16();
        const bytes = reader.ReadBytes(length);
        return bytes.toString('utf8');
    },

    requestConnection: (displayName: string, connectionPassword: string, commandPassword: string) => {
        const displayNameArray = utf8(displayName);
        const connectionPasswordArray = utf8(connectionPassword);
        const commandPasswordArray = utf8(commandPassword);
        const updateInterval = 250;

        const writer = new binutils.BinaryWriter('little');
        writer.WriteBytes([constants.outboundMessageTypes.REGISTER_COMMAND_APPLICATION]);
        writer.WriteBytes([constants.broadcastingNetworkProtocol.BROADCASTING_PROTOCOL_VERSION]);
        writer.WriteUInt16(displayNameArray.length);
        writer.WriteBytes(displayNameArray);
        writer.WriteUInt16(connectionPasswordArray.length);
        writer.WriteBytes(connectionPasswordArray);
        writer.WriteUInt32(updateInterval);
        writer.WriteUInt16(commandPasswordArray.length);
        writer.WriteBytes(commandPasswordArray);

        return writer.ByteBuffer;
    },

};
