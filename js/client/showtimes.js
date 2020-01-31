$(document).ready(function () {
    var URLParams = new URLSearchParams(window.location.search);
    var movieId = URLParams.get('id');

    $.ajax({
        url: "/api/cinemas",
        method: "get",
        dataType: "json"
    }).done(
        function(data) {
            $.each(data, function(key,value) {
                $('.cinemalist').append("<li><button onclick=\"$.ajax({url: '/api/showings/'+"+movieId+",method: 'get',dataType: 'json'}).done(function(data){$('.timeslotlist').empty();$.each(data,function(key,value){if(value.cinemaId=='"+value._id+"'){$('.timeslotlist').append(value.timing.Time)}})}).fail(function(err) {});\" id="+value._id+">"+value.name+ " " +value.branch+"</button></li>");
            });
    }).fail(
        function(err) {
        
        })
})