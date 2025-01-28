// TODO: Typings don't exist for this. Look to remove in future
const binutils = require('binutils'); 
import { api } from './api'
import { constants } from './constants'

export const accMessageParser = (message: Buffer) => {

    // console.log(`raw message: ${message}`);
    const reader = new binutils.BinaryReader(message, 'little');
    
    const messageType = reader.ReadUInt8();
    switch(messageType) {
        case constants.InboundMessageTypes.REGISTRATION_RESULT: {
            console.log('REGISTRATION_RESULT');
            const connectionId = reader.ReadInt32();
            const connectionSuccess = reader.ReadBytes(1).readUInt8(0) > 0;
            const isReadonly = reader.ReadBytes(1).readUInt8(0) === 0;
            const errMsg = api.readString(reader);

            console.log({connectionId, connectionSuccess, isReadonly, errMsg});

            break;
        }
        case constants.InboundMessageTypes.REALTIME_UPDATE: {
            // console.log('REALTIME_UPDATE');
            break;
        }
        case constants.InboundMessageTypes.REALTIME_CAR_UPDATE: {
            console.log('REALTIME_CAR_UPDATE');
            const carIndex = reader.ReadUInt16();
            const driverIndex = reader.ReadUInt16();
            const driverCount = reader.ReadBytes(1).readUint8(0);
            const gear = reader.ReadBytes(1).readUInt8(0) - 1;
            const worldPosX = reader.ReadFloat();
            const worldPosY = reader.ReadFloat();
            const yaw = reader.ReadFloat();
            const carLocation = reader.ReadBytes(1).readUInt8(0);
            const kmh = reader.ReadUInt16();
            const position = reader.ReadUInt16();
            const cupPosition = reader.ReadUInt16();
            const trackPosition = reader.ReadUInt16();
            const splinePosition = reader.ReadFloat();
            const laps = reader.ReadUInt16();
            const delta = reader.ReadUInt32();

            //TODO read laps
            // carUpdate.BestSessionLap = ReadLap(br);
            // carUpdate.LastLap = ReadLap(br);
            // carUpdate.CurrentLap = ReadLap(br);

            console.log({carIndex, driverIndex, gear, kmh, laps, delta});

            break;
        }
        default: {
            // console.log('response message type not recognized', messageType);
        }
    }
};