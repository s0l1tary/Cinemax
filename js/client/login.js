$(document).ready(function () {
    $(".loginformbtn").click(function(){
        var credentials = {
            username: $("#loginemail").val(),
            password: $("#loginpassword").val()
        };
        $.ajax(
            {
                url: '/login',
                method: 'post',
                data: credentials
            }
            ).done(
                function (data) {
                    $(".loginMessage").text('Login Success');
                    $(".logoutBtn").show();
                    sessionStorage.setItem('oid', data);
                    location.href = '/'; 
                }
            ).fail(
                function (err) {
                    $(".loginMessage").text(err.responseText);
                }
            ); 
    });
});