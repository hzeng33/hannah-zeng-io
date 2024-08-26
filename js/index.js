/**Create and add a footer */
const footer = document.createElement("footer");
document.body.appendChild(footer);
const today = new Date();
const thisYear = today.getFullYear();
const copyRight = document.createElement("p");
const symbol = "\u00A9";
copyRight.textContent = `${symbol} Hannah Zeng ${thisYear}.`;
footer.appendChild(copyRight);

/**Add Skills List. */
const skills = [
  "JavaScript",
  "HTML",
  "CSS",
  "Java",
  "GitHub",
  "Git",
  "SQL",
  "Excel",
];
const skillsSection = document.getElementById("skills");
const skillsList = skillsSection.querySelector("ul");

for (let i = 0; i < skills.length; i++) {
  let skill = document.createElement("li");
  skill.textContent = skills[i];
  skillsList.appendChild(skill);
}

/**Handle Message Form Submit */
const messageForm = document.querySelector(`form[name="leave_message"]`);

const messageSection = document.getElementById("messages");
const messageList = messageSection.querySelector("ul");

// Function to show or hide the messages section
const showMessages = () => {
  if (messageList.children.length > 0) {
    messageSection.style.display = "block";
  } else {
    messageSection.style.display = "none";
  }
};

const handleSubmit = (event) => {
  event.preventDefault();

  let usersName = event.target.usersName.value;
  let usersEmail = event.target.usersEmail.value;
  let usersMessage = event.target.usersMessage.value;

  console.log(usersName);
  console.log(usersEmail);
  console.log(usersMessage);

  const newMessage = document.createElement("li");

  newMessage.innerHTML = `
  <a href="mailto:${usersEmail}">${usersName}</a>
  <span>: ${usersMessage}</span>
`;

  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.setAttribute("type", "button");

  removeButton.addEventListener("click", (event) => {
    const entry = removeButton.parentNode;
    entry.remove();
    showMessages();
  });

  newMessage.appendChild(removeButton);
  messageList.appendChild(newMessage);

  showMessages();

  // Clear the form
  event.target.reset();
};

messageForm.addEventListener("submit", handleSubmit);
document.addEventListener("DOMContentLoaded", showMessages);
