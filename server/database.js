const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./health_wallet.db', (err) =>{
    if(err) console.log(err.message);
    else console.log('Connected to SQLite database')
});

db.serialize(() =>{
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        password TEXT
        
        
    )`);

 db.run(`
            CREATE TABLE IF NOT EXISTS reports(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            filename TEXT,
            type TEXT,
            report_date TEXT,
            user_id INTEGER,
            FOREIGN KEY(user_id) REFERENCES users(id) 
            )
            `);

    
});

db.run(`
    CREATE TABLE IF NOT EXISTS vitals(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    date TEXT,
    bp INTEGER,
    sugar INTEGER,
    heart_rate INTEGER,
    FOREIGN KEY(user_id) REFERENCES users(id)
    )`);


module.exports = db;