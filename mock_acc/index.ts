import { createSocket } from 'dgram';
const binutils = require("binutils");

const PORT = 9000;


// creating a udp server
var server = createSocket('udp4');

// emits when any error occurs
server.on('error',function(error){
  console.log('Error: ' + error);
  server.close();
});

// emits on new datagram msg
server.on('message', function(msg, info) {
    console.log('Data received from client : ' + msg.toString());
    console.log('Received %d bytes from %s:%d\n',msg.length, info.address, info.port);

    //sending msg
    server.send(msg, info.port, 'localhost', function(error){
        if(error){
            console.log("There was an error");
        }else{
            console.log('Data sent !!!');
        }
    });

    const carData = getCarData();
    server.send(carData, 0, carData.length, info.port, 'localhost', function(error){
        if(error){
            console.log("There was an error");
        }else{
            console.log('Data sent !!!');
        }
    });
});

//emits when socket is ready and listening for datagram msgs
server.on('listening',function(){
  var address = server.address();
  var port = address.port;
  var family = address.family;
  var ipaddr = address.address;
  console.log('Server is listening at port' + port);
  console.log('Server ip :' + ipaddr);
  console.log('Server is IP4/IP6 : ' + family);
});

//emits after the socket is closed using socket.close();
server.on('close',function(){
  console.log('Socket is closed !');
});

server.bind(PORT);

setTimeout(function(){
    server.close();
},120000);

function getCarData(): Buffer {

    const writer = new binutils.BinaryWriter('little');
    // Real time car update
    writer.WriteBytes([3]);
    // Car index
    writer.WriteUInt16(1);
    // Driver Index
    writer.WriteUInt16(1);
    // Gear
    writer.WriteBytes([6]);
    // pos x
    writer.WriteFloat(1.123);
    // pos y
    writer.WriteFloat(4.456);
    // yaw
    writer.WriteFloat(7.789);
    // car location
    writer.WriteBytes([1]);
    // KMH
    writer.WriteUInt16(88);
    // position
    writer.WriteUInt16(1);
    // cup position
    writer.WriteUInt16(1);
    // track position
    writer.WriteUInt16(1);
    // spline position
    writer.WriteFloat(1.123);
    // laps
    writer.WriteUInt16(1);
    // delta
    writer.WriteUInt32(1);

    return writer.ByteBuffer;
}