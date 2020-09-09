/*
Date: 30/7/2020
*/

/*
    This Program Is A Hangman Game. Amongst Three Categories, Each Contains
    15 Words And Only 10 Words From This Will Be Randomly Selected For The
    Game. There Is A Total Word Pool Of 45 Words.

    Advanced Features:
    1. Categories Of Words (15 Words In Each Category)          >> Located In wordCreation.js
    2. Can Check Time Elapsed From Start Of Game                >> Located In wordCreation.js
    3. Solve Entire Word At One Go                              >> Located In wordCreation.js
    4. Shows All Used Alphabets And The Time Stamps For Each    >> Located In wordCreation.js
    5. Confirm And Restarts Entire Game                         >> Located In hangman.js
*/

/*
---------------------------------------------------------------------
    Prints Out Introductions And Instructions To The Hangman Game
---------------------------------------------------------------------
*/
function startGame() {
    gameStarterString = "";
    gameStarterString += "\n\n\t\t\t-==Hangman Game!!==-\n";
    gameStarterString += "\n\nWelcome To The First Hangman Game Show!";
    gameStarterString += "\n\nInstructions:\n1. 10 words decided by the category will be chosen for the game.";
    gameStarterString += "\n\n2. You have seven chances of getting any alphabet WRONG. After seven mistakes, you lose!";
    gameStarterString += "\n\n3. You have three lifelines, more specifically:\n\t(1) Show All Vowels\n\t(2) Show Definition Of Word\n\t(3) Skip The Word While Gaining The Full Points For The Word";
    gameStarterString += "\n\n4. Rest Of Commands:\n\t(4) Skipping The Word WITHOUT Any Points\n\t(5) Exit The Game\n\t(6) Check Time Elapsed";
    gameStarterString += "\n\t(7) Solve Entire Word\n\t(8) Returns Used Alphabets And Their Time Stamps";
    gameStarterString += "\n\t(9) Show Current Points\n\t(0) Reveal Correct Answer";
    gameStarterString += "\n\n5. How To Score:\n => +2 Points For Every Correct Character\n => +10 Points For Every Completed Word\n => +5 For Solving Entire Word At Once\n => -1 Point For Every Incorrect Guess";
    return gameStarterString;
}

/*
--------------------------------------------------------
    Creates The Seven Different Error Hangman Images
--------------------------------------------------------
*/
function errorCreation() {
    errorChecker = [];
    errorChecker[0] = "   ______\n  |\t |\n  |\n  |\n  |\n _|__\n|    |______\n|___________|";
    errorChecker[1] = [errorChecker[0].slice(0, 20), "\t O", errorChecker[0].slice(20)].join('');
    errorChecker[2] = [errorChecker[1].slice(0, 27), "\t |", errorChecker[1].slice(27)].join('');
    errorChecker[3] = [errorChecker[2].slice(0, 27), "\t/|", errorChecker[2].slice(30)].join('');
    errorChecker[4] = [errorChecker[3].slice(0, 30), "\\", errorChecker[3].slice(30)].join('');
    errorChecker[5] = [errorChecker[4].slice(0, 35), "\t |", errorChecker[4].slice(35)].join('');
    errorChecker[6] = [errorChecker[5].slice(0, 44), "\t/", errorChecker[5].slice(44)].join('');
    errorChecker[7] = [errorChecker[6].slice(0, 46), " \\", errorChecker[6].slice(46)].join('');
}

/*
-----------------------------------------------------------
    Advanced Feature 5: Confirm Whether Restarting Game
-----------------------------------------------------------
*/
function confirmingRestartGame() {
    /*      If Confimed To Leave     */
    if (myStartingPoint.userInput == "Y") {
        console.log("\n\n\nRestarting Game...\n\n");
        return hangManGame();
    } 
    /*      If Confirmed To Continue Game       */
    else if (myStartingPoint.userInput == "N") {
        console.log("Continuing Game...");
        myStartingPoint.userInput = readline.question("\nEnter A Value:\n1 - 3: Lifelines\n4: Skip Word[No Points]\n5: Leave Game\n6: Check Time Elapsed\n7: Solve Entire Word\n8: Check Previous Values With TimeStamps\n9: Current Points\n0: Reveal Correct Answer\n-: Restart Game\nOr An Alphabet \n >> ").toUpperCase();
    }
    /*      Requests For A Valid Input      */
    else {
        while (myStartingPoint.userInput != "Y" && myStartingPoint.userInput != "N") {
            myStartingPoint.userInput = readline.question("Please Enter A Valid Input: [Y/N]\n >> ").toUpperCase();
        }
        return confirmingRestartGame();
    }
}

