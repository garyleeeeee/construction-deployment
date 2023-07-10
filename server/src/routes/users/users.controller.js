const { 
    getAllUsers,
    addNewUser,
    updateUserRole,
    signInUser
} = require('../../models/users.model');

// Get All users
async function httpGetAllUsers(req, res) {
    try {
        const usersList = await getAllUsers();
        if (!usersList) {
            return res.status(400).json({ error: 'Failed to get all users' });
        };
        return res.status(200).json({users: usersList});
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

// Create new user
async function httpAddNewUser(req, res) {
    try {
        const userData = req.body;
        const { name, password, inviteCode, phoneNumber } = userData;

        // Data null
        if (!name || !password || !inviteCode || !phoneNumber) {
            return res.status(400).json({ error: 'User data missing' });
        }

        // Verify inviteCode
        if (inviteCode !== process.env.INVITECODE) {
            return res.status(400).json({ error: 'Wrong InviteCode' });
        };

        // Save User to database
        const savedUser = await addNewUser(name, password, phoneNumber);

        // If the user could not be saved, return an error
        if (!savedUser) {
            return res.status(400).json({ error: 'Failed to save new user' });
        }

        // If everything went well, return the saved user
        return res.status(200).json({user: savedUser});

    } catch (error) {
        // If there's an error, return a message with the error
        return res.status(400).json({ error: error.message });
    }
};

// Sign in a user
async function httpSignInUser(req, res) {
    try {
        const { staffCode, password } = req.body;

        if (!staffCode || !password) {
            return res.status(400).json({error: 'User data missing'});
        };
        const user = await signInUser(staffCode, password);
        if (!user) {
          return res.status(400).json({error: 'Failed to log in'})  
        }
        return res.status(200).json({user});
    } catch (error) {
        // If there's an error, return a message with the error
        return res.status(400).json({ error: error.message });
    }
}

// Update user's role
const httpUpdateUserRole = async (req, res) => {
    try {
        const { staffCode, newRole } = req.body;

        // Validate input: check if staffCode and newRole are not empty
        if (!staffCode || !newRole) {
            return res.status(400).json({ error: 'Bad request: staffCode and newRole are required.' });
        }

        const updateSucceeded = await updateUserRole(staffCode, newRole);

        if (updateSucceeded) {
            return res.status(200).json({message: `Successfully updated role to '${newRole}'`});
        } else {
            return res.status(400).json({error: "Failed to update role"});
        }
    } catch (error) {
        return res.status(400).json({ error: error.message});
    }
};



module.exports = {
    httpGetAllUsers,
    httpAddNewUser,
    httpUpdateUserRole,
    httpSignInUser,
}