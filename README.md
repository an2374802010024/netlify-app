# PhoneStore PHP Admin Panel

This is a simple PhoneStore application with an admin panel built using PHP. It allows administrators to view, add, edit, and delete products in the store.

## Features

- User-friendly store frontend
- Admin panel with authentication
- Product management (CRUD operations)
- Responsive design

## Files Structure

- `index.php` - The main store page
- `admin.php` - The admin panel (requires login)
- `login.php` - Admin login page
- `logout.php` - Admin logout functionality
- `style.css` - Main styling for the store
- `admin.css` - Styling for the admin panel
- `script.js` - JavaScript for the store frontend
- `admin.js` - JavaScript for the admin panel

## How to Use

### Store Frontend

1. Access the store by opening `index.php` in your web browser
2. Browse products, view details, etc.
3. Click on "Admin Login" to access the admin panel

### Admin Panel

1. Navigate to the "Admin Login" page
2. Use the following credentials to log in:
   - Username: `admin`
   - Password: `admin123`
3. Once logged in, you can:
   - View all products
   - Add new products
   - Edit existing products
   - Delete products
4. Click "Back to Store" to return to the main store page
5. Click "Logout" to end your admin session

## Implementation Details

- The application uses PHP sessions for authentication
- Product data is stored in the browser's localStorage (in a real application, this would use a database)
- The admin can switch between the admin panel and the store easily

## Security Notes

This is a simple implementation for demonstration purposes. In a production environment, you should:

1. Use a proper database instead of localStorage
2. Implement stronger authentication mechanisms
3. Use password hashing
4. Implement CSRF protection
5. Use prepared statements for database queries
6. Validate all input data

## Requirements

- PHP 7.0 or higher
- Web server (Apache, Nginx, etc.)
- Web browser with JavaScript enabled

## License

This project is open-source and available under the MIT license.
