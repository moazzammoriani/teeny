const form = document.getElementById("create-draft-form");

const onSubmit = (e) => {
  e.preventDefault(); // Prevent the default form submission behavior

  const title = e.target.querySelector("#title").value;
  const subtitle = e.target.querySelector("#subtitle").value;

  (async () => {
    const rawResponse = await fetch("/api/blogs", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, subtitle, author: 1 }),
    });

  })();
};

form.addEventListener("submit", onSubmit);
