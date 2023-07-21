const form = document.getElementById("create-draft-form");

const onSubmit = async (e) => {
  // Prevent the default form submission behavior
  e.preventDefault();

  // Extract and setup data from form
  const title = e.target.querySelector("#title").value;
  const subtitle = e.target.querySelector("#subtitle").value;
  const content = e.target.querySelector("#content").value;
  const author = 1;
  const creation_date = new Date().toUTCString();
  const last_edit_date = creation_date;

  // Asynchronously send data to the `/api/blogs` end-point.
  const rawResponse = await fetch("/api/blogs", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      subtitle,
      content,
      author,
      creation_date,
      last_edit_date,
    }),
  });

  // If POST succeeds then redirect client to author home
  if (rawResponse.ok) {
    window.location.href = "/author/home";
  }
};

form.addEventListener("submit", onSubmit);
