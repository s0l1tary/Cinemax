$(document).ready(function () {
    var URLParams = new URLSearchParams(window.location.search);
    var showingId = URLParams.get('id');

    $.ajax({
        url: "/api/showings"+showingId,
        method: "get",
        dataType: "json"
    }).done(
        function (data) {
            $.each(data, function (key, value) {
                
            });
        }).fail(
            function (err) {

            })

});