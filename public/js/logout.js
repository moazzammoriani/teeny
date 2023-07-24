const logoutButton = document.querySelector("#logout");

const logout = async (e) => {
  e.preventDefault();
  console.log("yes");

  // Asynchronously send data to the `/api/blogs` end-point.
  const rawResponse = await fetch("/api/login", {
    method: "DELETE",
  });

  // If POST succeeds then redirect client to author home
  if (rawResponse.ok) {
    console.log("logged out")
    location.href = "/login";
  } else {
    console.log("Couldn't logout");
  }
};

logoutButton.addEventListener("click", logout);
