var db = require('mongoose');

db.connect('mongodb://test:tester1@localhost:27017/workouts');

module.exports = db;