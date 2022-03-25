auth.onAuthStateChanged(user => {
    if (user) {

    } else {
        location.href = "../pages/login.html"
    }
})