//Express e Socket IO config
const express = require('express')
const webApp = express()
const webServer = require('http').createServer(webApp)
const io = require('socket.io')(webServer)


//Print server working 
webServer.listen(3000, function () {
  console.log('> Server Working...')
});

