var userName = "postgres";
var pasword = "postgres";
var dbServerLocation = "localhost";
var serverPort = "5432";
var dbName = "testdb";

var str = `postgres://${userName}:${pasword}@${dbServerLocation}:${serverPort}/${dbName}`;

module.exports = {
    str
  };