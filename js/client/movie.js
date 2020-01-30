$(document).ready(function () {
    var URLParams = new URLSearchParams(window.location.search);
    var movieId = URLParams.get('id');

    $.ajax({
        url: "/api/movie/"+movieId,
        method: "get",
        dataType: "json"
    }).done(
        function(data) {
            $('.movieimage').attr("src","http://image.tmdb.org/t/p/w185/"+data.poster_path);
            $('.movietitle').append(data.title);
            $('.movietagline').append(data.tagline);
            $('.movieoverview').append(data.overview);
            $('.movieruntime').text(data.runtime);
            $.each(data.genres, function(key,value) {
                $('.moviegenre').append(value.name);
            })
            $.each(data.spoken_languages, function(key,value) {
                $('.movielanguage').append(value.name);
            })
            $('.movierelease').text(data.release_date);
            $('.movievote').text(data.vote_average);
            $('.moviehomepage').text("Website");
            $('.moviehomepage').attr("href",data.homepage);
        }
    ).fail(
        function(err) {
            console.log(err.responseText);
        }
    )
});