$(document).ready(function () {
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