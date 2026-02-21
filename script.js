// Filter function (copied from tested Node version)
function filterSkillsByCategory(skills, category) {
  if (category === 'All') {
    return skills;
  }

  return skills.filter(skill => skill.category === category);
}

// Sample skills data
const skills = [
  { title: 'Python Tutoring', category: 'Programming', price: 20 },
  { title: 'Guitar Lessons', category: 'Music', price: 15 },
  { title: 'Resume Review', category: 'Career', price: 0 },
  { title: 'Web Development', category: 'Programming', price: 25 }
];

const container = document.getElementById('skills-container');

// Render skills to page
function renderSkills(skillList) {
  container.innerHTML = '';

  skillList.forEach(skill => {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
      <h3>${skill.title}</h3>
      <p>Category: ${skill.category}</p>
      <p>$${skill.price}/hour</p>
    `;

    container.appendChild(card);
  });
}

// Initial render
renderSkills(skills);
// Attach click listeners to filter buttons
const buttons = document.querySelectorAll('.filters button');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const category = button.getAttribute('data-category');
    const filtered = filterSkillsByCategory(skills, category);
    renderSkills(filtered);
  });
});
