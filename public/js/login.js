const login = async (e) => {
  e.preventDefault();
  const username = e.target.querySelector("#username").value;
  const password = e.target.querySelector("#password").value;

  // Asynchronously send data to the `/api/login` end-point.
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

const displayAccountCreate = (e) => {
  console.log(e.target);

  const loginForm = document.querySelector(".login");
  const signupForm = document.querySelector(".signup");
  const createBtn = document.querySelector("#create-btn");

  // Hide login form
  loginForm.classList.toggle("remove");
  createBtn.classList.toggle("remove");


  // Display signup form
  signupForm.classList.toggle("remove");
};


const createAccount = async (e) => {
  e.preventDefault();

  e.preventDefault();
  const name = e.target.querySelector("#signup-name").value;
  const username = e.target.querySelector("#signup-username").value;
  const password = e.target.querySelector("#signup-password").value;

  // Asynchronously send data to the `/api/users` end-point.
  const rawResponse = await fetch(`/api/users`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      username,
      password,
    }),
  });


  // If POST request succeeds go back to homepage
  if (rawResponse.ok) {
    window.location.reload();
  } else {
    console.log("Encountered error");
  }
}
