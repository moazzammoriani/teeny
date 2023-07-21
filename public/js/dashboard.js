const blogs = document.querySelectorAll(".draft-author-blog");

const publishBlog = async (blogId) => {
  // Asynchronously send data to the `/api/blogs` end-point.
  const rawResponse = await fetch("/api/blogs", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: blogId, state: "published" }),
  });

  // If POST succeeds then redirect client to author home
  if (rawResponse.ok) {
    window.location.href = "/author/home";
  } else {
    console.log("Encountered error");
  }
};

const deleteBlog = async (blogId) => {
  // Asynchronously send DELETE req to the `/api/blogs` end-point.
  const rawResponse = await fetch(`/api/blogs/${blogId}`, {
    method: "DELETE",
  });

  // If DELETE succeeds then redirect client to author home
  if (rawResponse.ok) {
    window.location.href = "/author/home";
  } else {
    console.log("Encountered error");
  }
};

const onClick = (event, blogId) => {
  event.preventDefault();

  className = event.target.className;
  console.log(className);

  if (className === "edit-btn") {
  } else if (className === "publish-btn") {
    publishBlog(blogId);
  } else if (className === "delete-btn") {
    deleteBlog(blogId);
  }
};
