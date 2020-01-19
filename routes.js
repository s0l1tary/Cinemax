/*
(get)/api/bookings=get all bookings
(post)/api/bookings(userID,cinemaID,showingID,snackID)=add new booking
(post)/api/register(firstName,lastName,gender,dateOBirth,contactNumber,email,password)=add new user
(post)/api/login=login user
*/
var bodyParser = require('body-parser');
var db = require('./js/server/dataservice.js');

db.connect();

var routes = function () {
    var router = require('express').Router();

    router.use(bodyParser.urlencoded({
        extended: true
    }));

    router.get('/css/*', function(req, res)  {
        res.sendFile(__dirname+ req.originalUrl);
    });
    
    router.get('/js/*', function(req, res)  {
        res.sendFile(__dirname+req.originalUrl);
    });

    router.get('/',function(req,res){
        res.sendFile(__dirname+"/views/movies");
    });

    router.get('/api/bookings', function (req, res) {
        db.getFlights(function(err,flights){
            if(err){
                res.status(500).send("Unable to get all bookings");
            }else{
                res.status(200).send(flights);
            }
        })
    });

    router.post('/api/bookings', function (req, res) {
        var data=req.body;
        db.addBooking(data.userID,data.cinemaID,data.showingID,data.snackID,function(err,booking){
            if(err){
                res.status(500).send("Unable to add a new booking");
            }
            else{
                res.status(200).send(booking);
            }
        })
    });



    router.post('/api/register',function(req,res){
        var data=req.body;
        db.addUser(data.firstName,data.lastName,data.gender,data.dateOfBirth,data.contactNumber,data.email,data.password,function(err,user){
            if(err){
                res.status(500).send("Unable to add a new user");
            }else{
                res.status(200).send(user)
            }
        })
    });

    router.post('/api/login',function(req,res){
        var data=req.body;
        db.login(data.email,data.password,function(err,user){
            if(err){
                res.status(401).send("Login fail. Please try again later");
            }else{
                if(user==undefined||user==null){
                    res.status(401).send("Login fail. Please try again later");
                }else{
                    res.status(200).send(user._id);
                }
            }
        })
    });

    return router;
};

module.exports = routes();
