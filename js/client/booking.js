$(document).ready(function () {
    var URLParams = new URLSearchParams(window.location.search);
    var showingId = URLParams.get('showingId');

    $.ajax({
        url: "/api/showing/"+showingId,
        method: "get",
        dataType: "json"
    }).done(
        function (data) {
                var counter = 0;
                alert(showingId);
                $.each(data.seats, function(key,value) {
                if(counter>4){
                    $('.bookingTable > tbody:last-child').append("<tr><td><button>Chair"+value.seatNo+"</button></td></tr>")
                     counter=0;
                    }else{
                    $('.bookingTable tr:last').append("<td><button>Chair"+value.seatNo+"</button></td>");
                    }
                    counter++;
                });
        }).fail(
            function (err) {
                alert("error");
            })

});