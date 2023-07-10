const bcrypt = require('bcrypt');

function staffCodeFormatter(number) {
    if (number >= 0 && number < 10) {
        return `YS-0${number}`;
    } else {
        return `YS-${number}`;
    }
};

async function generateHash(password) {
    try {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        return hash;
    } catch (error) {
        throw new Error(`Failed to generate hash: ${error.message}`);
    };
};


async function comparePassword(password, hash) {
    try {
        return await bcrypt.compare(password, hash)
    } catch (error) {
        throw new Error(`Failed to compare password and hash: ${error.message}`);
    }
}



module.exports = {
    staffCodeFormatter,
    generateHash,
    comparePassword,
}