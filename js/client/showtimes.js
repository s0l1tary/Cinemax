$(document).ready(function () {
    var URLParams = new URLSearchParams(window.location.search);
    var movieId = URLParams.get('id');

    $.ajax({
        url: "/api/movie/"+movieId,
        method: "get",
        dataType: "json"
    }).done(
        function(data) {
    }).fail( {

    });
});