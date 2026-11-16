
/* =========================================
   SAMIRA | BEYOND THE ATOM
   Interactive JavaScript
========================================= */


/* 1. LOADING SCREEN */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.classList.add("hidden");
    }, 900);

});


/* 2. FLOATING PARTICLES */

const particlesContainer = document.getElementById("particles");

function createParticles() {

    const particleCount = window.innerWidth < 768 ? 25 : 55;

    particlesContainer.innerHTML = "";

    for (let i = 0; i < particleCount; i++) {

        const particle = document.createElement("span");

        particle.classList.add("particle");

        particle.style.left = Math.random() * 100 + "%";

        particle.style.animationDuration =
            (Math.random() * 15 + 8) + "s";

        particle.style.animationDelay =
            (Math.random() * 10) + "s";

        particle.style.width =
            (Math.random() * 3 + 1) + "px";

        particle.style.height = particle.style.width;

        particlesContainer.appendChild(particle);

    }

}

createParticles();


/* 3. MOBILE NAVIGATION */

const menuToggle = document.getElementById("menuToggle");

const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    const icon = menuToggle.querySelector("i");

    if (navLinks.classList.contains("active")) {

        icon.classList.replace("fa-bars", "fa-xmark");

    } else {

        icon.classList.replace("fa-xmark", "fa-bars");

    }

});


/* CLOSE MENU AFTER CLICK */

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        const icon = menuToggle.querySelector("i");

        icon.classList.replace("fa-xmark", "fa-bars");

    });

});


/* 4. DARK / LIGHT MODE */

const themeToggle = document.getElementById("themeToggle");

const themeIcon = themeToggle.querySelector("i");

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    const isLight =
        document.body.classList.contains("light-mode");

    themeIcon.className = isLight
        ? "fa-solid fa-moon"
        : "fa-solid fa-sun";

});


/* 5. READING PROGRESS */

const progressBar = document.getElementById("progressBar");

function updateReadingProgress() {

    const scrollTop = window.scrollY;

    const pageHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress =
        pageHeight > 0
            ? (scrollTop / pageHeight) * 100
            : 0;

    progressBar.style.width = progress + "%";

}

window.addEventListener("scroll", updateReadingProgress);


/* 6. BACK TO TOP */

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* 7. SCROLL REVEAL ANIMATION */

const revealElements = document.querySelectorAll(
    ".section-heading, .intro-content, .timeline-item, .article-block, .legacy-content, .quiz-container"
);

revealElements.forEach(element => {

    element.classList.add("reveal");

});

const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);

revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* 8. QUIZ DATA */

const quizQuestions = [

    {
        question: "في أي عام وُلدت سميرة موسى؟",

        options: [
            "1910",
            "1917",
            "1920",
            "1925"
        ],

        correct: 1,

        explanation:
            "وُلدت سميرة موسى في 3 مارس عام 1917."
    },

    {
        question: "في أي محافظة وُلدت سميرة موسى؟",

        options: [
            "القاهرة",
            "الإسكندرية",
            "الغربية",
            "المنوفية"
        ],

        correct: 2,

        explanation:
            "وُلدت في قرية سنبو الكبرى بمحافظة الغربية."
    },

    {
        question: "ما التخصص الذي درسته سميرة موسى؟",

        options: [
            "الطب",
            "الفيزياء",
            "الكيمياء الحيوية",
            "الهندسة"
        ],

        correct: 1,

        explanation:
            "درست الفيزياء في كلية العلوم بجامعة فؤاد الأول."
    },

    {
        question: "من العالم الذي دعم تعيينها بالجامعة؟",

        options: [
            "أحمد زويل",
            "علي مصطفى مشرفة",
            "مصطفى مشرفة",
            "فاروق الباز"
        ],

        correct: 2,

        explanation:
            "دعمها أستاذها العالم مصطفى مشرفة في حقها بالتعيين."
    },

    {
        question: "ما الفكرة التي سعت إلى نشرها؟",

        options: [
            "الذرة من أجل السلام",
            "الطاقة من أجل الحرب",
            "العلم من أجل الشهرة",
            "التكنولوجيا من أجل التجارة"
        ],

        correct: 0,

        explanation:
            "آمنت بأن الطاقة النووية يجب أن تُستخدم لخدمة البشرية."
    }

];


/* 9. QUIZ ELEMENTS */

const questionText = document.getElementById("questionText");

const quizOptions = document.getElementById("quizOptions");

const questionCounter = document.getElementById("questionCounter");

const quizScore = document.getElementById("quizScore");

const quizProgress = document.getElementById("quizProgress");

const quizFeedback = document.getElementById("quizFeedback");

const nextQuestion = document.getElementById("nextQuestion");


/* 10. QUIZ VARIABLES */

let currentQuestion = 0;

let score = 0;

let answered = false;


/* 11. LOAD QUESTION */

