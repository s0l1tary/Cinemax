$(document).ready(function () {
    var URLParams = new URLSearchParams(window.location.search);
    var showingId = URLParams.get('showingId');
    var user;
    if(sessionStorage.getItem('lid')!==null){
        
        user=JSON.parse(sessionStorage.getItem('lid'));
        $('.authentication').html("<p style=\"text-align:center;\">Welcome " +user.firstName+"<p>");
            $('.authentication').append("<button class=\"profilebtn\" onclick=\"location.href='/profile'\">Profile</button>")
            $('.authentication').append("<button class=\"logoutbtn\" onclick=\"logout()\">Logout</button>");
    }
    $.ajax({
        url: "/api/showing/"+showingId,
        method: "get",
        dataType: "json"
    }).done(
        function (data) {
            $.ajax({
                url: "/api/movie/"+data.movieId,
                method: "get",
                dataType: "json"
            }).done(
                function(data) {
                    $(".movietitlespan").text(data.title);
            }).fail(
                function(err) {
                    $(".movietitlespan").text("error");
                    $(".cinemanamespan").text("error");
            });
                    var date = new Date();
                    var weekday = new Array(7);
                    weekday[0] = "Sunday";
                    weekday[1] = "Monday";
                    weekday[2] = "Tuesday";
                    weekday[3] = "Wednesday";
                    weekday[4] = "Thursday";
                    weekday[5] = "Friday";
                    weekday[6] = "Saturday";
                    var showday = weekday[date.getDay()];
                    $(".showdayspan").text(showday+ " ("+(date.toISOString().slice(0,10))+") ");
                    $(".showtimespan").text(data.timing.Time);
                    $(".cinemanamespan").text(data.cinema.name+" - "+data.cinema.branch);
                    $("#showingHidden").val(showingId);
                    if(sessionStorage.getItem('lid')!==null){
                        user=sessionStorage.getItem('lid');
                        var storedAccount=JSON.parse(user);
                        $("#userHidden").val(storedAccount._id);
                    } else {
                        alertLogin();
                        window.location.href="/Login";
                    }

                var counter = 0;
                $.each(data.seats, function(key,value) {
                if(counter>4){
                    if (value.status == true) {
                        $('.seatingTable > tbody:last-child').append("<tr><td><div class=\"seatBtn\" id=\"vacantseat\"><label><input type=\"checkbox\" name=\"seatTaken\" value="+value.seatNo+"><span>"+value.seatNo+"</span></input></label></div></td></tr>")
                    } else {
                        $('.seatingTable > tbody:last-child').append("<tr><td><div class=\"seatBtn\" id=\"occupiedseat\"><label><input type=\"checkbox\" name=\"seatTaken\" value="+value.seatNo+" disabled><span>"+value.seatNo+"</span></input></label></div></td></tr>")
                    }
                     counter=0;
                    }else{
                        if (value.status == true) {
                            $('.seatingTable tr:last').append("<td><div class=\"seatBtn\" id=\"vacantseat\"><label><input type=\"checkbox\" name=\"seatTaken\" value="+value.seatNo+"><span>"+value.seatNo+"</span></input></label></div></td>");
                        } else {
                            $('.seatingTable tr:last').append("<td><div class=\"seatBtn\" id=\"occupiedseat\"><label><input type=\"checkbox\" name=\"seatTaken\" value="+value.seatNo+" disabled><span>"+value.seatNo+"</span></input></label></div></td>");
                        }
                    counter++;
                    }
                    $(".occupiedseat").attr("disabled", true);
                });
        }).fail(
            function (err) {
                alert("You noob!");
    })

});
function logout(){
    sessionStorage.clear();
    location.href="/"
}
function alertLogin() {
    alert("Please log in before booking!");
}