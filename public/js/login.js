const onSubmit = async (e) => {
  e.preventDefault();
  console.log("clicky");
  const username = e.target.querySelector("#username").value;
  const password = e.target.querySelector("#password").value;

  // Asynchronously send data to the `/api/blogs` end-point.
  const rawResponse = await fetch(`/api/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  const response = await rawResponse.json();
  console.log(response);

  // If PUT request succeeds go back to homepage
  if (rawResponse.ok) {
    window.location.href = "/reader/home";
  } else {
    console.log("Encountered error");
  }
};
