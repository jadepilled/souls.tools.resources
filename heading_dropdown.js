<script>
document.addEventListener('DOMContentLoaded', () => {
    const contentArea = document.querySelector('.page-content'); // Adjust selector as needed
    if (!contentArea) return;

    const headings = Array.from(contentArea.querySelectorAll('h2, h3, h4, h5, h6')); // Exclude <h1>

    let currentStack = []; // Stack to manage parent details elements

    headings.forEach((heading) => {
        const level = parseInt(heading.tagName.slice(1));

        // Skip <h4> elements with the class 'stats-list'
        if (heading.tagName === 'H4' && heading.classList.contains('stats-list')) {
            return;
        }

        // Create a new <details> and <summary> for the current heading
        const details = document.createElement('details');

        // Collapse by default if the heading has class 'dialogue' or 'newgameplus'
        if (heading.classList.contains('dialogue') || heading.classList.contains('newgameplus')) {
            details.open = false;
        } else {
            details.open = true; // Open by default for other headings
        }

        const summary = document.createElement('summary');
        summary.textContent = heading.textContent;

        // Append summary to details and replace heading with details
        details.appendChild(summary);
        heading.replaceWith(details);

        // Move all following siblings into the current <details> until the next heading
        let sibling = details.nextSibling;
        while (sibling && (!sibling.tagName || !sibling.tagName.match(/^H[2-6]$/i))) {
            const nextSibling = sibling.nextSibling; // Save the next sibling
            details.appendChild(sibling);           // Move current sibling into details
            sibling = nextSibling;                 // Move to the next sibling
        }

        // Handle nesting: Attach this <details> to the correct parent
        while (currentStack.length && currentStack[currentStack.length - 1].level >= level) {
            currentStack.pop(); // Remove higher or equal level parents from stack
        }

        if (currentStack.length) {
            currentStack[currentStack.length - 1].element.appendChild(details);
        }

        // Push the current <details> onto the stack
        currentStack.push({ level, element: details });
    });
});

</script>