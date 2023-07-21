const blogs = document.querySelectorAll(".draft-author-blog");

const publishBlog = (id) => {
} 

const onClick = (event, blogId) => {
  event.preventDefault();

  className = event.target.className;
  console.log(className);

  if (className === "edit-btn") {
  } else if (className === "publish-btn") {
    publishBlog(blogId);
  } else if (className === "delete-btn") {
    console.log(`hurrayy for the del button of ${blogId}`);
  }
};
