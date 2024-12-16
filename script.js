function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.currentQuestionIndex = 0;
    this.questions = this.shuffle(questions).slice(0, 5); // Shuffle and limit to 5 questions
}

Quiz.prototype.shuffle = function(array) {
    // Fisher-Yates shuffle algorithm
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

Quiz.prototype.guess = function(answer) {
    if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
        this.score++;
    }
    this.currentQuestionIndex++;

    if (this.hasEnded()) {
        this.submit();
    }
};

Quiz.prototype.getCurrentQuestion = function() {
    return this.questions[this.currentQuestionIndex];
};

Quiz.prototype.hasEnded = function() {
    return this.currentQuestionIndex >= this.questions.length;
};

Quiz.prototype.submit = function() {
    QuizUI.displayScore();
};

function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
};

var QuizUI = {
    displayNext: function() {
        if (quiz.hasEnded()) {
            this.displayScore();
        } else {
            this.displayQuestion();
            this.displayChoices();
            this.displayProgress();
        }
    },
    displayQuestion: function() {
        this.populateWithHTML("question", quiz.getCurrentQuestion().text);
    },
    displayChoices: function() {
        var choices = quiz.getCurrentQuestion().choices;

        for (var i = 0; i < choices.length; i++) {
            this.populateWithHTML("choice" + i, choices[i]);
            this.guessHandler("guess" + i, choices[i]);
        }
    },
    displayScore: function() {
        var percentageScore = (quiz.score / 5) * 100; // Calculate percentage score
        var resultHTML = "<h1>Quiz Results</h1>";
        resultHTML += "<p>Your score: " + percentageScore.toFixed(2) + "%</p>";
        this.populateWithHTML("quiz", resultHTML);
    },

    populateWithHTML: function(id, text) {
        var element = document.getElementById(id);
        element.innerHTML = text;
    },
    guessHandler: function(id, guess) {
        var button = document.getElementById(id);
        button.onclick = function() {
            quiz.guess(guess);
            QuizUI.displayNext();
        };
    },

    displayProgress: function() {
        var getCurrentQuestionNumber = quiz.currentQuestionIndex + 1;
        this.populateWithHTML("progress", "Question " + getCurrentQuestionNumber + " of " + quiz.questions.length);
    }
};

// Create Questions
var questions = [
    new Question("What is the capital city of Japan?", ["Beijing", "Seoul", "Tokyo", "Bangkok"], "Tokyo"),
    new Question("Who wrote 'To Kill a Mockingbird'?", ["Harper Lee", "Stephen King", "J.K. Rowling", "Ernest Hemingway"], "Harper Lee"),
    new Question("What is the chemical symbol for water?", ["Wa", "H2O", "Wt", "H2"], "H2O"),
    new Question("Which planet is known as the Red Planet?", ["Mars", "Venus", "Jupiter", "Saturn"], "Mars"),
    new Question("Who painted the Mona Lisa?", ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"], "Leonardo da Vinci"),
    new Question("What is the currency of the United Kingdom?", ["Euro", "Dollar", "Pound Sterling", "Yen"], "Pound Sterling"),
    new Question("What is the largest organ in the human body?", [], "Skin"),
    new Question("Who is known as the 'Father of Geometry'?", ["Euclid", "Pythagoras", "Archimedes", "Aristotle"], "Euclid"),
    new Question("What is the chemical symbol for iron?", [], "Fe"),
    new Question("Who wrote 'Romeo and Juliet'?", ["Wiliam Shakespeare", "Charles Dickens", "Jane Austen", "Mark Twain"], "William Shakespeare"),
    new Question("Which country is known as the Land of the Rising Sun?", [], "Japan"),
    new Question("What is the largest mammal in the world?", ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"], "Blue Whale"),
    new Question("Who discovered penicillin?", ["Alexander Fleming", "Marie Curie", "Albert Einstein", "Isaac Newton"], "Alexander Fleming"),
    new Question("What is the capital city of Australia?", ["Sydney", "Melbourne", "Canberra", "Brisbane"], "Canberra"),
    new Question("Which gas do plants absorb during photosynthesis?", ["Carbon Dioxide", "Oxygen", "Nitrogen", "Hydrogen"], "Carbon Dioxide"),
    new Question("Who was the first person to step on the moon?", ["Buzz Aldrin", "Neil Armstrong", "Yuri Gagarin", "John Glenn"], "Neil Armstrong"),
    new Question("What is the capital city of Brazil?", ["Sao Paulo", "Rio de Janeiro", "Brasilia", "Salvador"], "Brasilia"),
    new Question("Who is known as the 'Father of Modern Physics'?", ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Stephen Hawking"], "Albert Einstein"),
    new Question("What is the chemical symbol for silver?", [], "Ag"),
    new Question("Who composed 'The Four Seasons'?", ["Ludwig van Beethoven", "Johann Sebastian Bach", "Wolfgang Amadeus Mozart", "Antonio Vivaldi"], "Antonio Vivaldi"),
    new Question("What is the greatest team in the world?", ["Manchester United", "Manchester United", "Manchester United", "Manchester United"], "Manchester United"),
    new Question("Who is well known by the nickname 'the final boss'?", ["Mike Tyson", "Manny Pacquiao", "Floyd Mayweather Jr.", "Anderson Silva"], "Anderson Silva"),
    new Question("What is the capital city of France?", [], "Paris"),
    new Question("What is the square root of 64?", [], "8"),
    new Question("What is the chemical symbol for Gold?", ["Au", "Ag", "Fe", "Pb"], "Au")
  ];

var quiz = new Quiz(questions);

QuizUI.displayNext();
