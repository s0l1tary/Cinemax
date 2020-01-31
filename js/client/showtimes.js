$(document).ready(function () {
    var URLParams = new URLSearchParams(window.location.search);
    var movieId = URLParams.get('id');
    $.ajax({
        url: "/api/cinemas",
        method: "get",
        dataType: "json"
    }).done(
        function(data) {
            $.each(data), function(key,value) {
                $('.cinemalist').append("<li>"+value.name+"</li>");
            }

    }).fail(
        function(err) {

    });

    $.ajax({
        url: "/api/showings/"+movieId,
        method: "get",
        dataType: "json"
    }).done(
        function(data) {

    }).fail(
        function(err) {

    });
});