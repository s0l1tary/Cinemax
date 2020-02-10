function validation() {
    var credentials = {
        firstName: $("#FirstName").val(),
        lastName: $("#LastName").val(),
        gender: $("#Gender").val(),
        dateOfBirth: $("#DOB").val(),
        contactNo: $("#ContactNo").val(),
        email: $("#LastName").val(),
        password: $("#Password").val(),
        rePassword: $("#RePassword").val()
    };

    if(credentials.password===credentials.rePassword){
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
    }else{
        alert("Passwords do not match!")
    }
}    