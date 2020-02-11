$(document).ready(function () {
    // var user;
    // if(sessionStorage.getItem('lid')!==null){
        
    //     user=JSON.parse(sessionStorage.getItem('lid'));
    //     $('.authentication').html("<p>Welcome " +user.firstName+"<p>");
    //     $('.authentication').append("<button class=\"profilebtn\" onclick=\"location.href='/profile'\">Profile</button>")
    //     $('.authentication').append("<button class=\"logoutbtn\" onclick=\"logout()\">Logout</button>");
    // }
    $.ajax({
        url: "/api/cinemas",
        method: "get",
        dataType: "json"
    }).done(
        function (data) {
            $.each(data, function (key, value) {
                $(".headerTitle").after("<div><img src='"+value.photoURL+"'/><br><h2>name:</h2><span>"+value.name+"</span><br><h2>description:</h2><span>"+value.description+"</span></div><br>")
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