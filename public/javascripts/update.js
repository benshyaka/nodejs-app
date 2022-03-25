const updatePost = document.getElementById('updatePost');
const title = document.getElementById('title');
const image = document.getElementById('image');
const body = document.getElementById('body');
const blogalert = document.getElementById('blogalert');
blogalert.style.visibility = "none"

const id = location.hash.slice(1);
console.log(id)
db.collection('posts').doc(id).get().then(res => {
    console.log(res.data())
    title.value = res.data().title;
    image.value = res.data().image
    body.value = res.data().body;
})

updatePost.addEventListener('click', (e) => {
    if (title == "" || body == "" || image == "") {
        e.preventDefault();
        blogalert.style.visibility = "block"
    } else {
        e.preventDefault();
        db.collection('posts').doc(id).update({
            author: "SHYAKA Benjamin",
            body: body.value,
            updateAt: new Date(),
            image: image.value,
            title: title.value
        }).then(res => {
            title.value = "";
            body.value = "";
            alert("Post updated");
            location.href = "../dashboard/allblogs.html";
        }).catch(err => {
            alert("Error: " + err.message)
        })
    }

})