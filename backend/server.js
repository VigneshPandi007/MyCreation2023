const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(express.json());


app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud"
 })

app.get("/", (req, res) => {
    const sql = "SELECT * FROM students";
    db.query(sql, (err, data) => {
        if(err) return app.json("Error");
        return res.json(data);
    })
})

app.post('/create', (req, res) => {
    const sql = "INSERT INTO students ('FirstName', 'LastName', 'Location', 'Email', 'DOB', 'Education') VALUES (?)";
    const values = [
        req.body.FirstName,
        req.body.LastName,
        req.body.Location, 
        req.body.Email,
        req.body.DOB,
        req.body.Education
    ]
    db.query(sql, [values], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.put('/update/:id', (req, res) => {
    const sql = "UPDATE students SET FirstName = ?, LastName = ?, Location = ?, Email = ?, DOB = ?, Education = ?s WHERE ID = ?";
    const values = [
        req.body.FirstName,
        req.body.LastName,
        req.body.Location, 
        req.body.Email,
        req.body.DOB,
        req.body.Education
    ]
    const id = req.body.params.id;

    db.query(sql, [...values, id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.delete('/students/:id', (req, res) => {
    const sql = "DELETE FROM students WHERE ID = ?";
    const id = req.body.params.id;

    db.query(sql, [id], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})


app.listen(8081, () => {
    console.log("listening");
})