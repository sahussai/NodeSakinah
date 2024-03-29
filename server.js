const express = require('express');
const app = express();
const mongodb = require('mongodb');
const mongoose = require('mongoose');

const familyRouter = require("./routes/familyRouter");
const Families = require('./models/families');

const config = require('./config/database');
const PORT = 4000;
///const client = mongodb.MongoClient;

const connect = mongoose.connect(config.DB);



function auth (req, res, next) {
  //console.log(req.headers);
  var authHeader = req.headers.authorization;
  if (!authHeader) {
      var err = new Error('You are not authenticated!');
      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      next(err);
      return;
  }

  var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
  var user = auth[0];
  var pass = auth[1];
  if (user == 'admin' && pass == 'password') {
      next(); // authorized
  } else {
      var err = new Error('You are not authenticated!');
      res.setHeader('WWW-Authenticate', 'Basic');      
      err.status = 401;
      next(err);
  }
}

app.use(auth);




app.use("/families", familyRouter);

// client.connect(config.DB, function(err, db) {
//     if(err) {
//         console.log('database is not connected')
//     }
//     else {
//         console.log('Connection to database was successful!!')
//     }
// });








connect.then((db) => {
    console.log('Connected to Db using mongoose!');

}).
catch((err)=>{
  console.log("There was an error connecting to mongodb");
  console.log(err);
});



app.get('/',function(req,res){
  res.sendFile(__dirname + '/views/landingPage.html');
});

app.get('/register',function(req,res){
    res.sendFile(__dirname + '/views/register.html');
  });

app.get('/viewFamilies',function(req,res){
    res.sendFile(__dirname + '/views/viewFamilies.html');
  });
  

// listen for requests :)
const listener = app.listen(PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});





















    // var newFamily = Families({
    //     fID: 5673,
    //     paymentType: "Cash",
    //     children: [{
    //         fID: 5673,
    //         firstName: "TestName",
    //         lastName: "TestLastName",
    //         grade: 5
    //     }],
    //     motherFirstName: "Test Mother First",
    //     motherLastName: "Test Mother Last",
    //     fatherFirstName: "Test Father",
    //     fatherLastName: "Test Father Last",
    //     email: "something@email.com",
    //     phoneNumber: "7806651751",
    //     payments: {
    //         fID: 5673,
    //         September: 200,
    //         October: 100,
    //         November: 100,
    //         December: 100,
    //         January: 100,
    //         February: 100,
    //         March: 100,
    //         April: 100,
    //         May: 100
    //     }
    // });