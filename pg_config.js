var userName = "opoo";
var pasword = "itcourse";
var dbServerLocation = "localhost";
var serverPort = "5432";
var dbName = "webui";

var str = `postgres://${userName}:${pasword}@${dbServerLocation}:${serverPort}/${dbName}`;

module.exports = {
    str
  };