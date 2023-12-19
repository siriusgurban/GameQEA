const questions = [
    {
        title: "Question 1",
        trueAnswer: "answer1",
        variants: ["answer1", "answer2", "answer3"],
    },
    {
        title: "Question 2",
        trueAnswer: "answer2",
        variants: ["answer1", "answer2", "answer3"],
    },
    {
        title: "Question 3",
        trueAnswer: "answer1",
        variants: ["answer1", "answer2", "answer3"],
    },
    {
        title: "Question 4",
        trueAnswer: "answer3",
        variants: ["answer1", "answer2", "answer3"],
    },
    {
        title: "Question 5",
        trueAnswer: "answer2",
        variants: ["answer1", "answer2", "answer3"],
    },
    {
        title: "Question 6",
        trueAnswer: "answer3",
        variants: ["answer1", "answer2", "answer3"],
    },
    {
        title: "Question 7",
        trueAnswer: "answer2",
        variants: ["answer1", "answer2", "answer3"],
    },
];

class QuestionGame {
    point = 0;
    nextQIndex = -1;
    qData = [];
    currentQuestion = null;
    progressBarPercentage = 0

    constructor(data) {
        this.qData = data;
    }

    nextQuestion() {
        if (this.nextQIndex == this.qData.length - 1) {
            console.log("oyun bitdi...");

            return false;
        } else {
            this.nextQIndex += 1;

            const questionItem = this.qData[this.nextQIndex];

            this.currentQuestion = questionItem;

            return questionItem;
        }
    }

    incrementPoint() {
        this.progressBarPercentage = this.progressBarPercentage + this.point;
        return this.progressBarPercentage;
    }
}

//?---------------------------

const qTitle = document.querySelector("#qTitle");
const btnGroup = document.querySelector("#btnGroup");

const gameQ = new QuestionGame(questions);

function startGame() {
    gameQ.nextQuestion();

    const qObj = gameQ.currentQuestion;
    qTitle.innerHTML = qObj.title;

    btnGroup.innerHTML = qObj.variants
        .map(
            (item) =>
                `<button class="btn btn-outline-light"  onclick="selectItem('${item}')">A. ${item}</button>`
        )
        .join("");

    console.log(qObj);
}

startGame();

let answerBg = document.querySelector("#answerBg");
let yourPoint = document.querySelector("#yourPoint");
let progressBar = document.querySelector(".progress-bar");
let finish = document.querySelector("#finish");


function selectItem(userChoose) {
    if (gameQ.currentQuestion.title == "Question 7") {
        finish.innerHTML = "Finished";
    } else {
        if (userChoose == gameQ.currentQuestion.trueAnswer) {
            console.log("duz tapdi");
            gameQ.point++;
            yourPoint.innerHTML = gameQ.point;

            if (answerBg.classList.contains("bg-warning")) {
                answerBg.classList.remove("bg-warning");
                answerBg.classList.add("bg-success");
                progressBar.style.width = `${gameQ.incrementPoint() * 10}%`;
            } else if (answerBg.classList.contains("bg-danger")) {
                answerBg.classList.remove("bg-danger");
                answerBg.classList.add("bg-success");
                progressBar.style.width = `${gameQ.incrementPoint() * 10}%`;
            }

        } else {
            console.log("sehf tapdi");
            if (answerBg.classList.contains("bg-warning")) {
                answerBg.classList.remove("bg-warning");
                answerBg.classList.add("bg-danger");
            } else if (answerBg.classList.contains("bg-success")) {
                answerBg.classList.remove("bg-success");
                answerBg.classList.add("bg-danger");
            }

        }
    }



    startGame();


}