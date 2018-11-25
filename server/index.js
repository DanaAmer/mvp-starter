var express = require('express');
var bodyParser = require('body-parser');
var db = require('../database-mongo');
var app = express();

// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
// var items = require('../database-mongo');

app.use(express.static(__dirname + '/../react-client/dist'));

app.use(bodyParser.json());

var urlencodedParser = bodyParser.urlencoded({ extended: false })


app.post('/addtodo', function (req, res) {
  var todos = req.body.todos
  console.log('todos', req)
  db.save(todos);
  res.send('POST request to the homepage')
})


app.get('/gettodo', function (req, res) {
  db.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Server listening on port 3000!');
});
