const blog_sect = document.getElementById("blog_sect")


// ...

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
            console.log(blogdata[i])
            blog_sect.innerHTML = blog_sect.innerHTML + `
            <div id="blog_index">
            <h4>` + blogdata[i].title + `</h4>
            <img src="` + blogdata[i].image + `" class="img-blog" alt="UI/UX Desing">
            <div class="blog-text">
                <span> <strong>Blog by ` + blogdata[i].author + ` on ` + blogdata[i].createdAt + `</strong></span><br><br>
                <span class="">` + blogdata[i].body + `</span>
                <a href="../blogs/single/${blogdata[i]._id}">Read more</a>
            </div>
            </div>`

        }
    })