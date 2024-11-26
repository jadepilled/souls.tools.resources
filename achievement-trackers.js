document.addEventListener('DOMContentLoaded', function () {
  const achievements = [
    {
      progressSelector: '#bond-pyromancer-progress',
      checkboxClass: 'bond_pyromancer-checkbox',
      totalItems: 19,
      achievementName: 'Bond of a Pyromancer Achievement (Obtain 19 pyromancies)'
    },
    {
      progressSelector: '#knights-honor-progress',
      checkboxClass: 'knights_honor-checkbox',
      totalItems: 49,
      achievementName: 'Knights Honor Achievement (Obtain 49 rare weapons)'
    },
    {
      progressSelector: '#wisdom-sage-progress',
      checkboxClass: 'wisdom_sage-checkbox',
      totalItems: 24,
      achievementName: 'Wisdom of a Sage Achievement (Obtain 24 sorceries)'
    },
    {
      progressSelector: '#prayer-maiden-progress',
      checkboxClass: 'prayer_maiden-checkbox',
      totalItems: 23,
      achievementName: 'Prayer of a Maiden Achievement (Obtain 23 miracles)'
    }
  ];

  // Function to update progress text
  function updateProgress(achievement) {
    const checkboxes = document.querySelectorAll(`.${achievement.checkboxClass}`);
    const checkedCount = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;
    const progressElement = document.querySelector(achievement.progressSelector);

    // Update the text content of the header
    progressElement.textContent = `${achievement.achievementName} [${checkedCount}/${achievement.totalItems}]`;
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
