const express  = require('express');
const db = require('../database');
const auth = require('../middleware/auth');

const router = express.Router();


router.post('/',auth, (req,res) =>{
    const{date,bp, sugar, heart_rate} = req.body;

    db.run(
        `INSERT INTO vitals (user_id, date, bp, sugar, heart_rate)
        VALUES(?,?,?,?,?)`,
        [req.user.id, date, bp, sugar, heart_rate],
        () => res.json({message: 'Vitals added'})
    )
})

router.get('/',auth,(req,res) =>{
    db.all(
        `SELECT * FROM vitals WHERE user_id = ? ORDER BY date`,
        [req.user.id],
        (err, rows) => res.json(rows)
    )
})

module.exports = router;