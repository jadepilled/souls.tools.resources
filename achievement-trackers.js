document.addEventListener('DOMContentLoaded', function () {
  const achievements = [
    {
      id: 'knights-honor-progress',
      totalItems: 49,
      localStorageKey: 'knights_honor'
    },
    {
      id: 'wisdom-sage-progress',
      totalItems: 24,
      localStorageKey: 'wisdom_sage'
    },
    {
      id: 'bond-pyromancer-progress',
      totalItems: 19,
      localStorageKey: 'bond_pyromancer'
    },
    {
      id: 'prayer-maiden-progress',
      totalItems: 23,
      localStorageKey: 'prayer_maiden'
    }
  ];

  // Helper function to update the progress text
  function updateProgress(achievement) {
    const checkboxes = document.querySelectorAll(`.${achievement.localStorageKey}-checkbox`);
    const checkedCount = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;
    const progressText = document.getElementById(achievement.id);
    progressText.textContent = `${progressText.dataset.name} [${checkedCount}/${achievement.totalItems}]`;
  }

  // Initialize each achievement
  achievements.forEach(achievement => {
    const checkboxes = document.querySelectorAll(`.${achievement.localStorageKey}-checkbox`);
    const progressText = document.getElementById(achievement.id);

    // Ensure each achievement displays its name in the `data-name` attribute
    progressText.dataset.name = progressText.textContent.split(' [')[0];

    checkboxes.forEach((checkbox, index) => {
      const savedState = localStorage.getItem(`${achievement.localStorageKey}_${index}`);
      if (savedState === 'checked') {
        checkbox.checked = true;
      }

      checkbox.addEventListener('change', function () {
        localStorage.setItem(
          `${achievement.localStorageKey}_${index}`,
          checkbox.checked ? 'checked' : 'unchecked'
        );
        updateProgress(achievement);
      });
    });

    // Update the progress on page load
    updateProgress(achievement);
  });
});
