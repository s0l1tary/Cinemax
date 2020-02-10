$(document).ready(function () {
    $(".loginformbtn").click(function(){
        var credentials = {
            username: $("#loginemail").val(),
            password: $("#loginpassword").val()
        };
        $.ajax(
            {
                url: '/api/login',
                method: 'post',
                data: credentials
            }
            ).done(
                function (data) {
                    $(".loginMessage").text('Login Success');
                    $(".logoutBtn").show();
                    sessionStorage.setItem('lid', JSON.stringify(data));
                    location.href = '/'; 
                }
            ).fail(
                function (err) {
                    $(".loginMessage").text(err.responseText);
                }
            ); 
    });
});