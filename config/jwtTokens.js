// Importing the 'jsonwebtoken' library for handling JSON Web Tokens (JWT)
const jwt = require('jsonwebtoken');

// Function to generate a JWT token based on a provided user ID
const generateToken = (id) => {
    // Using the 'jsonwebtoken' library to sign a token with the provided user ID
    // The 'process.env.JWT_SECRECT' is the secret key used to sign the token
    // The token will expire after 3 days ('3d')
    const token = jwt.sign({ id }, process.env.JWT_SECRECT, { expiresIn: '3d' });

    // Returning the generated token
    return token;
};

// Exporting the 'generateToken' function for use in other parts of the application
module.exports = { generateToken };
