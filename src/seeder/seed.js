require('dotenv').config();


const mongoose = require('mongoose');
const Role = require('../models/role.model');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const seedRoles = async () => {
    try {
        await Role.insertMany([
            { roleName: "admin", accessModules: ["users", "roles", "dashboard"], active: true, createdAt: new Date() },
            { roleName: "editor", accessModules: ["articles", "comments"], active: true, createdAt: new Date() },
            { roleName: "viewer", accessModules: ["dashboard"], active: true, createdAt: new Date() }
        ]);
        console.log("Roles inserted successfully!");
        mongoose.connection.close();
    } catch (error) {
        console.error("Error inserting roles:", error);
        mongoose.connection.close();
    }
};

seedRoles();
