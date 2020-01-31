$(document).ready(function () {
    var URLParams = new URLSearchParams(window.location.search);
    var movieId = URLParams.get('id');

    $.ajax({
        url: "/api/cinemas",
        method: "get",
        dataType: "json"
    }).done(
        function (data) {
            $.each(data, function (key, value) {
                $('.cinemalist').append("<li><button onclick=getBookings(\""+value._id+"\",\""+movieId+"\") id=" + value._id + ">" + value.name + " " + value.branch + "</button></li>");
            });
        }).fail(
            function (err) {

            })

})
function getBookings(cinema,movieId) {
    $.ajax({
        url: '/api/showings/' + movieId,
        method: 'get',
        dataType: 'json' 
        }).done(
            function (data) { 
                $('.timeslotlist').empty();
                 $.each(data, function (key, value) { 
                    if (value.cinemaId == cinema) { 
                        $('.timeslotlist').append("<li><button><a href=/Booking?showingId="+value._id+">"+value.timing.Time+"</a></button></li>");
                    }; 
                    }); 
                }).fail(
                    function (err) { 

                });
}