/*
-------------------------------
    Determine User Input
-------------------------------
*/
function userInputValidation(usedAlphabets, wordArray, hiddenArr, k) {
    var systemErrorComments;
    var isAppropriateValue = false;
    /*      User Input Longer/ Shorter Than One Character       */
    while (myStartingPoint.userInput.length > 1 || myStartingPoint.userInput.length < 1) {
        systemErrorComments = "Please Enter One Character, Not More Not Less.";
        myStartingPoint.userInput = readline.question(systemErrorComments + "\nEnter A Value (0 - 9 Or An Alphabet): \n >> ").toUpperCase();
    }

    /*      User Input Values That Has Been Used        */
    for (var r = 0; r < usedAlphabets.length; r++) {
        if (usedAlphabets[r] == myStartingPoint.userInput) {
            systemErrorComments = "This Value Has Already Been Used And Is Unavailable.";
            myStartingPoint.userInput = readline.question(systemErrorComments + "\nEnter A Value (0 - 9 Or An Alphabet): \n >> ").toUpperCase();
            r = -1;
        }
    }

    /*      Determines What User Input Wants To Do      */
    switch (myStartingPoint.userInput) {
        //List All Vowels In Word
        case '1':
            return myStartingPoint.lifeLine1(usedAlphabets, wordArray, hiddenArr, alphabet, startingTime);
        //Show Definition Of Word
        case '2': 
            return myStartingPoint.lifeLine2(k);
        //Allow User To Score And Move On To The Next Word
        case '3': 
            return myStartingPoint.lifeLine3(wordArray, hiddenArr);
        //Skips word WITHOUT ANY POINTS GIVEN FOR THE WORD
        case '4': 
            for (var increment = 0; increment < wordArray.length; increment++) {
                if (hiddenArr[increment] != "_") {
                    myStartingPoint.userPoints -= 2; //Removes Any Points That Were Given For The Word
                }
                hiddenArr[increment] = wordArray[increment];
            }
            return "Skipping Word. No Points Given For Word!";
        //Leave Game
        case '5':
            myStartingPoint.gameOver = true;
            return "Given Up? You Lose!";
        //Advanced Feature 2: Checks Elapsed Time
        case '6':
            myStartingPoint.timeString = "Time Elapsed:\t";
            return myStartingPoint.timeElapsed(startingTime);
        //Advanced Feature 3: Solve Whole Word
        case '7': 
            solvingEntireWord = true;
            myStartingPoint.userInput = readline.question("Input Entire Word: ").toUpperCase();
            return myStartingPoint.solveEntireWord(wordArray, hiddenArr);
        //Advanced Feature 4: Shows All Alphabets Used And TimeStamps For Each
        case '8':
            return myStartingPoint.allResponses(usedAlphabets);
        //Show Current Points
        case '9': 
            return "Your Current Points Is: " + myStartingPoint.userPoints;
        //Reveal Correct Answer
        case '0':            
            var answerString = "The Answer Is: ";
            for (var counter = 0; counter < wordArray.length; counter++) {
                answerString += wordArray[counter];
            }
            return answerString;
        //Advanced Feature 5: Confirm And Restarts Entire Game
        case '-':
            myStartingPoint.userInput = readline.question("Are You Sure You Want To Restart Game? [Y/N]\n >> ").toUpperCase();
            confirmingRestartGame();
            return userInputValidation(usedAlphabets, wordArray, hiddenArr, k);
        //Other Inputs
        default: 
            //Check If Input Is An Alphabet
            for (var appropriateValue = 0; appropriateValue < permAlphabet.length; appropriateValue++) {
                if (permAlphabet[appropriateValue] == myStartingPoint.userInput) {
                    isAppropriateValue = true;
                } 
            }
            /*       Inappropriate Value:       */
            if (isAppropriateValue == false) {
                myStartingPoint.userInput = readline.question("\nPlease Enter An Appropriate Value:\n1 - 3: Lifelines\n4: Skip Word[No Points]\n5: Leave Game\n6: Check Time Elapsed\n7: Solve Entire Word\n8: Check Previous Values With TimeStamps\n9: Current Points\n0: Reveal Correct Answer, Or An Alphabet \n >> ").toUpperCase();
                return userInputValidation(usedAlphabets, wordArray, hiddenArr, k);
            }
            /*      Once Appropriate Value:     */
            //Adds Value To The Array
            usedAlphabets.push(myStartingPoint.userInput);

            //Adds Appropriate Input To The timeStamps For User Inputs
            myStartingPoint.timeString = "";      //Resets The timeString
            myStartingPoint.timeStamps.push(myStartingPoint.timeElapsed(startingTime));

            return "Valid Input. Processing Value...\n\n";
    }
}

