$(document).ready(function () {
    // var user;
    // if(sessionStorage.getItem('lid')!==null){
        
    //     user=JSON.parse(sessionStorage.getItem('lid'));
    //     $('.authentication').html("<p>Welcome " +user.firstName+"<p>");
    //     $('.authentication').append("<button class=\"profilebtn\" onclick=\"location.href='/profile'\">Profile</button>")
    //     $('.authentication').append("<button class=\"logoutbtn\" onclick=\"logout()\">Logout</button>");
    // }
    var URLParams = new URLSearchParams(window.location.search);
    var movieId = URLParams.get('id');

    $.ajax({
        url: "/api/movie/"+movieId,
        method: "get",
        dataType: "json"
    }).done(
        function(data) {
            console.log("/api/movie/"+movieId);
            $('.movieimage').attr("src","http://image.tmdb.org/t/p/w185/"+data.poster_path);
            $('.movietitle').append(data.title);
            if(data.tagline== null || data.tagline == "") {
                $('.movietagline').append("");
            } else {
                $('.movietagline').append("'"+data.tagline+"'");
            }
            $('.movieoverview').append(data.overview);
            $('.movieruntime').append(data.runtime+" minutes");
            $.each(data.genres, function(key,value) {
                if(data.genres.length > key+1) {
                    $('.moviegenre').append(value.name+", ");
                } else {
                    $('.moviegenre').append(value.name);
                }
            })
            $.each(data.spoken_languages, function(key,value) {
                if (data.spoken_languages.length > key + 1) {
                    $('.movielanguage').append(value.name+", ");
                } else {
                    $('.movielanguage').append(value.name);
                }
            })
            $('.movierelease').append(data.release_date);
            $('.movievote').append(data.vote_average);
            $('.moviehomepage').text("Website");
            $('.moviehomepage').attr("href",data.homepage);
        }
    ).fail(
        function(err) {
            console.log(err.responseText);
        }
    )
});

function logout(){
    sessionStorage.clear();
    location.href="/"
}