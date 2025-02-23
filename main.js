document.addEventListener("DOMContentLoaded", function () {
    // List of restaurant IDs with sample menu items (to be replaced with dynamic JSON data)
    const restaurants = {
        "northdeli-background": ["Turkey Sandwich", "Ham & Cheese Wrap", "Roast Beef Sub"],
        "bakery-background": ["Chocolate Chip Cookies", "Blueberry Muffins", "Croissants"],
        "cstreetgrill-background": ["Cheeseburger", "Grilled Chicken Sandwich", "French Fries"],
        "omeletbar-background": ["Spinach Omelet", "Bacon Omelet", "Cheese Omelet"],
        "pizza-background": ["Pepperoni Pizza", "Margherita Pizza", "BBQ Chicken Pizza"],
        "quimbys-background": ["Chicken Caesar Wrap", "Turkey Club", "Vegan Wrap"],
        "rotisserie-background": ["Grilled Chicken", "BBQ Ribs", "Mashed Potatoes"],
        "saladbar-background": ["Caesar Salad", "Greek Salad", "Garden Salad"],
        "soups-background": ["Tomato Soup", "Chicken Noodle Soup", "Minestrone"],
        "veganloop-background": ["Tofu Stir Fry", "Vegan Burger", "Quinoa Salad"],
        "wok-background": ["General Tso's Chicken", "Beef Stir Fry", "Vegetable Lo Mein"]
    };

    // Function to create dropdowns dynamically
    function createDropdown(restaurantId, menuItems) {
        const restaurantDiv = document.querySelector(`.${restaurantId}`);

        // Check if dropdown already exists to avoid duplicates
        if (restaurantDiv.querySelector(".dropdown-menu")) {
            restaurantDiv.querySelector(".dropdown-menu").remove();
            return;
        }

        // Create dropdown menu
        const dropdown = document.createElement("div");
        dropdown.classList.add("dropdown-menu");
        dropdown.innerHTML = `<ul>${menuItems.map(item => `<li>${item}</li>`).join("")}</ul>`;

        // Append dropdown to restaurant div
        restaurantDiv.appendChild(dropdown);
    }

    // Add click event listener to each restaurant section
    Object.keys(restaurants).forEach(restaurantId => {
        document.querySelector(`.${restaurantId}`).addEventListener("click", function () {
            createDropdown(restaurantId, restaurants[restaurantId]);
        });
    });
});
