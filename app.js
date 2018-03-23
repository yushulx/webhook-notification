const notifier = require('node-notifier');
var express = require('express');
var app = express();

app.use(express.static(__dirname));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, content-type");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/notify', (req, res) => {
  console.log(req.headers);
    // Object
  notifier.notify({
    title: 'My notification',
    message: 'Hello, there!'
  });

  res.send('Received the notification')
});

app.post('/postreceive', (req, res) => {
  let event = req.header('x-github-event');
  console.log(event + ' event');
    // Object
  notifier.notify({
    title: 'GitHub',
    message: event + ' event'
  });

  res.send('Received the notification')
});

app.listen(2018, () => console.log('Example app listening on port 2018!'));

