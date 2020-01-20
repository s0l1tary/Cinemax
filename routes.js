/*
(get)/=main page
(get)/Movie=movie page
(get)/Cinema=cinema page
(get)/Snack=snack page
(get)/Login=login page
(get)/Register=register page
(get)/Profile=profile page
(get)/Promotion=promotion page
(get)/About=about page
(get)/Booking=booking page
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
    
    router.get('/resources/*', function(req, res)  {
        res.sendFile(__dirname+req.originalUrl);
    });

    router.get('/',function(req,res){
        res.sendFile(__dirname+"/views/index.html");
    });

    router.get('/Cinema',function(req,res){
        res.sendFile(__dirname+"/views/cinemas.html");
    });

    router.get('/Snack',function(req,res){
        res.sendFile(__dirname+"/views/snacks.html");
    });

    router.get('/Login',function(req,res){
        res.sendFile(__dirname+"/views/login.html");
    });

    router.get('/Register',function(req,res){
        res.sendFile(__dirname+"/views/register.html");
    });

    router.get('/Profile',function(req,res){
        res.sendFile(__dirname+"/views/profile.html");
    });

    router.get('/Promotion',function(req,res){
        res.sendFile(__dirname+"/views/promotions.html");
    });

    router.get('/About',function(req,res){
        res.sendFile(__dirname+"/views/about.html");
    });

    router.get('/Booking',function(req,res){
        res.sendFile(__dirname+"/views/booking.html");
    });

    router.get('/Movie',function(req,res){
        res.sendFile(__dirname+"/views/movies.html")
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

    router.get('/api/movies',function(req,res){

    })

    router.get('/api/movie/:id',function(req,res){
        
    })

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
