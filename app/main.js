const net = require("net");

// console.log("Logs from your program will appear here!");


const server = net.createServer((connection) => {
  // Handle connection
  console.log('client connected');
  
  connection.on('end', () => {
    console.log('client disconnected');
  });
  
  connection.on('data', (data) =>{
    console.log(connection.write(`+${"PONG"}\r\n`));
    
  })

  // when using pipe it sent +PONG\r\n*1\r\n$4\r\np
  // connection.pipe(connection);
});

server.on('error', (err) => {
  throw err;
});

server.listen(6379, "127.0.0.1");
