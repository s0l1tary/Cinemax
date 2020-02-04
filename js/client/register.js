$(document).ready(function () {
    $(".signupbtn").click(function(){
        var credentials = {
            username: $("#email").val(),
            password: $("#password").val()
        };
        var repPassword=$("#repPassword").val()
        if(password==repPassword){
            alert("Confirm password and password not the same")
        }else{
        $.ajax(
            {
                url: '/api/register',
                method: 'post',
                data: credentials
            }
            ).done(
                function (data) {
                    $(".registrationMessage").text('Registration Success');
                    sessionStorage.setItem('lid', data);
                    location.href = '/'; 
                }
            ).fail(
                function (err) {
                    $(".registrationMessage").text(err.responseText);
                }
            ); 
        }
    });
});