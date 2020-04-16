const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
var words = require('./api/generator ').words;

console.log(words);
//serve static from React app
app.use(express.static(path.join(__dirname, 'client/build')));

//list of items
app.get('/api/getList', (req, res) => {
  var list = ["item1", "item2"];
  res.json(list);
  console.log('List sent!');
});

//handles request that don't match the one above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

// io.on('connection', socket => {
//   console.log("New client connected!");
//   socket.on("list updated")
//   });
// server.listen(3000);

console.log('App is listening on port ' + port);
