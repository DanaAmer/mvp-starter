var mongoose = require('mongoose');
mongoose.connect('mongodb://dana:dana123@ds115854.mlab.com:15854/dana');

var db = mongoose.connection;

var TodoSchema = mongoose.Schema({
  title: String,
  created: Date
});

var Todo = mongoose.model('Todo', TodoSchema);

var save = (data, cb) => {
  let todo = new Todo({title: data});
  todo.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully saved!");
      cb("Successfully saved! Dana happy")
    }
  });
}
////////////////////////////
db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var selectAll = function(callback) {
  Todo.find({}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

module.exports.selectAll = selectAll;
module.exports.save = save;

