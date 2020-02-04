$(document).ready(function () {
    $(".signupbtn").click(function(){
        var credentials = {
            firstName: $("#FirstName").val(),
            lastName: $("#LastName").val(),
            gender: $("#Gender").val(),
            dateOfBirth: $("DOB").val(),
            contactNo: $("ContactNo").val(),
            email: $("#LastName").val(),
            password: $("#password").val(),
            rePassword: $("#RePassword").val()
        };
        if(password!=repPassword){
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