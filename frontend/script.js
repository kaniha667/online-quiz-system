let questions = [];
let timeLeft = 60;
let timer;

async function loadQuestions() {

    const response = await fetch("http://localhost:5000/api/questions");

    questions = await response.json();

    const quiz = document.getElementById("quiz");

    quiz.innerHTML = "";

    questions.forEach((q, index) => {

        quiz.innerHTML += `
            <div class="question">

                <h3>${index + 1}. ${q.question}</h3>

                <label>
                    <input type="radio" name="q${q.id}" value="${q.option1}">
                    ${q.option1}
                </label>

                <label>
                    <input type="radio" name="q${q.id}" value="${q.option2}">
                    ${q.option2}
                </label>

                <label>
                    <input type="radio" name="q${q.id}" value="${q.option3}">
                    ${q.option3}
                </label>

                <label>
                    <input type="radio" name="q${q.id}" value="${q.option4}">
                    ${q.option4}
                </label>

            </div>
        `;
    });

    updateProgress();
}


function updateProgress() {

    let answered = 0;

    questions.forEach(q => {

        const selected = document.querySelector(
            `input[name="q${q.id}"]:checked`
        );

        if (selected) {
            answered++;
        }
    });

    const progressText = document.getElementById("progressText");
    const progressFill = document.querySelector(".progress-fill");

    progressText.innerText = `${answered} / ${questions.length}`;

    const percentage = (answered / questions.length) * 100;

    progressFill.style.width = `${percentage}%`;
}


document.addEventListener("change", function(event) {

    if (event.target.type === "radio") {
        updateProgress();
    }

});


async function submitQuiz() {

    clearInterval(timer);

    const answers = {};

    questions.forEach(q => {

        const selected = document.querySelector(
            `input[name="q${q.id}"]:checked`
        );

        if (selected) {
            answers[q.id] = selected.value;
        }
    });

    const username = prompt("Enter your name:");

    if (!username) {
        startTimer();
        return;
    }

    const response = await fetch(
        "http://localhost:5000/api/submit",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                username: username,
                answers: answers
            })
        }
    );

    const result = await response.json();

    document.getElementById("result").innerText =
        `Your Score: ${result.score} / ${result.total}`;

    document.getElementById("submitBtn").disabled = true;
}


function startTimer() {

    timer = setInterval(() => {

        timeLeft--;

        document.getElementById("timer").innerText =
            `${timeLeft}s`;

        if (timeLeft <= 0) {

            clearInterval(timer);

            submitQuiz();
        }

    }, 1000);
}


loadQuestions();
startTimer();