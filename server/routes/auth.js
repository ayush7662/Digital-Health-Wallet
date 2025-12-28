const express = require('express');
const bcrypt = require('bcryptjs'); // safer on Windows/Node 22
const jwt = require('jsonwebtoken');
const db = require('../database')

const router = express.Router();
const SECRET = process.env.JWT_SECRET; // use .env

// REGISTER
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        const hashed = await bcrypt.hash(password, 10);

        db.run(
            'INSERT INTO users (email, password) VALUES (?, ?)',
            [email, hashed],
            function (err) {
                if (err) return res.status(400).json({ error: 'User already exists' });
                res.status(201).json({ message: 'User registered successfully' });
            }
        );
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// LOGIN
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.get(
        'SELECT * FROM users WHERE email = ?',
        [email],
        async (err, user) => {
            if (!user) return res.status(401).json({ error: 'Invalid credentials' });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

            const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: '1d' });
            res.json({ token });
        }
    );
});

module.exports = router;