function loadQuestion() {

    answered = false;

    const question = quizQuestions[currentQuestion];

    questionText.textContent = question.question;

    questionCounter.textContent =
        `QUESTION ${String(currentQuestion + 1).padStart(2, "0")} / ${quizQuestions.length}`;

    quizScore.textContent = `SCORE: ${score}`;

    quizProgress.style.width =
        ((currentQuestion + 1) / quizQuestions.length) * 100 + "%";

    quizFeedback.textContent = "";

    quizOptions.innerHTML = "";

    question.options.forEach((option, index) => {

        const button = document.createElement("button");

        button.className = "quiz-option";

        button.textContent = option;

        button.addEventListener("click", () => {

            checkAnswer(index, button);

        });

        quizOptions.appendChild(button);

    });

    nextQuestion.disabled = true;

    nextQuestion.classList.remove("visible");

}


/* 12. CHECK ANSWER */

function checkAnswer(selectedIndex, selectedButton) {

    if (answered) return;

    answered = true;

    const question = quizQuestions[currentQuestion];

    const allOptions =
        document.querySelectorAll(".quiz-option");

    const isCorrect =
        selectedIndex === question.correct;

    if (isCorrect) {

        score++;

        selectedButton.classList.add("correct");

        quizFeedback.textContent =
            "إجابة صحيحة! 👏 " + question.explanation;

        quizFeedback.style.color = "#2ecc71";

    } else {

        selectedButton.classList.add("wrong");

        allOptions[question.correct].classList.add("correct");

        quizFeedback.textContent =
            "مش دي الإجابة الصحيحة! " + question.explanation;

        quizFeedback.style.color = "#ff7385";

    }

    allOptions.forEach(button => {

        button.disabled = true;

    });

    quizScore.textContent = `SCORE: ${score}`;

    nextQuestion.disabled = false;

    nextQuestion.classList.add("visible");

    if (currentQuestion === quizQuestions.length - 1) {

        nextQuestion.innerHTML =
            'عرض النتيجة <i class="fa-solid fa-trophy"></i>';

    } else {

        nextQuestion.innerHTML =
            'السؤال التالي <i class="fa-solid fa-arrow-left"></i>';

    }

}


/* 13. NEXT QUESTION */

nextQuestion.addEventListener("click", () => {

    if (nextQuestion.disabled) return;

    currentQuestion++;

    if (currentQuestion < quizQuestions.length) {

        loadQuestion();

    } else {

        showQuizResult();

    }

});


/* 14. FINAL RESULT */

function showQuizResult() {

    const percentage =
        (score / quizQuestions.length) * 100;

    let message;
    let icon;

    if (percentage === 100) {

        message = "عبقري! واضح إنك كنت مركز في كل تفصيلة!";

        icon = "fa-crown";

    } else if (percentage >= 60) {

        message = "ممتاز! عندك معرفة حلوة بقصة سميرة موسى.";

        icon = "fa-medal";

    } else {

        message = "لسه في حاجات كتير تستحق الاكتشاف. ارجع اقرأ الحكاية تاني!";

        icon = "fa-book-open";

    }

    document.querySelector(".quiz-container").innerHTML = `

        <div class="quiz-result">

            <i class="fa-solid ${icon}"></i>

            <h3>YOUR RESULT</h3>

            <h2>${score} / ${quizQuestions.length}</h2>

            <p>${message}</p>

            <button class="next-question visible" id="restartQuiz">
                إعادة الاختبار
                <i class="fa-solid fa-rotate-right"></i>
            </button>

        </div>

    `;

    document.getElementById("restartQuiz")
        .addEventListener("click", restartQuiz);

}


/* 15. RESTART QUIZ */

function restartQuiz() {

    currentQuestion = 0;

    score = 0;

    const container =
        document.querySelector(".quiz-container");

    container.innerHTML = `

        <div class="quiz-top">

            <span id="questionCounter">QUESTION 01 / 05</span>

            <span id="quizScore">SCORE: 0</span>

        </div>

        <div class="quiz-progress">

            <div id="quizProgress"></div>

        </div>

        <h3 id="questionText"></h3>

        <div class="quiz-options" id="quizOptions"></div>

        <div id="quizFeedback" class="quiz-feedback"></div>

        <button class="next-question" id="nextQuestion" disabled>
            السؤال التالي
            <i class="fa-solid fa-arrow-left"></i>
        </button>

    `;

    /* Reconnect quiz elements */

    reconnectQuizElements();

    loadQuestion();

}


/* 16. RECONNECT QUIZ ELEMENTS */

function reconnectQuizElements() {

    window.questionText =
        document.getElementById("questionText");

    window.quizOptions =
        document.getElementById("quizOptions");

    window.questionCounter =
        document.getElementById("questionCounter");

    window.quizScore =
        document.getElementById("quizScore");

    window.quizProgress =
        document.getElementById("quizProgress");

    window.quizFeedback =
        document.getElementById("quizFeedback");

    window.nextQuestion =
        document.getElementById("nextQuestion");

}


/* 17. INITIALIZE QUIZ */

loadQuestion();


/* =========================================
   END OF SAMIRA WEBSITE SCRIPT
========================================= */
