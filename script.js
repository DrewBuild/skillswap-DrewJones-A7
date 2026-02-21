// Global skills array (filled from API)
let skills = [];

/* =========================
   FILTER FUNCTION
========================= */
function filterSkillsByCategory(skillsList, category) {
  if (category === 'All') {
    return skillsList;
  }
  return skillsList.filter(skill => skill.category === category);
}

/* =========================
   RENDER SKILLS
========================= */
function renderSkills(skillList) {
  const container = document.getElementById('skills-container');
  if (!container) return;

  container.innerHTML = '';

  if (skillList.length === 0) {
    container.innerHTML = '<p>No skills found.</p>';
    return;
  }

  skillList.forEach(skill => {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
      <h3>${skill.title}</h3>
      <p><strong>Category:</strong> ${skill.category}</p>
      <p><strong>Price:</strong> $${skill.price}/hour</p>
      <p>${skill.description || ''}</p>
    `;

    container.appendChild(card);
  });
}

/* =========================
   LOAD SKILLS FROM API
========================= */
async function loadSkills() {
  try {
    skills = await window.apiService.fetchSkills();
    renderSkills(skills);
  } catch (err) {
    console.error("Error loading skills:", err);
    showError("Failed to load skills. Is the backend running?");
  }
}

/* =========================
   FORM SUBMISSION
========================= */
function setupForm() {
  const form = document.getElementById('create-skill-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const skillData = {
      title: form.title.value.trim(),
      category: form.category.value,
      price: Number(form.price.value),
      description: form.description.value.trim()
    };

    try {
      await window.apiService.createSkill(skillData);
      form.reset();
      await loadSkills(); // reload updated list
    } catch (err) {
      console.error("Error creating skill:", err);
      showError("Failed to create skill.");
    }
  });
}

/* =========================
   FILTER BUTTONS
========================= */
function setupFilters() {
  const buttons = document.querySelectorAll('.filters button');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.getAttribute('data-category');
      const filtered = filterSkillsByCategory(skills, category);
      renderSkills(filtered);
    });
  });
}

/* =========================
   ERROR HANDLING
========================= */
function showError(message) {
  const errorEl = document.getElementById('error-message');
  if (!errorEl) return;

  errorEl.textContent = message;
  errorEl.style.display = 'block';
}

function clearError() {
  const errorEl = document.getElementById('error-message');
  if (!errorEl) return;

  errorEl.textContent = '';
  errorEl.style.display = 'none';
}

/* =========================
   INITIALIZE APP
========================= */
document.addEventListener('DOMContentLoaded', () => {
  clearError();
  loadSkills();
  setupFilters();
  setupForm();
});