function filterSkillsByCategory(skills, category) {
  if (category === 'All') {
    return skills;
  }

  return skills.filter(skill => skill.category === category);
}

function calculateTotalCost(hourlyRate, hours) {
  return hourlyRate * hours;
}

module.exports = {
  filterSkillsByCategory,
  calculateTotalCost
};
