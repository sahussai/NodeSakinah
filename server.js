const express = require('express');
const app = express();
const mongodb = require('mongodb');

const config = require('./config/database');
const PORT = 4000;
const client = mongodb.MongoClient;

client.connect(config.DB, function(err, db) {
    if(err) {
        console.log('database is not connected')
    }
    else {
        console.log('connected!!')
    }
});
/*
app.get('/', function(req, res) {
    res.json({"hello": "world"});
});

app.listen(PORT, function(){
    console.log('Your node js server is running on PORT:',PORT);
});
*/

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


app.get('/edit',function(req,res){
  res.sendFile(__dirname + '/views/edit.html');
});

app.post('/enter', function(req,res){
  //res.json({nameeq : `${req.body.data}`,
   //         redirect: "/edit"});
  //res.contentType('json');
  //res.send({ some: JSON.stringify({name:'json'}) });
  console.log(`${req.body.data}`);
  //res.redirect('/');
  //res.json({"nameeq" : `${req.body.data}`});
});


// listen for requests :)
const listener = app.listen(PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
