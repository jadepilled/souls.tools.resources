<script>
document.addEventListener("DOMContentLoaded", function () {
    const dropdownToggles = document.querySelectorAll(".mobile-dropdown-toggle");

    dropdownToggles.forEach((toggle) => {
        toggle.addEventListener("click", function () {
            // Toggle aria-expanded state
            const isExpanded = toggle.getAttribute("aria-expanded") === "true";
            toggle.setAttribute("aria-expanded", !isExpanded);
        });
    });
});


  
</script>