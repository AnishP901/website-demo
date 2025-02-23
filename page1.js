document.addEventListener("DOMContentLoaded", function () {
    const jsonUrl = "/data/menu.json"; // Update with the actual JSON file path

    let menuData = {}; // This will hold the fetched menu data

    // Function to fetch JSON data
    async function fetchMenuData() {
        try {
            const response = await fetch(jsonUrl);
            menuData = await response.json();
            console.log("Menu Data Loaded:", menuData);
        } catch (error) {
            console.error("Error fetching menu data:", error);
        }
    }

    // Function to create and display the menu dropdown
    function createMenuDropdown(restaurantId) {
        const restaurantDiv = document.querySelector(`.${restaurantId}`);

        // Remove existing dropdown to avoid duplication
        if (restaurantDiv.querySelector(".dropdown-menu")) {
            return;
        }

        // Ensure menu data exists for this restaurant
        if (!menuData[restaurantId]) return;

        // Create menu dropdown container
        const dropdown = document.createElement("div");
        dropdown.classList.add("dropdown-menu");

        // Create tab navigation
        dropdown.innerHTML = `
            <div class="menu-tabs">
                <button class="tab active" data-meal="Breakfast">Breakfast</button>
                <button class="tab" data-meal="Lunch">Lunch</button>
                <button class="tab" data-meal="Dinner">Dinner</button>
            </div>
            <div class="menu-content"></div>
        `;

        // Append dropdown to the restaurant div
        restaurantDiv.appendChild(dropdown);

        // Function to show selected meal category
        function updateMenu(mealType) {
            const menuContent = dropdown.querySelector(".menu-content");
            const mealItems = menuData[restaurantId][mealType] || [];
            menuContent.innerHTML = mealItems.length
                ? `<ul>${mealItems.map(item => `<li>${item}</li>`).join("")}</ul>`
                : "<p>No items available</p>";

            // Update active tab
            dropdown.querySelectorAll(".tab").forEach(tab => {
                tab.classList.toggle("active", tab.dataset.meal === mealType);
            });
        }

        // Initialize with "Breakfast" menu
        updateMenu("Breakfast");

        // Add event listener to switch tabs
        dropdown.querySelectorAll(".tab").forEach(tab => {
            tab.addEventListener("mouseenter", function () {
                updateMenu(this.dataset.meal);
            });
        });

        // Remove menu when mouse leaves the restaurant div
        restaurantDiv.addEventListener("mouseleave", function () {
            dropdown.remove();
        });
    }

    // Fetch menu data and attach event listeners
    fetchMenuData().then(() => {
        Object.keys(menuData).forEach(restaurantId => {
            const restaurantDiv = document.querySelector(`.${restaurantId}`);
            if (restaurantDiv) {
                restaurantDiv.addEventListener("mouseenter", function () {
                    createMenuDropdown(restaurantId);
                });
            }
        });
    });
});
