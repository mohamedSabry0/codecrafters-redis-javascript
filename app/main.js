const net = require("net");

// console.log("Logs from your program will appear here!");


const server = net.createServer((connection) => {
  // Handle connection
  console.log('client connected');
  
  connection.on('end', () => {
    console.log('client disconnected');
  });

  connection.on('data', (data) =>{
    console.log(data);

    data = data.toString();
    // if(data.includes('ping')){
    //   console.log(connection.write(`+${"PONG"}\r\n`));
    // }

    if(data[0] == '*'){
      let arr = data.split('\r\n').filter(str => /(^[^\$|\*|\:|\+| |echo].*)/.test(str));
      let command = arr.shift();
      if(command == 'echo'){
        let str = arr.join(' ');
        console.log(str);
        connection.write(str);
        
      }else if(command == 'ping'){
        connection.write(`+${"PONG"}\r\n`)
      }
      console.log(arr);
    }
    
  })

  // when using pipe it sent +PONG\r\n*1\r\n$4\r\np
  // connection.pipe(connection);
});

server.on('error', (err) => {
  throw err;
});

server.listen(6379, "127.0.0.1");
