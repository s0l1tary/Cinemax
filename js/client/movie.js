$(document).ready(function() {
    var URLParams = new URLSearchParams(window.location.search);
    var pageNo = URLParams.get('page');

    $.ajax({
        url: "/api/movies/topRated/"+pageNo,
        method: "get"
    }).done (
        function(data) {
            var content = "<div>";
            content.append()
        }
    )
});