const addPost = document.getElementById('addPost');
const title = document.getElementById('title');
const body = document.getElementById('body');
const image = document.getElementById('image');
const blogalert = document.getElementById('blogalert');
blogalert.style.visibility = "none"
blogalert.innerText = ""


addPost.addEventListener('click', (e) => {
    if (title == "" || body == "" || image == "") {
        e.preventDefault();
        blogalert.style.visibility = "block"
    } else {
        e.preventDefault();
        db.collection('posts').add({
            blogid: Math.floor(Math.random() * 100),
            author: "SHYAKA Benjamin",
            body: body.value,
            createdAt: new Date(),
            image: image.value,
            title: title.value
        }).then(res => {
            title.value = "";
            body.value = "";
            alert("Post added");
            location.href = "../dashboard/allblogs.html";
        }).catch(err => {
            alert("Error: " + err.message)
        })
    }
})