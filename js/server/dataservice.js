/*
Booking table
UserID
CinemaID
ShowingID
SnacksID

Cinemas table
ID
name
movieShowing

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
var mongoose=require('mongoose');
var schema=mongoose.Schema;
var userSchema={};
var bookingSchema={};
var cinemaSchema={};
var snackSchema={};

var UserModel,BookingModel,CinemaModel,SnackModel;
var md5=require("md5");

var database={
    connect:function(){
        mongoose.connect('mongodb://localhost:27017/cinemaManagement',{useNewUrlParser:true},function(err){
            if(err==null){
                console.log("connected to Mongo DB");
                userSchema=schema({
                    
                })
            }
        })
    }
};
module.exports=database;