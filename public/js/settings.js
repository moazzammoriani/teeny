const onSubmit = async (e, userId) => {
  // Prevent the default form submission behavior
  e.preventDefault();

  // Extract and setup data from form
  const blog_title = e.target.querySelector("#blog_title").value;
  const blog_subtitle = e.target.querySelector("#blog_subtitle").value;
  const name = e.target.querySelector("#name").value;
  const id = userId;

  // Asynchronously send data to the `/api/blogs` end-point.
  const rawResponse = await fetch(`/api/users/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      blog_title,
      blog_subtitle,
      name,
    }),
  });

  if (!(rawResponse.ok)) {
    console.log("Encountered error");
  } 
};
