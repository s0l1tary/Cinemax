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
(post)/api/booking=create booking
(get)/api/bookings/:userId=booking for a specific user
(get)/api/showing/:id=Find showing by id
(get)/api/showDates/:showings=Find unique dates for an array of showing ID(delete soon)
(get)/api/showings/:movieId=Find showings by a specific movie and shows cinema associated
(get)/api/cinemas/=Find all cinemas
(get)/api/movies/topRated/:page=get all top rated movies on page number
(get)/api/movies/nowShowing/:page=get all top rated movies on page number
(get)/api/movie/:id=get one particular movie
(post)/api/bookings(userID,cinemaID,showingID,snackID)=add new booking
(post)/api/register(firstName,lastName,gender,dateOBirth,contactNumber,email,password)=add new user
(post)/api/login=login user
(delete)/api/booking/:id=delete one booking
*/
var bodyParser = require('body-parser');
var db = require('./js/server/dataservice.js');

db.connect();

var routes = function () {
    var router = require('express').Router();

    router.use(bodyParser.urlencoded({
        extended: true
    }));

    router.get('/css/*', function (req, res) {
        res.sendFile(__dirname + req.originalUrl);
    });

    router.get('/js/*', function (req, res) {
        res.sendFile(__dirname + req.originalUrl);
    });

    router.get('/resources/*', function (req, res) {
        res.sendFile(__dirname + req.originalUrl);
    });

    router.get('/', function (req, res) {
        res.sendFile(__dirname + "/views/index.html");
    });

    router.get('/Cinema', function (req, res) {
        res.sendFile(__dirname + "/views/cinemas.html");
    });

    router.get('/Snack', function (req, res) {
        res.sendFile(__dirname + "/views/snacks.html");
    });

    router.get('/Login', function (req, res) {
        res.sendFile(__dirname + "/views/login.html");
    });

    router.get('/Register', function (req, res) {
        res.sendFile(__dirname + "/views/register.html");
    });

    router.get('/Profile', function (req, res) {
        res.sendFile(__dirname + "/views/profile.html");
    });

    router.get('/Promotion', function (req, res) {
        res.sendFile(__dirname + "/views/promotions.html");
    });

    router.get('/About', function (req, res) {
        res.sendFile(__dirname + "/views/about.html");
    });

    router.get('/Booking', function (req, res) {
        res.sendFile(__dirname + "/views/booking.html");
    });

    router.get('/Movie', function (req, res) {
        res.sendFile(__dirname + "/views/movie.html")
    });
    router.get('/confirmBooking',function(req,res){
        res.sendFile(__dirname+"/views/confirm.html")
    })

    router.post('/api/booking',function(req,res){
        var data=req.body;
        db.addBooking(data.userId,data.showingId,function(err,booking){
            if(err){
                res.status(500).send("Unable to add booking")
            }else{
                res.status(200).send(booking)
            }
        })
    }),

    router.get('/api/bookings/:userId',function(req,res){
        var userID=req.params.userId;
        db.getBookings(userID,function(req,res){
            if(err){
                res.status(500).send("Unable to access bookings")
            }else{
                res.status(200).send(bookings);
            }
        })
    });

    router.delete('/api/booking/:id',function(req,res){
        var ID=req.params.id;
        db.cancelBooking(ID,function(err,Booking){
            if(err){
                res.status(500).send("Unable to cancel booking")
            }
            else{
                res.status(200).send("Booking deleted")
            }
        })
    });

    router.get('/api/cinemas',function(req,res){
        db.getAllCinemas(function(err,cinemas){
            if(err){
                res.status(500).send("Unable to retrieve cinemas from database")
            }else{
                res.status(200).send(cinemas)
            }
        })
    })

    router.get('/api/showings/:movieId',function(req,res){
        var MovieId=req.params.movieId;
        db.getShowingsByMovieId(MovieId,function(err,showings){
            if(err){
                res.status(500).send("Unable to retrieve showings from database")
            }else{
                res.status(200).send(showings)
            }
    })
})
router.get('/api/showing/:id',function(req,res){
    var showingId=req.params.id;
        db.getShowingById(showingId,function(err,showing){
            if(err){
                res.status(500).send("Unable to retrieve showings from database")
            }else{
                res.status(200).send(showing)
            }
    })
})

    router.get('/api/user/:id',function(req,res){
        var ID=req.params.id;
        db.getUser(ID,function(err,user){
            if(err){
                res.status(500).send("Unable to retrieve user details")
            }else{
                res.status(200).send(user)
            }
        })
    });

    router.put('/api/user',function(req,res){
        var data=req.body;
        db.editUser(data.id,data.firstName,data.lastName,data.gender,data.dateOfBirth,contactNumber,email,password,function(err,user){
            if(err){
                res.status(500).send("Unable to edit user")
            }else{
                res.status(200).send("User particulars updated")
            }
        })
    });

    router.put('/api/snacks',function(req,res){
        var data=req.body;
        db.editSnacks(data.bId,data.snackIDArray,function(err,snacks){
            if(err){
                res.status(500).send("Unable to set snack")
            }else{
                res.status(200).send("Snacks booked updated")
            }
        })
    });

    router.post('/api/bookings', function (req, res) {
        var data = req.body;
        db.addBooking(data.userID, data.cinemaID, data.showingID, data.snackID, function (err, booking) {
            if (err) {
                res.status(500).send("Unable to add a new booking");
            }
            else {
                res.status(200).send(booking);
            }
        })
    });

    router.get('/api/movies/topRated/:page', function (req, res) {
        var page = req.params.page
        res.redirect("https://api.themoviedb.org/3/movie/top_rated?api_key=8d60f5ca8cb6f731fd8ecf886b9c8ad0&language=en-US&page=" + page);
    });

    router.get('/api/movies/nowShowing/:page', function (req, res) {
        var page = req.params.page
        res.redirect("https://api.themoviedb.org/3/movie/now_playing?api_key=8d60f5ca8cb6f731fd8ecf886b9c8ad0&language=en-US&page=" + page)
    });

    router.get('/api/movies/upcoming/:page',function(req,res){
        var page=req.params.page
        res.redirect("https://api.themoviedb.org/3/movie/upcoming?api_key=8d60f5ca8cb6f731fd8ecf886b9c8ad0&language=en-US&page=" + page)
    });

    router.get('/api/movie/:id', function (req, res) {
        var id = req.params.id;
        res.redirect("https://api.themoviedb.org/3/movie/" + id + "?api_key=8d60f5ca8cb6f731fd8ecf886b9c8ad0&language=en-US")
    });

    //tested
    router.post('/api/register', function (req, res) {
        var data = req.body;
        db.checkExisting(data.email, function (err, user) {
            if (err) {
                res.status(401).send("Cannot access user db");
            }
            else if (user) {
                res.status(500).send("User already exists");
            }
            else{
                db.register(data.firstName, data.lastName, data.gender, data.dateOfBirth, data.contactNo, data.email, data.password, function (err, user) {
                    if (err) {
                        res.status(500).send("Unable to add a new user");
                    } else {
                        res.status(200).send(user);
                    }
                })
            }
        })
    });

    router.post('/api/login', function (req, res) {
        var data = req.body;
        db.login(data.loginemail, data.loginpassword, function (err, user) {
            if (err) {
                res.status(401).send("Login fail. Please try again later");
            } else {
                if (user == undefined || user == null) {
                    res.status(401).send("Login fail. Please try again later");
                } else {
                    res.status(200).send(user);
                }
            }
        })
    });

    router.get('/api/logout', function (req,res) {
        db.logout(function (err) {
            if(err) {
                res.status(401).send("Error logging out");
            } else {
                alert("You have been logged out");
                window.location.href="/"
            }
        }); 
    })

    return router;
};

module.exports = routes();
