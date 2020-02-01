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
                var dates=[];
                $.each(data, function (key, value) { 
                    if (value.cinemaId == cinema) { 
                        dates.push(value.timing.Date)
                    }; 
                });
                let uniqueDate = dates.filter((item, i, ar) => ar.indexOf(item) === i);
                $.each(uniqueDate,function(key,unique){
                    var weekday = new Array(7);
                    weekday[0] = "Sunday";
                    weekday[1] = "Monday";
                    weekday[2] = "Tuesday";
                    weekday[3] = "Wednesday";
                    weekday[4] = "Thursday";
                    weekday[5] = "Friday";
                    weekday[6] = "Saturday";
                    var showday = weekday[new Date(unique).getDay()];
                    $('.timeslotlist').append("<li>"+showday+ " " +new Date(unique).toISOString().slice(0,10)+"</li>");
                    data.sort((a, b) => a.timing.Date.localeCompare(b.timing.Date) || a.timing.Time.localeCompare(b.timing.Time));
                    $.each(data,function(key,showing){
                        if(showing.timing.Date==unique){
                            $('.timeslotlist').append("<li><button><a href=/Booking?showingId="+showing._id+">"+showing.timing.Time+"</a></button></li>");
                        }
                    })
                })
                }).fail(
                    function (err) { 

                });
}