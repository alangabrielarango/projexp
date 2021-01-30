//importing app with all the requires and routes
const app = require('./app');
const http = require('http');
const { debug } = require('console');

//normalizing port
const normalizePort = val => {
  var port = parseInt(val, 10);

  //checking endpoint
  if(isNaN(port)){
    //named pipe (logical connection)
    return val;
  }

  if(port>=0){
    //port number
    return port;
  }
  return false;
};

//error event
const onError = error => {
  if (error.syscall !== "listen"){
    throw error;
  }
  //getting addr or port
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  //describing type of error
  switch (error.code){
    case "EACCESS" :
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE" :
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

//listening event
const onListening = () => {
  //server addr or port
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  debug("Listening on " + bind);
};

//normalazing port with env var
const port = normalizePort(process.env.PORT || "3000");

//settign port
app.set('port', port);

//creating server with two events, error and listening
const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);
