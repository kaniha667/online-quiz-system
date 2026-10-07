const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Online Quiz Server is Running!");
});

// Get all questions
app.get("/api/questions", (req, res) => {
    const sql = "SELECT id, question, option1, option2, option3, option4 FROM questions";

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Failed to get questions" });
        }

        res.json(results);
    });
});

app.post("/api/submit", (req, res) => {
    const { username, answers } = req.body;

    if (!username || !answers) {
        return res.status(400).json({
            error: "Username and answers are required"
        });
    }

    const sql = "SELECT id, answer FROM questions";

    db.query(sql, (err, questions) => {
        if (err) {
            return res.status(500).json({
                error: "Database error"
            });
        }

        let score = 0;

        questions.forEach(q => {
            if (answers[q.id] === q.answer) {
                score++;
            }
        });

        const total = questions.length;

        const insertSql =
            "INSERT INTO results (username, score, total) VALUES (?, ?, ?)";

        db.query(
            insertSql,
            [username, score, total],
            (err) => {
                if (err) {
                    return res.status(500).json({
                        error: "Failed to save result"
                    });
                }

                res.json({
                    message: "Quiz submitted successfully",
                    score: score,
                    total: total
                });
            }
        );
    });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});

app.post("/api/questions", (req, res) => {
    const { question, option1, option2, option3, option4, answer } = req.body;

    if (!question || !option1 || !option2 || !option3 || !option4 || !answer) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const sql = `
        INSERT INTO questions
        (question, option1, option2, option3, option4, answer)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [question, option1, option2, option3, option4, answer],
        (err) => {
            if (err) {
                return res.status(500).json({ error: "Failed to add question" });
            }

            res.json({ message: "Question added successfully" });
        }
    );
});

app.delete("/api/questions/:id", (req, res) => {
    const { id } = req.params;

    db.query(
        "DELETE FROM questions WHERE id = ?",
        [id],
        (err) => {
            if (err) {
                return res.status(500).json({ error: "Failed to delete question" });
            }

            res.json({ message: "Question deleted successfully" });
        }
    );
});