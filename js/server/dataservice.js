/*
Booking table
UserID
CinemaID
ShowingID
SnacksID

Cinemas table
ID
name
showing
addresses

Showing table
movie Name
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
var mongoose=require('mongoose');
var schema=mongoose.Schema;

var UserModel,BookingModel,CinemaModel,SnackModel;
var md5=require("md5");

var database={
    connect:function(){
        mongoose.connect('mongodb://localhost:27017/cinemaManagement',{useNewUrlParser:true,useUnifiedTopology:true},function(err){
            if(err==null){
                console.log("connected to Mongo DB");
                userSchema=schema({
                    firstName:String,
                    lastName:String,
                    gender:String,
                    dateOfBirth:Date,
                    contactNumber:Number,
                    email:String,
                    password:String
                });
                bookingSchema=schema({
                    user:{
                        type:schema.Types.ObjectId,
                        ref:'User'
                    },
                    cinema:{
                        type:schema.Types.ObjectId,
                        ref:'Cinema'
                    },
                    showing:{
                        type:schema.Types.ObjectId,
                        ref:'Showing'
                    },
                    snack:{
                        type:schema.Types.ObjectId,
                        ref:'Snack'
                    }

                });
                cinemaSchema=schema({
                    name:String,
                    showing:{
                        type:schema.Types.ObjectId,
                        ref:'Showing'
                    },
                })
                //seats
                //true=available
                //false=taken
                showingSchema=schema({
                    movieName:String,
                    addresses:Array,
                    timing:{
                        start:{
                            date:Date,
                            time:String
                        },
                        end:{
                            date:Date,
                            time:String
                        }
                    },
                    seats:Array
                })
                snackSchema=schema({
                    name:String,
                })
                var connection=mongoose.connection;
                UserModel=mongoose.model('User',userSchema)
                BookingModel=mongoose.model('Booking',bookingSchema)
                CinemaModel=mongoose.model('Cinema',cinemaSchema)
                ShowingModel=mongoose.model('Showing',showingSchema)
                SnackModel=mongoose.model('Snack',snackSchema)
            }else{
                console.log("Error connecting to Mongo DB",err);
            }
        })
    },
    //register:function(n,d,sd)
};
module.exports=database;