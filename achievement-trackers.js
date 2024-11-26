document.addEventListener('DOMContentLoaded', function () {
  const achievements = [
    {
      id: 'bond_pyromancer-progress',
      checkboxClass: 'bond_pyromancer-checkbox',
      totalItems: 19,
      title: 'Bond of a Pyromancer Achievement (Obtain 19 pyromancies)'
    },
    {
      id: 'knights_honor-progress',
      checkboxClass: 'knights_honor-checkbox',
      totalItems: 49,
      title: 'Knights Honor Achievement (Obtain 49 rare weapons)'
    },
    {
      id: 'wisdom_sage-progress',
      checkboxClass: 'wisdom_sage-checkbox',
      totalItems: 24,
      title: 'Wisdom of a Sage Achievement (Obtain 24 sorceries)'
    },
    {
      id: 'prayer_maiden-progress',
      checkboxClass: 'prayer_maiden-checkbox',
      totalItems: 23,
      title: 'Prayer of a Maiden Achievement (Obtain 23 miracles)'
    }
  ];

  function updateProgress(achievement) {
    const checkboxes = document.querySelectorAll(`.${achievement.checkboxClass}`);
    console.log(`${achievement.id}: Updating progress. Checkboxes found: ${checkboxes.length}`);
    const checkedCount = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;

    const progressElement = document.getElementById(achievement.id);
    if (progressElement) {
      progressElement.textContent = `${achievement.title} [${checkedCount}/${achievement.totalItems}]`;
    } else {
      console.error(`Progress element not found for ID: ${achievement.id}`);
    }
  }

  achievements.forEach(achievement => {
    console.log(`Initializing: ${achievement.id}`);
    const checkboxes = document.querySelectorAll(`.${achievement.checkboxClass}`);
    console.log(`${achievement.id}: Found ${checkboxes.length} checkboxes.`);

    checkboxes.forEach((checkbox, index) => {
      const savedState = localStorage.getItem(`${achievement.checkboxClass}_${index}`);
      if (savedState === 'checked') {
        checkbox.checked = true;
      }

      checkbox.addEventListener('change', () => {
        localStorage.setItem(
          `${achievement.checkboxClass}_${index}`,
          checkbox.checked ? 'checked' : 'unchecked'
        );
        updateProgress(achievement);
      });
    });

    updateProgress(achievement);
  });
});
