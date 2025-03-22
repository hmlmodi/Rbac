# API for Managing Users 

# Summary 

This project incorporates authentication along with user and role management. It offers a safe and scalable method to handle users and their roles, facilitating role-based access control (RBAC) for various modules. 

# Attributes 

User verification and access control 

Access control based on roles (RBAC) 

User and role management through CRUD operations 

Mass update for users 

Page navigation and search features 

# Technologies Employed 

Node.js ,Express.js ,Mongoose with MongoDB ,JWT Authentication 

# Setup 

        npm install 

        npm run start 

# API Access Points 

Verification 

        POST /login - Authenticate user 

        POST /register - Creating a user account 

Management of Users 

        GET /users - Retrieve all users (includes pagination and search capabilities) 

        FETCH /users/:userId - Retrieve user by ID 

        PATCH /users/:userId - Modify user information 

        REMOVE /users/:userId - Eliminate user 

        PUT /users/bulk-modify - Update multiple users at once 


Management of Roles 

        POST /roles - Add a new role 

        FETCH /roles - Retrieve all roles 

        FETCH /roles/:roleId - Retrieve role using ID 

        PATCH /roles/:roleId - Modify role 

        REMOVE /roles/:roleId - Remove role 

        GET /roles/:roleId - Verify user authorization for a module 
# Rbac
