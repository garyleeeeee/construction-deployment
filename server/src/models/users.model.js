const User = require('./users.mongo');
const { staffCodeFormatter, generateHash, comparePassword } = require('../utils/utils');

// Get All Users
async function getAllUsers() {
    return await User.find();
};

// Add a new user to database
async function addNewUser(name, password, phoneNumber) {
    try {
        // Get all users
        const UsersArray = await getAllUsers();

        // Generate staffCode based on the number of users
        const formattedStaffCode = staffCodeFormatter(UsersArray.length);

        // Generate a hashed password
        const hash = await generateHash(password);

        // Create a new user instance
        const newUser = new User({
            name,
            password: hash,
            staffCode: formattedStaffCode,
            phoneNumber
        });

        // Save the new user to the database
        const savedUser = await newUser.save();

        // Remove password before sending it back to frontend for security reasons
        savedUser.password = undefined;
        return savedUser;
    } catch (error) {
        console.error(error); // log the error
        throw error; // throw the error so it can be caught by the caller
    }
};

// Sign in a user
async function signInUser(staffCode, password) {
    try {
        const user = await findUserByStaffCode(staffCode);
        const isCorrect = await comparePassword(password, user.password);
        if (isCorrect) {
            user.password = undefined;
            return user;
        } else {
            throw new Error('Invalid Credentials');
        }
    } catch (error) {
        console.error(error.message)
        throw error
    }
}

// Assign a new role to a user
async function updateUserRole(staffCode, newRole) {
    const user = await findUserByStaffCode(staffCode);
    // Found user
    if (user) {
        user.role = newRole; // Set new role
        try {
            await user.save(); // This will validate the document before saving
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    } else {
        return false;
    };
}

// Find a staff by staffCode
async function findUserByStaffCode(staffCode) {
    try {
        // Search for a user by staffCode
        const user = await User.findOne({staffCode});

        // If a user is found, return the user
        if(user) return user;

        // If no user is found, return a custom error
        else throw new Error(`No user found with staff code: ${staffCode}`);
    } catch (error) {
        console.error(error);
        throw error;
    }
};


module.exports = {
    getAllUsers,
    findUserByStaffCode,
    addNewUser,
    updateUserRole,
    signInUser
}