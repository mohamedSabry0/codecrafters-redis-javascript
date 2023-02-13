const net = require("net");

// console.log("Logs from your program will appear here!");


const server = net.createServer((connection) => {
  // Handle connection
  let dataStore = {};
  console.log('client connected');
  
  connection.on('end', () => {
    console.log('client disconnected');
  });

  connection.on('data', (data) =>{
    
    data = data.toString();
    console.log(data);
    // if(data.includes('ping')){
    //   console.log(connection.write(`+${"PONG"}\r\n`));
    // }

    if(data[0] == '*'){
      let arr = data.split('\r\n').filter(str => /(^[^\$|\*|\:|\+| ].*)/.test(str));
      let command = arr.shift();
      if(command == 'echo'){
        arr = arr.map(str => `$${str.length}\r\n${str}\r\n`);
        let str = `${arr.join('')}`;
        console.log(str);
        connection.write(str);
        
      }else if(command == 'ping'){
        connection.write(`+${"PONG"}\r\n`)
      }
      
      else if(command == 'get'){
        if(dataStore[arr[0]]){
          let val = dataStore[arr[0]];
          if(typeof val == 'string'){
            connection.write(`$${val.length}\r\n${val}\r\n`)
          }else{
            connection.write(`-WRONGTYPE Operation against a key holding the wrong kind of value`)
          }
        }else{
          connection.write(`$3\r\nnil\r\n`)
        }
      }

      else if(command == 'set'){
        dataStore[arr[0]] = arr[1];
        if(dataStore[arr[0]]){connection.write(`$2\r\nok\r\n`);}
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