/*
------------------------------------
    Entire HangMan Game Function
------------------------------------
*/
function hangManGame() {
    errorCreation(); //Defining Error Creation

    userName = readline.question(startGame() + "\nEnter Your Name: "); //Introduction + Name
    categoryChoice = readline.questionInt("Choose A Category:\n(1) Computing\n(2) Programming\n(3) Accounting\n > ");
    /*      Validates Category      */
    while (categoryChoice != 1 && categoryChoice != 2 && categoryChoice != 3) {
        categoryChoice = readline.questionInt("Not A Valid Category!\nChoose A Category:\n(1) Computing\n(2) Programming\n(3) Accounting\n > ");
    }

    /*      Generating The Words        */
    startWords = [];
    myStartingPoint = new WordCollection();
    startWords = myStartingPoint.startingWords(startWords, categoryChoice);
    console.log("We Will Start Here:\n\n" + errorChecker[0]);

    /*      Generating Time Elapsed       */
    startingDate = new Date();
    startingTime = startingDate.getTime()/1000;
    console.log("Time Starts Now:\t" + myStartingPoint.timeElapsed(startingTime));

    /*      Starts The Game     */
    for (var k = 0; k < startWords.length; k++) {
        //Generates New Word
        permAlphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
        alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
        wordArray = startWords[k].split('');
        myStartingPoint.errorNumStatus = 0;
        console.log("\n\t\t\t-=Word " + (k + 1) + " / 10=-\n\n");

        //Prints Length Of Word
        hiddenChars = "";
        hiddenArr = [];
        for (var eachAlphabet = 0; eachAlphabet < wordArray.length; eachAlphabet++) {
            hiddenArr[eachAlphabet] = "_";
            hiddenChars += hiddenArr[eachAlphabet] + " ";
        }
        console.log(hiddenChars);

        //Restarts Validation Of User Inputs
        usedAlphabets = [];
        //Restarts TimeStamps Of User Inputs
        myStartingPoint.timeStamps = [];

        /*
        ------------------------
            Main Bulk Of GUI
        ------------------------
        */
        while (hiddenArr.includes('_')) {
            //Prints Remaining Alphabets For Word
            process.stdout.write("\n")
            for (var w = 0; w < alphabet.length; w++) {
                process.stdout.write(alphabet[w] + " ");
                if (w == 12 || w == 25) {
                    process.stdout.write("\n");
                }
            }

            //User Input
            solvingEntireWord = false; //Not Solving Entire Word Yet
            myStartingPoint.userInput = readline.question("\nEnter A Value:\n1 - 3: Lifelines\n4: Skip Word[No Points]\n5: Leave Game\n6: Check Time Elapsed\n7: Solve Entire Word\n8: Check Previous Values With TimeStamps\n9: Current Points\n0: Reveal Correct Answer\n-: Restart Game\nOr An Alphabet \n >> ").toUpperCase();
            console.log(userInputValidation(usedAlphabets, wordArray, hiddenArr, k));

            //Breaks Loop If User Gave Up
            if (myStartingPoint.gameOver == true) {
                break;
            }

            //Determines If User Input Is Correct + Prints Out Text GUI
            console.log(myStartingPoint.alphabetChecker(wordArray, errorChecker, hiddenArr, permAlphabet, alphabet, solvingEntireWord));
        }

        //Checks If Word Is Completed. Validate That Word Was Not Skipped AND Not Game Over
        if (myStartingPoint.userInput != 4 && !myStartingPoint.gameOver) {
            myStartingPoint.userPoints += 10;
            console.log("+10 Points For Completing The Word!");
        }

        //Prints Points + Check If Finished Game
        if (k < (startWords.length - 1)) {
            console.log("\nYour Current Points Is: " + myStartingPoint.userPoints);
        } else if (k + 1 == startWords.length) {
            console.log("\n\nCongratulations " + userName + "! You Have Beaten The Hangman Game!");
            console.log("Your Total Points Is: " + myStartingPoint.userPoints);
        }

        //Leaves Loop If Game Over/ User Gave Up
        if (myStartingPoint.gameOver == true) {
            console.log("\n\n--=You Lose!=--\n\n");
            return;
        }
    }
}

/*
---------------------------
    Declaring Variables
---------------------------
*/
var readline, userName,                                                                             //User Input
    categoryChoice, startWords, myStartingPoint, permAlphabet, alphabet, wordArray, usedAlphabets,  //Word Creation
    hiddenChars, hiddenArr,                                                                         //Underscore Display
    startingDate, startingTime, solvingEntireWord;                                                  //Advanced Features

/*
--------------------
    Main Program
--------------------
*/
const WordCollection = require('./wordCreation');
readline = require('readline-sync');

hangManGame();