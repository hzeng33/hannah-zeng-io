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
const messageSection = document.getElementById("message-section");
const messageList = messageSection.querySelector("ul");
messageSection.style.display = "none";

let idCounter = 0;
//create unique id's for entries
//Closure on idCounter

function makeId() {
  let id = "entry" + idCounter++;
  return id;
}
//save entries by id so their content can initialize the edit form
let entryById = {};

messageForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let name = event.target.usersName.value;
  let email = event.target.usersEmail.value;
  let message = event.target.usersMessage.value;
  console.log("Name: ", name);
  console.log("Email: ", email);
  console.log("Message: ", message);

  let uid = makeId();
  const newMessage = document.createElement("li");
  newMessage.classList.add("message-item"); //for styling purpose

  newMessage.innerHTML = `<a href="mailto:${email}">${name}</a> <span>wrote: ${message}</span>`;
  newMessage.setAttribute("id", uid);

  entryById[uid] = {
    usersName: name,
    usersEmail: email,
    usersMessage: message,
  };

  newMessage.appendChild(makeEditButton());
  newMessage.appendChild(makeRemoveButton());

  messageList.appendChild(newMessage);
  messageForm.reset(); //clear the form
  messageSection.style.display = "flex";
});

//Create remove button in parentNode
function makeRemoveButton() {
  let removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.type = "button";
  removeButton.className = "remove-btn";
  removeButton.addEventListener("click", () => {
    let entry = removeButton.parentNode;
    let uid1 = entry.getAttribute("id");
    delete entryById[uid1];
    entry.remove();
    if (messageList.childElementCount === 0) {
      messageSection.style.display = "none";
    }
  });
  return removeButton;
}

//Create edit button in parentNode
function makeEditButton() {
  let editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.type = "button";
  editButton.className = "edit-btn";

  editButton.addEventListener("click", () => {
    //adds an edit button with listener to its parent node
    let entry = editButton.parentNode;

    //disable the edit button while editing
    editButton.style.display = "none";

    //disable the remove button while editing
    entry.querySelector("button.remove-btn").style.display = "none";

    //get the entry's unique id so its content can be used in the form
    let uid = entry.getAttribute("id");
    let cloneForm = messageForm.cloneNode(true);
    cloneForm.className = "edit-message-form";
    cloneForm.usersName.value = entryById[uid].usersName;
    cloneForm.usersEmail.value = entryById[uid].usersEmail;
    cloneForm.usersMessage.value = entryById[uid].usersMessage;
    entry.appendChild(cloneForm);

    cloneForm.addEventListener("submit", function editMessage(event) {
      event.preventDefault();

      entryById[uid].usersName = event.target.usersName.value;
      entryById[uid].usersEmail = event.target.usersEmail.value;
      entryById[uid].usersMessage = event.target.usersMessage.value;
      let newEntry = document.createElement("li");
      newEntry.classList.add("message-item");
      newEntry.setAttribute("id", uid);
      newEntry.innerHTML = `<a href="mailto:${entryById[uid].usersEmail}">${entryById[uid].usersName}</a> <span>wrote: ${entryById[uid].usersMessage}</span>`;
      newEntry.appendChild(makeEditButton());
      newEntry.appendChild(makeRemoveButton());
      entry.parentNode.replaceChild(newEntry, entry);
    });
  });
  return editButton;
}

//Fetch GitHub repos
const projectSection = document.getElementById("projects");
const projectList = projectSection.querySelector("ul");
const reposToDisplay = [
  "build-project-lobby-system",
  "Crypto_Hustle_Pro",
  "Flixster",
  "Instagram-Clone",
  "Learn-Morse-Code",
  "Recipe-Square",
  "Text-Parser",
  "Twitter-Client",
  "WebsiteCapture",
];

fetch("https://api.github.com/users/hzeng33/repos")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Fetch request failed.");
    }
    return response.json();
  })
  .then((repoData) => {
    const repositories = repoData;
    //console.log(repositories);

    const filteredRepos = repositories.filter((repo) =>
      reposToDisplay.includes(repo.name)
    );
    filteredRepos.forEach((repo) => {
      const project = document.createElement("li");
      const link = document.createElement("a");
      link.textContent = repo.name;
      link.href = repo.html_url;
      link.target = "_blank";

      project.appendChild(link);
      projectList.appendChild(project);
    });
  })
  .catch((error) => {
    console.error("Error occurred: ", error);
  });
