function validation() {
    var credentials = {
        firstName: $("#FirstName").val(),
        lastName: $("#LastName").val(),
        gender: $("#Gender").val(),
        dateOfBirth: $("#DOB").val(),
        contactNo: $("#ContactNo").val(),
        email: $("#Email").val(),
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
                    if(status=200){
                        $(".registrationMessage").text('Registration Success');
                        console.log(data);
                        sessionStorage.setItem('lid', JSON.stringify(data));
                        location.href = '/'; 
                    }
                
                }
            ).fail(
                function (err) {
                    if(status=500){
                        alert("User already exists")
                    }else{
                        alert(err.responseText)
                    }
                }
            );
    }else{
        alert("Passwords do not match!")
    }
}    