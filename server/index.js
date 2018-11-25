var express = require('express');
var bodyParser = require('body-parser');
var db = require('../database-mongo');
var app = express();

// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
// var items = require('../database-mongo');

app.use(express.static(__dirname + '/../react-client/dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/addtodo', function (req, res) {
  var todos = req.body.title
  db.save(todos, function(text)  {
    res.send(text + " from server")
  }) 
})

var randomCallback = function (err, data) {
  res.send(data);
}

app.get('/addtodo', function (req, res) {
  db.selectAll(randomCallback);
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Server listening on port 3000!');
});
