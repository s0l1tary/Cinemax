/*
Booking table
UserID
ShowingID
SnacksID

Cinemas table
ID
name
showing

Showing table
movie Name
address
seats
timing

Snacks table
ID
name

Users table
ID
firstName
lastName
gender
dateOfBirth
contactNumber
email
password
*/
var mongoose = require('mongoose');
var schema = mongoose.Schema;

var UserModel, BookingModel, CinemaModel, ShowingModel, SnackModel;
var md5 = require("md5");

var database = {
    connect: function () {
        mongoose.connect('mongodb://localhost:27017/cinemaManagement', { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
            if (err == null) {
                console.log("connected to Mongo DB");
                userSchema = schema({
                    firstName: String,
                    lastName: String,
                    gender: String,
                    dateOfBirth: Date,
                    contactNumber: Number,
                    email: String,
                    password: String
                });
                bookingSchema = schema({
                    user: {
                        type: schema.Types.ObjectId,
                        ref: 'User'
                    },
                    showing: {
                        type: schema.Types.ObjectId,
                        ref: 'Showing'
                    },
                    seats:[String]

                });
                cinemaSchema = schema({
                    name: String,
                    showing: [{
                        type: schema.Types.ObjectId,
                        ref: 'Showing'
                    }],
                })
                //seats
                //true=available
                //false=taken
                showingSchema = schema({
                    movieId: Number,
                    address: String,
                    timing: {
                        Date:Date,
                        Time:String
                    },
                    seats: [
                        {
                            seatNo:String,
                            status:Boolean
                        }
                    ],
                    cinema: {
                        type: schema.Types.ObjectId,
                        ref: 'Cinema'
                    },
                })
                snackSchema = schema({
                    name: String,
                    cost: Number
                })
                var connection = mongoose.connection;
                UserModel = mongoose.model('User', userSchema)
                BookingModel = mongoose.model('Booking', bookingSchema)
                CinemaModel = mongoose.model('Cinema', cinemaSchema)
                ShowingModel = mongoose.model('Showing', showingSchema)
                SnackModel = mongoose.model('Snack', snackSchema)
            } else {
                console.log("Error connecting to Mongo DB", err);
            }
        })
    },
    checkExisting: function (e, callback) {
        UserModel.findOne({ email: e }, callback);
    },
    register: function (fn, ln, g, dob, cn, e, p, callback) {
        var newUser = new UserModel({
            firstName: fn,
            lastName: ln,
            gender: g,
            dateOfBirth: dob,
            contactNumber: cn,
            email: e,
            password: md5(p)
        });
        newUser.save(newUser,callback);
    },
    login: function (e, p, callback) {
        UserModel.findOne({ email: e, password: md5(p) }, callback)
    },
    logout: function(callback) {
        db.logout({});
    },
    getBookings:function(uid,callback){
        BookingModel.find({user:uid}).populate("showing").populate("user").exec(callback);
    },
    getUserDetails:function(uid,callback){
        UserModel.findOne({_id:uid},callback);
    },
    updateSeating:function(ShowingID,seatNo,changeTo,callback){
        ShowingModel.updateOne({_id : ShowingID, 'seats.seatNo' :seatNo}, {$set: {"seats.$.status" : changeTo}}, callback);
    },
    getShowingsByMovieId:function(mid,callback){
        ShowingModel.find({movieId:mid}).populate('cinema').exec(callback);
    },
    getShowingById:function(sid,callback){
        ShowingModel.findOne({_id:sid}).populate('cinema').exec(callback);
    },
    /*getCinemasByShowingId:function(sid,callback){
        CinemaModel.findOne({showing:sid},callback)
    },*/
    getAllCinemas:function(callback){
        CinemaModel.find({},callback)
    },
    //older ver
    /*addBooking: function (uid, cid, sid,snackIdArray, callback) {
        newBooking = new BookingModel({
            user: uid,
            cinema: cid,
            showing: sid,
            snack: snackIdArray
        });
        newBooking.save(callback);
    },*/
    addBooking: function (uid, sid,sa,callback) {
        newBooking = new BookingModel({
            user: uid,
            showing: sid,
            seats:sa
        });
        newBooking.save(callback);
    },
    cancelBooking:function(bid,callback)
    {
        BookingModel.findByIdAndDelete(bid,callback)
    },
    editUser:function(id,fn,ln,g,dob,cn,e,p,callback){
        var updatedUser = new UserModel({
            firstName: fn,
            lastName: ln,
            gender: g,
            dateOfBirth: dob,
            contactNumber: cn,
            email: e,
            password: md5(p)
        });
        updatedUser.updateOne({_id:id},callback);
    },
    getUser:function(id,callback){
        UserModel.findOne({_id:id},callback);
    },
    editSnacks:function(bId,snackIdArray,callback)
    {
        var updatedBooking={
            snack:snackIdArray
        };
        EventModel.updateOne({_id:bId},updatedBooking,callback);
    }
};
module.exports = database;