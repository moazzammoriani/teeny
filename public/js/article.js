const onSubmit = (e, blogId) => {
  e.preventDefault();

  // Extract comment text
  const textBox = e.target.querySelector("#comment-text");
  const commentText =  textBox.value;
  
  // Get posted_date
  const posted_date = new Date().toUTCString();

  // Select the comments container div
  const commentsContainer = document.querySelector("#comments-container");

  // Create a div for the comment
  const comment = document.createElement("div"); 
  comment.classList.add("comment");

  // Create a p element for the commented text
  const commentedText = document.createElement("p"); 
  commentedText.classList.add("comment-text")
  commentedText.innerText = commentText;

  // Create a p element for the posted date
  const commentDate = document.createElement("p");
  commentDate.classList.add("comment-date");
  commentDate.innerText = `posted: ${posted_date}`;


  /* Nest the commented text and commented date elements in 
   * the comment element */
  comment.appendChild(commentedText);
  comment.appendChild(commentDate);

  // Nest the comment in the comments container div
  commentsContainer.appendChild(comment);
  
  // Reset the value for the comment text box
  textBox.value = "";


}
