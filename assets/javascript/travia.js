var startScreen;
    var gameHTML;
    var counter = 30;
    var questionArray = ["Who is the famous designer of modified Ford Mustangs such as the one shown in the background", "On the Pontiac GTO, what does GTO stand for?", "Which of the Following was the First turbocharged car?", "Which car did Ford produce in response to the popular Corvette?", "How were John and Horace Dodge related?", "Chrysler’s legendary 426 Hemi engine is commonly referred to as what?", "In 1970, Plymouth debuted the 340 six-pack AAR ‘Cuda. What does AAR stand for?", "Which car, upon its release, did Enzo Ferrari refer to as the most beautiful car ever made?"];
    var answerArray = [["Carroll Shelby", "Harley Earl", "Franco Scaglione", "Bill Mitchell"], ["Good Times Only","Gran Turismo Omologato","Gas Tires & Oil","Get Tickets Often"], ["Oldsmobile F-85", "Buick GNX ", "Pontiac 301 Turbo", "Chevrolet Corvair"], ["Mustang","Pinto","Thunderbird","Falcon"], ["Cousins", "Father and Son", "Uncle and Nephew", "Brothers"], ["Elephant","Monster","Bear","Bursa"], ["Advanced Aero Research ", "All American Racers", "Asymmetrical Anti Roll", "Arbitrary Angle Reduction"], ["Lamborghini Miura","Alfa Romeo Spider Duetto","Ford Thunderbird Convertible","Jaguar E-type"]];
    var imageArray = ["<img class='center-block img-right' src='assets/images/carroll.jpg' height='300' width='400'>", "<img class='center-block img-right' src='assets/images/pontiac.png' height='300' width='400'>", "<img class='center-block img-right' src='assets/images/301.jpg' height='300' width='400'>", "<img class='center-block img-right' src='assets/images/Thunderbird.png' height='300' width='400'>", "<img class='center-block img-right' src='assets/images/dodge.png' height='300' width='400'>", "<img class='center-block img-right' src='assets/images/hemi.jpg' height='300' width='400'>", "<img class='center-block img-right' src='assets/images/aar.jpg' height='300' width='400'>", "<img class='center-block img-right' src='assets/images/e.png' height='300' width='400'>"];
    var correctAnswers = ["A. Carroll Shelby", "B. Gran Turismo Omologato", "C. Pontiac 301 Turbo", "C. Thunderbird", "D. Brothers", "A. Elephant", "B. All American Racers", "D. Jaguar E-type"];
    var questionCounter = 0;
    var selecterAnswer;
    var theClock;
    var correctTally = 0;
    var incorrectTally = 0;
    var unansweredTally = 0;
    var clickSound = new Audio("assets/sounds/click.mp3");



$(document).ready(function() {
    // Create a function that creates the start button and initial screen
    
    function initialScreen() {
        startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
        $(".mainArea").html(startScreen);
    }
    
    initialScreen();
    
    //Create a function, generateHTML(), that is triggered by the start button, and generates the HTML seen on the project video...
    
    $("body").on("click", ".start-button", function(event){
        event.preventDefault();  // added line to test issue on GitHub Viewer
        clickSound.play();
        generateHTML();
    
        timerWrapper();
    
    }); // Closes start-button click
    
    $("body").on("click", ".answer", function(event){
        //answeredQuestion = true;
        clickSound.play();
        selectedAnswer = $(this).text();
        if(selectedAnswer === correctAnswers[questionCounter]) {
            //alert("correct");
    
            clearInterval(theClock);
            generateWin();
        }
        else {
            //alert("wrong answer!");
            clearInterval(theClock);
            generateLoss();
        }
    }); // Close .answer click
    
    $("body").on("click", ".reset-button", function(event){
        clickSound.play();
        resetGame();
    }); // Closes reset-button click
    
    });  //  Closes jQuery wrapper
    
    function generateLossDueToTimeOut() {
        unansweredTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/wrong.png' height='200' width='200'>";
        $(".mainArea").html(gameHTML);
        setTimeout(wait, 2000);  //  change to 2000 or other amount
    }
    
    function generateWin() {
        correctTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
        $(".mainArea").html(gameHTML);
        setTimeout(wait, 2000);  //  change to 2000 or other amount
    }
    
    function generateLoss() {
        incorrectTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/wrong.png' height='200' width='200'>";
        $(".mainArea").html(gameHTML);
        setTimeout(wait, 2000); //  change to 2000 or other amount
    }
    
    function generateHTML() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
        $(".mainArea").html(gameHTML);
    }
    
    function wait() {
        if (questionCounter < 7) {
        questionCounter++;
        generateHTML();
        counter = 30;
        timerWrapper();
        }
        else {
            finalScreen();
        }
    }
    
    function timerWrapper() {
        theClock = setInterval(thirtySeconds, 1000);
        function thirtySeconds() {
            if (counter === 0) {
                clearInterval(theClock);
                generateLossDueToTimeOut();
            }
            if (counter > 0) {
                counter--;
            }
            $(".timer").html(counter);
        }
    }
    
    function finalScreen() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Game!</a></p>";
        $(".mainArea").html(gameHTML);
    }
    
    function resetGame() {
        questionCounter = 0;
        correctTally = 0;
        incorrectTally = 0;
        unansweredTally = 0;
        counter = 30;
        generateHTML();
        timerWrapper();
    }
    
    