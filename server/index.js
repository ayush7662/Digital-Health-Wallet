require('dotenv').config();
const express = require("express")
const cors = require('cors');

const authRoutes = require('./routes/auth');
const reportRoutes = require('./routes/reports')
const vitalsRoutes = require('./routes/vitals')

const app = express()
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/vitals', vitalsRoutes);

app.get('',(req,res)=>{
    res.json({message : "ok"})
})

const PORT = 5000
app.listen(PORT, () =>{
    console.log(`Server running on http://localhost:${PORT}`)
})
