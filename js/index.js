/**Create and add a footer */
const footer = document.createElement("footer");

const today = new Date();
const thisYear = today.getFullYear();
const copyRight = document.createElement("p");
const symbol = "\u00A9";
copyRight.textContent = `${symbol} Hannah Zeng ${thisYear}.`;
footer.appendChild(copyRight);

document.body.append(footer);

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


