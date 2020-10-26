var express = require('express');
var session = require("express-session");
var path = require('path');
var cors = require('cors');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var mysql = require('mysql');
var routes = require('./routes/index');
var users = require('./routes/users');
var testServer = require('./routes/testserver');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({ origin: true, credentials: true }));
app.use(express.json())
app.use(
    session({
      secret: "keyboard cat",
      cookie: { path: "/", httpOnly: true, secure: false, maxAge: null },
      //rolling:true,
      saveUninitialized:true,
      resave:false,
    })
  );

//app.use('/', routes);
app.use('/users', users);
app.use('/testserver', testServer)

//DB connection
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "#Rutuja3011",
    database: "Amalgamet",
});

//Request handler
/*app.get('/api/get', (req,res)=>{
    const sqlSelect = "Select * from user";
    db.query(sqlSelect,(err, result)=>{
        console.log(result);
    });
});*/

//check login status
app.get("/api/login-status", (req, res) => {
    console.log(req.sessionID);
    console.log("Session:->"+req.session.user_id);
    if (req.session.user_id) {
      res.json({
        status: true,
        user_id: req.session.user_id,
      });
    } else {
      res.json({ status: false, user_id: undefined });
    }
  });

//user login
app.post("/api/login", (req, res) => {
    var data = req.body;
    console.log(data);
    const sqlSelect = "Select * from user where id='"+req.body.user_id+"' and password = '"+req.body.password+"'";
    db.query(sqlSelect,(err, result)=>{
        if (err) {
            console.log(err);
            res.send({ status: false, msg: "unsuccessful", user_id: undefined });
        }
        else{
          if(result.length > 0){
            console.log(result[0]['id']);
            req.session.user_id = result[0]['id'];
            console.log(req.session.user_id);
            res.send({
                status: true,
                msg: "successful",
                user_id: req.session.user_id,
            });
          }
        }
    });
  });

//user logout
app.get("/api/logout", (req, res) => {
      res.json({ status: true });    
});

app.get("/api/getUserInfo", (req,res)=>{
  console.log("++---"+req.query.id);
  const id=req.query.id;
  sqlSelect="select *from user where id='"+id+"'";
  db.query(sqlSelect,(err,result)=>{
    if (err) {
        console.log(err);
        res.send(null);
    }
    else{
      if(result.length > 0){
        console.log("-----"+result[0]['id']);
        res.send(result);
      }
    }
  });
});

app.get("/api/get-followers", (req,res)=>{
  console.log("followers---"+req.query.id);
  const id=req.query.id;
  sqlSelect="select * from followers where user_id='"+id+"'";
  db.query(sqlSelect,(err,result)=>{
    if (err) {
        console.log(err);
        res.send(null);
    }
    else{
      if(result.length > 0){
        console.log("-----"+result[0]['user_id']);
        res.send(result);
      }
    }
  });
});


app.get("/api/search-user", (req,res)=>{
  let data = []
  console.log("search-user1---"+req.query.id);
  console.log("search-user2---"+req.query.follower_id);
  const id=req.query.id;
  const follower_id = req.query.follower_id;
  sqlSelect1="select *from user where id='"+id+"' ";
  sqlSelect2="select *from user where id='"+id+"' and id NOT IN (select user_id from followers where user_id='"+id+"' and follower_id='"+follower_id+"')";
  db.query(sqlSelect1,(err,result)=>{
    if (err) {
        console.log(err);
        res.send(null);
    }
    else{
      if(result.length > 0){
        db.query(sqlSelect2,(err,result1)=>{
          if (err) {
              console.log(err);
              res.send(null);
          }
          else{
            if(result1.length > 0){
              console.log("--true follow---"+result[0]['id']);
              res.send({
                result: result,
                follow: true,
              });
            }
            else{
              console.log("--false follow---"+result[0]['id']);
              res.send({
                result: result,
                follow: false,
              });
            }
          }
      });
    }
  }
  });
});

