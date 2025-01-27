const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Your User model
const router = express.Router();

// POST: Store logout time for an existing user
router.post('/logout', async (req, res) => {
    const { logoutTimes, email, latitude, longitude } = req.body; 
    console.log(email, logoutTimes);

    // Check for JWT token in the Authorization header
    const authToken = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    console.log('stored token:', authToken);  // This will print the token to the console

    if (!authToken) {
        return res.status(401).json({ message: 'JWT must be provided' });
    }

    try {
        const decoded = jwt.verify(authToken, process.env.JWT_SECRET); 
        // Proceed if JWT is valid
        console.log('Decoded JWT:', decoded);
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }

    // Validation to ensure that email, logoutTimes, latitude, and longitude are provided
    if (!logoutTimes || !email || !latitude || !longitude) {
        return res.status(400).json({ message: 'All fields (logoutTimes, email, latitude, longitude) are required.' });
    }

    try {
        // Check if the user exists by email
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // If logoutTimes does not exist, initialize it
        if (!user.logoutTimes) {
            user.logoutTimes = [];
        }

        // Convert the logout time to IST (India Standard Time)
        const newLogoutTime = new Date(logoutTimes); // Provided logout time (usually in UTC)

        // IST is UTC+5:30, so we need to adjust the time to IST
        const offset = 5.5 * 60; // 5.5 hours in minutes
        const istLogoutTime = new Date(newLogoutTime.getTime() + offset * 60000); // Adjust to IST

        // Add the new logout entry with latitude and longitude
        user.logoutTimes.push({
            time: istLogoutTime,
            latitude: latitude.toString(),
            longitude: longitude.toString(),
        });

        // Save the updated user document
        await user.save();

        // Respond with the user's name, email, and updated logout times
        res.status(200).json({
            message: 'Logout time and location stored successfully',
            user: {
                name: user.name,
                email: user.email,
                logoutTimes: user.logoutTimes,
            },
        });
    } catch (error) {
        console.error('Error storing logout time:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
