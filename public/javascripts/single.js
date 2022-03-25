const id = location.hash.slice(1);

console.log(id);

const title = document.getElementById('title');
const ntitle = document.getElementById('ntitle')
const dtitle = document.getElementById('dtitle')
const createdAt = document.getElementById('createdt');
const image = document.getElementById('image');
const body = document.getElementById('body');

db.collection("posts").doc(id)
    .get()
    .then(res => {
        console.log(res.data())
        title.innerHTML = res.data().title;
        ntitle.innerHTML = "Home/Blog/" + res.data().title;
        dtitle.innerHTML = "Technology " + res.data().title + "Created at " + res.data().createdAt.toDate().toDateString() + " By " + res.data().author;
        image.src = res.data().image
        body.innerHTML = res.data().body;
    })