const express = require('express');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');
const BodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10
const path = require("path");


app.use(cors());
app.use(BodyParser.json());
app.use(express.static(path.join(__dirname, "Front-End", "Login")))

const PORT = process.env.PORT || 8080;

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://shibinraja:karishma@cluster0-l5pvg.azure.mongodb.net/test?retryWrites=true&w=majority";

app.post('/registration', (req, res) => {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
        if (err) {
            console.log('Error occurred while connecting to MongoDB Atlas...\n', err);
        }
        console.log('Connected...');
        bcrypt.hash(req.body.Password, saltRounds, function (err, hash) {
            Details = [{
                Name: req.body.Username,
                DOB: req.body.DOB,
                Email: req.body.Email,
                Password: hash,
                Gender: req.body.Position,
                Profession: req.body.Profession

            }]
            let db = client.db("Testpress");
            db.collection("Registration").insertMany(Details, function (err, result) {
                if (err) throw err;
                res.json({
                    Message: "Submitted"
                });
                return
            });
            client.close()
        })
    });
});

app.post('/login', (req, res) => {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
        if (err) {
            console.log('Error occurred while connecting to MongoDB Atlas...\n', err);
        }
        console.log('Connected...')
        console.log(req.body.Password)

        let Email = { Email: req.body.Email }
        let db = client.db("Testpress");
        db.collection("Registration").findOne(Email, function (err, result) {
            bcrypt.compare(req.body.Password, result.Password, function (err, final) {

                console.log(final)
                if (final == true) {
                    res.json({
                        Profession: result.Profession,
                        Username: result.Name

                    })
                } else {
                    res.json({
                        Login: "Failed"
                    })
                }

            })


        });
        client.close();
    });
});

app.post('/questions', (req, res) => {
    console.log(req.body)
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
        if (err) {
            console.log('Error occurred while connecting to MongoDB Atlas...\n', err);
        }
        console.log('Connected...');

        let today = new Date();
        Details = [{

            username: req.body.username,
            Questions: req.body.final,
            time: today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
            date: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
        }]


        let db = client.db("Testpress");
        db.collection("Question").insertMany(Details, function (err, result) {
            if (err) throw err;
            res.json({
                Message: "Submitted"
            });
            return
        });
        client.close()
    });
});

app.get("/answers", (req, res) => {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
        if (err) throw err;

        let db = client.db("Testpress");
        cursor = db.collection("Question").find({}).sort({ _id: -1 }).limit(1).toArray();
        cursor.then(data => {
            res.json(data)
        });
        client.close();
    })
})

app.post("/scores", (req, res) => {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
        if (err) {
            console.log('Error occurred while connecting to MongoDB Atlas...\n', err);
        }
        console.log('Connected...');


        let today = new Date();
        Details = [{

            username: req.body.username,
            scores: req.body.scor,
            time: today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
            date: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
        }]

        let db = client.db("Testpress");
        db.collection("Scores").insertMany(Details, function (err, result) {
            if (err) throw err;
            res.json({
                Message: "Submitted"
            });
            return
        });
        client.close()
    });
})


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "Front-End", "Login", "index.html"))
});

app.listen(PORT, console.log(`Server is starting at ${PORT}`))