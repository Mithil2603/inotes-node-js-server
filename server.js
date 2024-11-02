require('dotenv').config({ path: 'my.env' });
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors({ origin: '*' })); // Enables CORS for all origins
app.use(express.json());

// Set up MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER, 
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err){
    console.log(err);
  }
  else{
    console.log('Connected to MySQL');
  }
});

// Define a route to get data from MySQL
app.get('/api/topics', (req, res) => {
  const sql = 'SELECT * FROM dcn';
  db.query(sql, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});