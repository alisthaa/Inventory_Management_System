# Inventory_Management_System
Overview:
This project is an Inventory Management System designed to help users efficiently manage their products. It offers functionalities for viewing, adding, editing, and deleting products, along with providing essential statistics such as total products, total store value, and the number of products out of stock. Users are required to sign up and log in to access these functionalities.

Features:
1. User Authentication: Users must sign up and log in to access the system.
2. View Products: Logged-in users can browse through the list of available products.
3. Add Products: Logged-in users can add new products to the inventory. Each product includes details such as title, price, description, category, quantity, and an image.
4. Edit Products: Logged-in users can modify existing product details including title, price, description, category, quantity, and image.
5. Delete Products: Logged-in users can remove products from the inventory.
6. Statistics: The system provides statistics such as total products, total store value, and the number of products that are out of stock.

Technologies Used:
Frontend: MERN Stack (MongoDB, Express.js, React.js, Node.js)
Backend: Node.js, Express.js
Database: MongoDB
Authentication: JSON Web Tokens (JWT)
Validation: Joi for user validation

Setup Instructions:
1. Clone the repository.
2. Install dependencies for both frontend and backend.
3. Configure the database connection.
4. Run the application.

Usage:
1. Homepage:
-If the user is not logged in, they will see two buttons: "Login" and "Sign up". Click on these buttons to access the respective pages.
-If the user is logged in, they will see a button to navigate to the products page. Click on this button to view the list of products.

2. Products Page:
-Upon navigating to the products page, the user will see a table listing all the available products. Each row in the table displays the product's title, price, category, and quantity.
-For each product, there are "View", "Edit", and "Delete" buttons.
-Click on the "View" button to see detailed information about the product, including the description and image, along with other details like title, price, category, and quantity.

3. Statistics:
-On the products page, users can view important statistics related to the inventory.
-The statistics section provides information such as total number of products, total store value, and the number of products that are out of stock (products with quantity equal to zero).

