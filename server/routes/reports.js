const express = require('express');
const multer = require('multer');
const db = require('../database');
const auth = require('../middleware/auth');

const router = express.Router();

// ----------------------------
// Multer storage configuration
// ----------------------------
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ 
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
        // Allow only PDF, JPG, PNG
        if (!file.originalname.match(/\.(pdf|jpg|jpeg|png)$/i)) {
            return cb(new Error('Only PDF, JPG, PNG files are allowed'));
        }
        cb(null, true);
    }
});

// ----------------------------
// Upload report
// ----------------------------
router.post('/upload', auth, upload.single('report'), (req, res) => {
    const { type, report_date } = req.body;

    if (!req.file) {
        return res.status(400).json({ error: 'Report file is required' });
    }

    db.run(
        `INSERT INTO reports(filename, type, report_date, user_id)
        VALUES (?,?,?,?)`,
        [req.file.filename, type, report_date, req.user.id],
        function(err) {
            if (err) return res.status(500).json({ error: 'Database error' });

            res.json({
                message: 'Report uploaded successfully',
                reportId: this.lastID,
                filename: req.file.filename,
                type,
                report_date
            });
        }
    );
});

// ----------------------------
// Get all reports for logged-in user
// ----------------------------
router.get('/', auth, (req, res) => {
    db.all(
        'SELECT * FROM reports WHERE user_id = ?',
        [req.user.id],
        (err, rows) => {
            if (err) return res.status(500).json({ error: 'Database error' });
            res.json(rows);
        }
    );
});

module.exports = router;
