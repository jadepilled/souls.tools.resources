document.addEventListener('DOMContentLoaded', function () {
  const achievements = [
  {
    progressSelector: '.bond_pyromancer-progress',
    checkboxClass: 'bond_pyromancer-checkbox',
    totalItems: 19
  },
  {
    progressSelector: '.knights_honor-progress',
    checkboxClass: 'knights_honor-checkbox',
    totalItems: 49
  },
  {
    progressSelector: '.wisdom_sage-progress',
    checkboxClass: 'wisdom_sage-checkbox',
    totalItems: 24
  },
  {
    progressSelector: '.prayer_maiden-progress',
    checkboxClass: 'prayer_maiden-checkbox',
    totalItems: 23
  }
];


  // Function to update progress text
  function updateProgress(achievement) {
    const checkboxes = document.querySelectorAll(`.${achievement.checkboxClass}`);
    const checkedCount = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;
    const progressElement = document.querySelector(achievement.progressSelector);
    progressElement.textContent = `[${checkedCount}/${achievement.totalItems}]`;
  }

  // Initialize achievements
  achievements.forEach(achievement => {
    const checkboxes = document.querySelectorAll(`.${achievement.checkboxClass}`);

    checkboxes.forEach((checkbox, index) => {
      // Load saved state from localStorage
      const savedState = localStorage.getItem(`${achievement.checkboxClass}_${index}`);
      if (savedState === 'checked') {
        checkbox.checked = true;
      }

      // Add event listener to save state and update progress
      checkbox.addEventListener('change', function () {
        localStorage.setItem(
          `${achievement.checkboxClass}_${index}`,
          checkbox.checked ? 'checked' : 'unchecked'
        );
        updateProgress(achievement);
      });
    });

    // Update progress on page load
    updateProgress(achievement);
  });
});
