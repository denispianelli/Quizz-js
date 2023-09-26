const questionText = document.getElementById("questionText");
const answers = document.querySelectorAll(".answer");
const nextQuestionBtn = document.getElementById("nextQuestionBtn");
const gains = document.querySelectorAll(".gain");

const questionsAnswers = [
  {
    question: "Quelle mer borde la ville de Sébastopol ?",
    answers: [
      "A: la mer Noire",
      "B: la mer Rouge",
      "C: la mer Blanche",
      "D: la mer Michelle",
    ],
    correct: "A: la mer Noire",
  },
  {
    question: "Combien de continents y a-t-il sur Terre ?",
    answers: ["A: 3", "B: 5", "C: 7", "D: 9"],
    correct: "B: 5",
  },
  {
    question: "Quelle est la capitale de la France ?",
    answers: ["A: Paris", "B: Londres", "C: Berlin", "D: Madrid"],
    correct: "A: Paris",
  },
  {
    question: "Quelle est la formule chimique de l'eau ?",
    answers: ["A: HO", "B: CO2", "C: H2O", "D: O2"],
    correct: "C: H2O",
  },
  {
    question: "Quel est le plus haut sommet du monde ?",
    answers: [
      "A: Mont Everest",
      "B: Mont Kilimandjaro",
      "C: Mont Fuji",
      "D: Mont McKinley",
    ],
    correct: "A: Mont Everest",
  },
  {
    question: "Qui a peint la Joconde ?",
    answers: [
      "A: Vincent van Gogh",
      "B: Pablo Picasso",
      "C: Léonard de Vinci",
      "D: Michel-Ange",
    ],
    correct: "C: Léonard de Vinci",
  },
  {
    question: "Quelle est la capitale de l'Australie ?",
    answers: ["A: Sydney", "B: Melbourne", "C: Canberra", "D: Brisbane"],
    correct: "C: Canberra",
  },
  {
    question: "Quelle est la plus longue rivière du monde ?",
    answers: ["A: Nil", "B: Amazone", "C: Mississippi", "D: Yangtsé"],
    correct: "A: Nil",
  },
  {
    question: "Quel est l'élément le plus abondant dans l'univers ?",
    answers: ["A: Hydrogène", "B: Hélium", "C: Carbone", "D: Oxygène"],
    correct: "A: Hydrogène",
  },
  {
    question:
      "Quel est le nombre d'or, souvent noté par la lettre grecque φ (phi) ?",
    answers: ["A: 1.414", "B: 2.618", "C: 3.142", "D: 1.618"],
    correct: "D: 1.618",
  },
  {
    question: "Quel est le symbole chimique de l'or ?",
    answers: ["A: Go", "B: Ag", "C: Au", "D: Or"],
    correct: "C: Au",
  },
  {
    question: "Qui a découvert la pénicilline, le premier antibiotique ?",
    answers: [
      "A: Alexander Fleming",
      "B: Louis Pasteur",
      "C: Jonas Salk",
      "D: Albert Einstein",
    ],
    correct: "A: Alexander Fleming",
  },
];

let currentQuestion = 0;

showQuestion(currentQuestion);

function showQuestion(index) {
  const question = questionsAnswers[index];
  questionText.textContent = questionsAnswers[index].question;

  answers.forEach(function (answer) {
    answer.classList.remove("answer--correct", "answer--incorrect");
  });

  answers.forEach(function (answer, i) {
    const optionSpan = document.createElement("span");
    optionSpan.className = "option";
    optionSpan.textContent =
      question.answers[i].charAt(0) + question.answers[i].charAt(1);
    answer.textContent = "";
    answer.appendChild(optionSpan);
    answer.appendChild(
      document.createTextNode(question.answers[i].substring(2))
    );
    answer.setAttribute(
      "data-correct",
      question.answers[i] === question.correct
    );
  });
}

nextQuestionBtn.addEventListener("click", function () {
  if (isQuestionAnswered) {
    currentQuestion++;
    isQuestionAnswered = false;
  } else {
    alert("Merci de répondre à la question !");
    return;
  }

  showQuestion(currentQuestion);
});

let isQuestionAnswered = false;
answers.forEach(function (reponse) {
  reponse.addEventListener("click", function () {
    const isCorrect = reponse.getAttribute("data-correct") === "true";

    const currentGain = document.querySelector(".current-gain");
    currentGain.classList.remove("current-gain");

    const currentNumber = parseInt(
      currentGain.querySelector(".gain__number").textContent
    );

    let previousGain = currentGain.previousElementSibling;
    while (previousGain && !previousGain.classList.contains("gain")) {
      previousGain = previousGain.previousElementSibling;
    }

    if (currentNumber === 12) {
      alert("FELICITATIONS !!! LE MILLION !!!!!");
      window.location.reload();
    }
    if (previousGain && isCorrect && !isQuestionAnswered) {
      previousGain.classList.add("current-gain");
    } else {
      currentGain.classList.add("current-gain");
    }

    if (!isQuestionAnswered && isCorrect) {
      reponse.classList.add("answer--correct");
    } else if (!isQuestionAnswered) {
      reponse.classList.add("answer--incorrect");
      setTimeout(function () {
        alert("Aïe, perdu... ");
        window.location.reload();
      }, 300);
    } else {
      return;
    }

    isQuestionAnswered = true;
  });
});
