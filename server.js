const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
var quotes = require('./api/quotes.js').quotes;

//serve static from React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.json());

// get number of paragraphs from input
// app.post("/", function(req, res) {
//   const numParagraphs = req.body.paragraphs;
//   console.log(numParagraphs);
// });

//list of items
app.get('/api/getList', (req, res) => {
  res.json(paragraph());
  console.log('List sent!');
});

//generate random quote for list of quotes
function randomQuote () {
  let sentence = quotes[Math.floor(Math.random() * quotes.length)]
  return sentence  + ' ';
};

//5 random sentences to create a paragraph
function paragraph () {
  let paragraph = "";
  for(let i = 0; i < 6; i++) {
    paragraph = paragraph + randomQuote();
  }
  return paragraph;
}

// function loremIpsum () {
//   let loremIpsum = "";
//   for(let i = 0; i < 2; i++) {
//   loremIpsum = loremIpsum + "<br/>" + paragraph();
//   }
//   return loremIpsum;
// }
// console.log(loremIpsum())

//handles request that don't match the one above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
