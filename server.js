var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(require('./middleware/headers'));
app.use(require('./middleware/validate-session'));

app.use('/api/users', require('./routes/users'));
app.use('/api/login', require('./routes/sessions'));

app.listen(3000, function() {
    console.log('app is listening on port 3000');
});