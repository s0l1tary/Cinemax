$(document).ready(function () {
    var user;
    if(sessionStorage.getItem('lid')!==null){
        
        user=JSON.parse(sessionStorage.getItem('lid'));
        $('.authentication').html("<p style=\"text-align:center;\">Welcome " +user.firstName+"<p>");
            $('.authentication').append("<button class=\"profilebtn\" onclick=\"location.href='/profile'\">Profile</button>")
            $('.authentication').append("<button class=\"logoutbtn\" onclick=\"logout()\">Logout</button>");
    }
    $.ajax({
        url: "/api/cinemas",
        method: "get",
        dataType: "json"
    }).done(
        function (data) {
            $.each(data, function (key, value) {
                $(".headerTitle").after("<div><img src='"+value.photoURL+"'/><br><h2>Name:</h2><span>"+value.name+"</span><br><br><h2>Description:</h2><span>"+value.description+"</span></div><br><hr>")
            })

    }).fail(
        function(err){
        }
    )
})

function logout(){
    sessionStorage.clear();
    location.href="/"
}