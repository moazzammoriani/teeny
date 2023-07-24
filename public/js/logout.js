const logout = async (e) => {
  e.preventDefault();

  // Asynchronously send data to the `/api/blogs` end-point.
  const rawResponse = await fetch("/api/login", {
    method: "DELETE",
  });

  // If POST succeeds then redirect client to author home
  if (rawResponse.ok) {
    window.location.href = "/login";
  } else {
    console.log("Couldn't logout");
  }
};
