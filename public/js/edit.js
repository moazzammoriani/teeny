const onSubmit = async (e, blogId) => {
  // Prevent the default form submission behavior
  e.preventDefault();

  // Extract and setup data from form
  const title = e.target.querySelector("#title").value;
  const subtitle = e.target.querySelector("#subtitle").value;
  const content = e.target.querySelector("#content").value;
  const author = 1;
  const last_edit_date = new Date().toUTCString();
  const id = blogId;

  // Asynchronously send data to the `/api/blogs` end-point.
  const rawResponse = await fetch(`/api/blogs/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      subtitle,
      content,
      author,
      last_edit_date,
    }),
  });

  // If PUT succeeds then redirect client to author home
  if (rawResponse.ok) {
    window.location.href = "/author/home";
  } else {
    console.log("Encountered error");
  }
};
