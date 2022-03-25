const loginBtn = document.getElementById('loginBtn');
const email = document.getElementById('email');
const password = document.getElementById('password');
const alertmsg = document.getElementById('alertmsg');


const passwordalert = document.getElementById('passwordalert');
const emailalert = document.getElementById('emailalert');
passwordalert.style.display = "none"
emailalert.style.display = "none"
console.log(email.value, password.value)


loginBtn.addEventListener('click', (e) => {
    if (email.value == "") {
        emailalert.style.display = "block"
        emailalert.style.color = "#ffeb00"
        e.preventDefault();
    } else {
        emailalert.style.display = "none"
    }

    if (password.value == "") {
        passwordalert.style.display = "block"
        passwordalert.style.color = "#ffeb00"
        e.preventDefault();
    } else {
        passwordalert.style.display = "none"
    }

    if (password.value !== "") {
        console.log(email.value, password.value)
        passwordalert.style.display = "none"
        emailalert.style.display = "none"
        e.preventDefault();
        auth.signInWithEmailAndPassword(email.value, password.value).then(res => {
            location.href = '../dashboard/dashboard.html'
        }).catch(err => {
            // e.preventDefault();
            alertmsg.style.visibility = "block"
            alertmsg.style.background = "red"
            alertmsg.style.padding = "7px"
            alertmsg.style.width = "300px"
            alertmsg.textContent = err.message
                // alert(err.message)

        })
    }

})