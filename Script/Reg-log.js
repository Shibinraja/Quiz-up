let login = document.getElementById("signin");
let reg = document.getElementById("reg");

// Values

let user = document.getElementById("regname");
let dob = document.getElementById("dob");
let email = document.getElementById("mail");
let password = document.getElementById("pass");
let confirmpassword = document.getElementById("confirm");
let position = document.getElementById("position");
let profession = document.getElementById("profession");
let loginid = document.getElementById("inputemail");
let passwordid = document.getElementById("inputpassword");


function submit(id) {

    if (login.id == id) {
        let details = ({ "Email": loginid.value, "Password": passwordid.value });

        let xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:8080/login", true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(JSON.stringify(details));

        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                let details = JSON.parse(xhr.responseText)
                console.log(details.Login)
                let username = details.Username;
                localStorage.setItem('username', username);
                if (details.Login == "Failed") {
                    alert("Password Incorrect")
                } else if (details.Profession == "teacher") {
                    window.location.href = "../Admin/Admin.html"
                } else if (details.Profession == "student") {
                    window.location.href = "../Quiz/Quiz.html"
                } else {
                    false;
                }
            };
        };

    };


    if (reg.id == id) {

        let json = ({ "Username": user.value, "DOB": dob.value, "Email": email.value, "Password": password.value, "Position": position.value, "Profession": profession.value })

        let xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:8080/registration", true)
        xhr.setRequestHeader("content-type", "application/json");
        xhr.send(JSON.stringify(json));

        if (password.value != confirmpassword.value) {
            alert("Password incorrect")
        } else {
            document.querySelector('.regform').style.display = 'none'
        }
    }

}

function check() {
    if (password.value != confirmpassword.value) {
        alert("Password incorrect")
    }
}