app.post("/api/insert_note", (req,res)=>{
  console.log("Inside insert note-----"+req.query.id);
  const user_id = req.query.id;
  const title = req.body.title;
  const date = req.body.date;
  const data = req.body.data;
  const privacy = req.body.privacy;
  console.log(user_id+" "+title)
  const sqlInsert = "insert into notes (user_id,title,date,data,privacy) values (?,?,?,?,?)";
  db.query(sqlInsert, [user_id,title,date,data,privacy], (err,result)=>{
      if (err) {
          console.error('error connecting: ' + err.stack);
          return;
        }
        console.log(result);
      res.send("Data Inserted");
  });
});

app.post("/api/change_settings", (req,res)=>{
  console.log("Inside insert note-----"+req.query.id);
  const user_id = req.query.id;
  const acc_privacy = req.body.acc_privacy;
  const follow_enable = req.body.follow_enable;

  console.log(user_id+" "+acc_privacy)
  const sqlInsert = "update settings set account='"+acc_privacy+"', follow_enable='"+follow_enable+"' where user_id='"+user_id+"'";
  db.query(sqlInsert, (err,result)=>{
      if (err) {
          console.error('error connecting: ' + err.stack);
          return;
        }
        console.log("Settings changed--"+result);
  });
});



app.post("/api/insert_research", (req,res)=>{
  console.log("Inside insert research-----"+req.query.id);
  const user_id = req.query.id;
  const topic = req.body.topic;
  const date = req.body.date;
  const data = req.body.data;
  const privacy = req.body.privacy;
  const image = req.body.image;
  console.log(user_id+" "+topic)
  const sqlInsert = "insert into research (user_id,topic,date,data,img,privacy) values (?,?,?,?,?,?)";
  db.query(sqlInsert, [user_id,topic,date,data,image,privacy], (err,result)=>{
      if (err) {
          console.error('error connecting: ' + err.stack);
          return;
        }
        console.log(result);
        db.query(sqlInsert2, [user_id], (err,result)=>{
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
              }
              console.log(result);
            res.send("Data Inserted");
        });
      res.send("Data Inserted");
  });
});

app.post("/api/add_diary", (req,res)=>{
  console.log("Inside insert diary-----"+req.query.id);
  const user_id = req.query.id;
  const title = req.body.title;
  const date = req.body.date;
  const data = req.body.data;
  console.log(user_id+" "+title)
  const sqlInsert = "insert into diary (user_id,title,date,data) values (?,?,?,?)";
  db.query(sqlInsert, [user_id,title,date,data], (err,result)=>{
      if (err) {
          console.error('error connecting: ' + err.stack);
          return;
        }
        console.log(result);
      res.send("Data Inserted");
  });
});


app.post("/api/follow_user", (req,res)=>{
  console.log("Inside follower-----"+req.query.user_id+"->"+req.query.follower_id);
  const user_id = req.query.user_id;
  const follower_id = req.query.follower_id;
  const accept_req = false;
  console.log(user_id+" "+follower_id)
  const sqlInsert = "insert into followers (user_id,follower_id,accept_req) values (?,?,?)";
  db.query(sqlInsert, [user_id,follower_id,accept_req], (err,result)=>{
      if (err) {
          console.error('error connecting: ' + err.stack);
          return;
        }
        console.log(result);
      res.send("Data Inserted");
  });
});

app.post("/api/insert", (req,res)=>{
    const id = req.body.id;
    const password = req.body.password;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const contact_no = req.body.contact_no;
    const dob = req.body.dob;
    const interest = req.body.interest;
    const education = req.body.education;
    const email = req.body.email;
    console.log(id+" "+fname)
    const sqlInsert = "insert into user (id,password,fname,lname,contact_no,dob,interest,education,email) values (?,?,?,?,?,?,?,?,?)";
    const sqlInsert2 = "insert into settings (user_id) values (?)";
    db.query(sqlInsert, [id,password,fname,lname,contact_no,dob,interest,education,email], (err,result)=>{
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
          }
          console.log(result);
          db.query(sqlInsert2, [id], (err,result)=>{
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
              }
              console.log(result);
            console.log("Data Inserted");
        });
        res.send("Data Inserted");
    });
    //res.send("Hello Amalgamet");
});




/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
