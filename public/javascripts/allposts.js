const divvv = document.getElementById('divvv')

fetch('/api/blogs/all')
    .then((response) => {
        return response.json({ response });
    })
    .then((blog) => {
        // console.log(blog.data)
        // let docs = data;
        const blogdata = blog.data

        for (let i = 0; i < blog.data.length; i++) {
            // const element = array[i];
            console.log(blogdata)
            divvv.innerHTML = divvv.innerHTML + `<tr>
        <td data-label="Firstname">
            <img src="` + blogdata[i].image + `" width="120px" alt="">
        </td>
        <td data-label="Lastname">` + blogdata[i].title + `</td>
        <td data-label="Email">` + blogdata[i].createdAt + `</td>
        <td data-label="Action">
            <a  href="/user/blogs/update/${blogdata[i]._id}" class="edit">Edit</a>
        </td>
        <td>
            <a href="/user/blogs/delete/${blogdata[i]._id}" id="deleteBtn" class="delete">delete</a>
        </td>
    </tr>`

        }
    })


// const deleteBtn = document.getElementById("deleteBtn")

// deleteBtn.style.background = "blue"

// function btndelete(docid) {
//     console.log(docid)
//     db.collection('posts').doc(docid).delete()
//         .then(res => {
//             alert("Post deleted");
//             location.reload();
//         }).catch(err => {
//             alert("Error: " + err.message)
//         })
// }