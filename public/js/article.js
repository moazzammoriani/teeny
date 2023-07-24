const createComment = (e, res) => {
  // Extract comment text
  const { posted_date, content, username } = res;
  const textBox = e.target.querySelector("#comment-text");
  const commentText = content;

  // Select the comments container div
  const commentsContainer = document.querySelector("#comments-container");

  // Create a div for the comment
  const comment = document.createElement("div");
  comment.classList.add("comment");

  // Create a p element for the commented text
  const commentedText = document.createElement("p");
  commentedText.classList.add("comment-text");
  commentedText.innerText = commentText;


  // Create a p element for the posted date
  const commentor = document.createElement("p");
  commentor.classList.add("comment-date");
  commentor.innerText = `Username: ${username}`;

  // Create a p element for the posted date
  const commentDate = document.createElement("p");
  commentDate.classList.add("comment-date");
  commentDate.innerText = `Posted: ${posted_date}`;

  /* Nest the commented text and commented date elements in
   * the comment element */
  comment.appendChild(commentedText);
  comment.appendChild(commentor);
  comment.appendChild(commentDate);

  // Nest the comment in the comments container div
  commentsContainer.appendChild(comment);

  // Reset the value for the comment text box
  textBox.value = "";
};

const onSubmit = async (e, blogId) => {
  // Prevent the default form submission behavior
  e.preventDefault();

  const textBox = e.target.querySelector("#comment-text");

  // Extract and setup data from form
  const content = textBox.value;
  const posted_date = new Date().toUTCString();
  const parent_blog = blogId;

  // Asynchronously send data to the `/api/blogs` end-point.
  const rawResponse = await fetch("/api/comments", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content,
      posted_date,
      parent_blog,
    }),
  });

  // If PUT succeeds then redirect client to author home
  if (rawResponse.ok) {
    const response = await rawResponse.json()
    createComment(e, response)
  } else {
    console.log("Encountered error");
  }
};

const updateLikes = async (e, blogsId) => {
  e.preventDefault()
  const likesSpan = document.querySelector("#likes")

  // Asynchronously send data to the `/api/blogs/likes` end-point.
  const rawResponse = await fetch(`/api/blogs/likes/${blogsId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
    },
  });


  // If PUT succeeds then redirect client to author home
  if (rawResponse.ok) {
    const response = await rawResponse.json();
    let textArray = likesSpan.innerText.split(" ")
    textArray[1] = response.likes;
    likesSpan.innerText = textArray.join(' ');
  } else {
    console.log("Encountered error");
  }



}
