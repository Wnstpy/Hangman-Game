/*
---------------------------------------
    Word And Definitions Properties
---------------------------------------
*/
class Word {
    //Definitions of all the words
    constructor(word, definition) {
        this.word = word;
        this.definition = definition;
    }
}

/*
----------------------------
    WordCollection Class
----------------------------
*/
class WordCollection {
    constructor() {
        this.userPoints = 0;
        this.errorNumStatus;

        /*      Generating The Lifelines        */
        this.usedVowels = 0;
        this.usedDesc = 0;
        this.usedSkips = 0;

        /*      Advanced Features       */
        this.timeString;
        this.timeStamps = [];

        this.usedNums;
        this.userInput;
        this.gameOver = false;
        this.arrayOfWords = [
            /*
            -----------------------------------------------
                Advanced Feature 1: Categories Of Words
            -----------------------------------------------
            */
            /*      Category 1      */
            new Word("APACHE", "Software that serves webpages over the internet."),
            new Word("BIOS", "Set of instructions located in a chip on the motherboard."),
            new Word("BITRATE", "The number of bits that are sent per second."),
            new Word("BITSIZE", "The size of the bit that is sent from one computer to another."),
            new Word("CIDR", "A method for allocating IP address and IP routing."),
            new Word("INTERNET", "A worldwide public internetwork."),
            new Word("INTRANET", "A private internetwork."),
            new Word("LINUX", "Most popular operating system for web servers."),
            new Word("MYSQL", "Popular open source database management system."),
            new Word("OVERFLOW", "Occurs when the amount exceeds the computation capacity."),
            new Word("PHP", "Popular web scripting language."),
            new Word("RAM", "Primary short term storage on the computer."),
            new Word("REGISTER", "Temporary storage built in the CPU."),
            new Word("STORAGE", "Space available to keep something."),
            new Word("WORKSTATION", "Personal computers and laptops."),
            /*      Category 2      */
            new Word("ALGORITHM", "An ordered set of unambiguous executable steps defining a terminating process."),
            new Word("BOOLEAN", "A data type that contains either true or false values."),
            new Word("CLASS", "A blueprint to create objects."),
            new Word("COMMENTS", "Written by programmer to make programs more readable and easier to work on."),
            new Word("COMPILER", "A small computer program that translates instructions into efficient machine code, all at once."),
            new Word("CONCATENATION", "The action of linking things together in a series."),
            new Word("FLOWCHART", "A graphical representation of the sequence of operations in an information system or program."),
            new Word("INDENTATION", "Spacing before the lines of code, allowing it to be more readable."),
            new Word("INTERPRETER", "A small computer program that directly executes instructions in the source program, line by line."),
            new Word("JAVASCRIPT", "A programming language commonly used in web development."),
            new Word("LOOP", "Reiterates line(s) of code until a certain condition is met, else it will operate indefinitely if no condition is set."),
            new Word("PARAMETER", "A special kind of variable used in a subroutine to refer to one of the pieces of data provided as input to the subroutine."),
            new Word("PSEUDOCODE", "A mixture of the English Language and a programming language."),
            new Word("STRING", "A data type that is a series of characters inside double or single quotes."),
            new Word("VARIABLE", "Containers that can be empty or hold a date value."),
            /*      Category 3       */
            new Word("ACCOUNT", "A formal record in the general ledger that is used to sort and store transactions."),
            new Word("ASSET", "Anything the company owns that has monetary value."),
            new Word("BOOKKEEPING", "The act of recording transactions properly in a business' accounting file."),
            new Word("DIVERSIFICATION", "A method of reducing risk."),
            new Word("DEPRECIATION", "Accounts for the loss of value in an asset over time."),
            new Word("EQUITY", "The portion of the company that is owned by the investors and owners."),
            new Word("EXPENSE", "Any cost incurred by the business."),
            new Word("FIFO", "An accounting method for valuing goods using the cost of the goods that were first acquired."),
            new Word("INSOLVENCY", "A state where an individual or organisation can no longer meet financial obligations with lender(s) when their debts come due."),
            new Word("INTEREST", "Amount paid on a loan or line of credit that exceeds the repayment of the principal balance."),
            new Word("INVENTORY", "The assets that a company has purchased to sell to its customers that remain unsold."),
            new Word("LIABILITY", "All debts that a company has yet to pay."),
            new Word("LIQUIDITY", "Determines how quickly something can be converted into cash."),
            new Word("REVENUE", "Any money earned by the business."),
            new Word("ROI", "A measurement of the financial return on a particular investment relative to its cost.")
        ]
    }

    /* 
    --------------------------------
        Generates Starting Words
    --------------------------------
    */
    startingWords(startWords, categoryChoice) {
        this.usedNums = [];
        var minVal;
        /*      Sets Minimum Value To Get A Range Of Numbers For A Category     */
        switch (categoryChoice) {
            case (1): //Category 1
                minVal = 0;
                break;
            case (2): //Category 2
                minVal = 15;
                break;
            case (3): //Category 3
                minVal = 30;
                break;
        }

        for (var i = 0; i < 10; i++) {
            //Generates a random number to get a word
            this.usedNums[i] = minVal + Math.floor(Math.random() * 15);

            //Checks For Repeated Value Only From The Second Value Onwards
            for (var x = 0; x < this.usedNums.length - 1; x++) {
                /*      Only Runs IF There Is A Repeated Value      */
                if (this.usedNums[x] == this.usedNums[i]) {
                    this.usedNums[i] = minVal + Math.floor(Math.random() * 15);
                    //Sets It Such That Counter Will Return To The First Value To Check
                    x = -1;
                }
            }
            //Sets The Starting Words & Resets Counter To Check For The Next Number
            startWords[i] = this.arrayOfWords[this.usedNums[i]].word;
            x = 0;
        }

        return startWords;
    }

    /*
    ------------------------------------
        Checks User Input If Correct
    ------------------------------------
    */
    alphabetChecker(wordArray, errorChecker, hiddenArr, permAlphabet, alphabet, solvingEntireWord) {
        var newHiddenString;
        var amountOfCorrectLetters = 0;
        var returnsError = errorChecker[this.errorNumStatus];
        var isWrong = false;
        
        /*      Checks Which Characters Are Correct       */
        for (var counter = 0; counter < wordArray.length; counter++) {
            if (wordArray[counter] == this.userInput) {
                hiddenArr[counter] = this.userInput;
                isWrong = false;
                amountOfCorrectLetters++;
            }
        }

        /*      Prints This To Acknowledge Correct Alphabet     */
        if (amountOfCorrectLetters > 0) {
            this.userPoints += amountOfCorrectLetters * 2;
            console.log("This letter is in the word " + amountOfCorrectLetters + " time(s)!");
            returnsError = this.checkError(isWrong, errorChecker);
        }

        /*      Checks If userInput is NaN AND Not Solving Entire Word      */
        if (isNaN(this.userInput) && !solvingEntireWord) {
            //Prints This To Acknowledge None Of The Letters Match User Input
            if (amountOfCorrectLetters == 0) {
                isWrong = true;
                this.userPoints--;
                console.log("This alphabet is not inside the word!");
                returnsError = this.checkError(isWrong, errorChecker);
            }
        }

        /*      Generates New Hidden String Depending On User Input Given       */
        newHiddenString = this.createHiddenString(hiddenArr, wordArray);

        /*      Removes Used Word By User From Alphabet     */
        for (var x = 0; x < permAlphabet.length; x++) {
            if (permAlphabet[x] == this.userInput) {
                alphabet.splice(x, 1, " ");
            }
        }

        return returnsError + "\n" + newHiddenString;
    }

    /*
    ---------------------------------
        Creates New Hidden String       
    ---------------------------------
    */
    createHiddenString(hiddenArr, wordArray) {
        var hiddenChars = "";
        for (var count = 0; count < wordArray.length; count++) {
            hiddenChars += hiddenArr[count] + " ";
        }
        return hiddenChars;
    }

    /*
    -------------------------------
        Displays Hangman Status
    -------------------------------
    */
    checkError(isWrong, errorChecker) {
        if (isWrong) {
            this.errorNumStatus++;
            if (this.errorNumStatus == 7) {
                this.gameOver = true;
            }
        }
        return errorChecker[this.errorNumStatus];
    }

    /* 
    -----------------------------------
        Lifeline1: Shows All Vowels
    -----------------------------------
    */
    lifeLine1(usedAlphabets, wordArray, hiddenArr, alphabet, startingTime) {
        var lifeline1Error;
        var vowels = ["A", "E", "I", "O", "U"];
        var containsVowel = false;
        var numOfVowelsUsed = 0;

        if (this.usedVowels == 0) {
            this.usedVowels++;
            lifeline1Error = "Using The \"Show All Vowels\" Lifeline Now.\n"

            /*      Pushes The Vowels Into The usedAlphabet Arrays Only If Unused     */
            for (var eachVowel = 0; eachVowel < vowels.length; eachVowel++) {
                for (eachChar = 0; eachChar < usedAlphabets.length; eachChar++) {
                    if (usedAlphabets[eachChar] == vowels[eachVowel]) {
                        containsVowel = true;
                        numOfVowelsUsed++
                    }
                }
                
                //If All Vowels Have Already Been Used
                if (numOfVowelsUsed == vowels.length) {
                    return "All Vowels Have Been Used Already.";
                }

                //Adds To "Advanced Feature 4" For timeStamps
                if (containsVowel == false) {
                    usedAlphabets.push(vowels[eachVowel]);
                    this.timeString = "";
                    this.timeStamps.push(this.timeElapsed(startingTime));
                }
                //Resets containsVowel
                containsVowel = false;
            }

            /*      Checks For Any Correct Vowels     */
            for (var eachVowel = 0; eachVowel < usedAlphabets.length; eachVowel++) {
                //Compares Each Vowel To Each Character Inside The Given Word 
                //When Alphabet Has Not Been Used Yet 
                for (var eachChar = 0; eachChar < wordArray.length; eachChar++) {
                    if (wordArray[eachChar] == usedAlphabets[eachVowel] && hiddenArr[eachChar] == '_') {
                        hiddenArr[eachChar] = wordArray[eachChar];
                        this.userPoints += 2;
                    }
                }

                //Removes All Vowels From The Alphabets
                for (var eachChar = 0; eachChar < alphabet.length; eachChar++) {
                    if (alphabet[eachChar] == usedAlphabets[eachVowel]) {
                        alphabet.splice(eachChar, 1, " ");
                    }
                }

            }
            
        } else {
            /*      Lifeline Has Already Been Used      */
            lifeline1Error = "The LifeLine \"Show All Vowels\" Has Been Used Once And Will Not Be Available For The Rest Of The Game.\n";
        }
        return lifeline1Error;
    }

    /*
    -------------------------------------------
        Lifeline2: Shows Definition Of Word
    -------------------------------------------
    */
    lifeLine2(k) {
        var lifeline2Error;
        /*      Returns Definition      */
        if (this.usedDesc == 0) {
            lifeline2Error = "Using The \"Show Description\" Lifeline Now.\nDefinition: ";
            this.usedDesc++;
            return lifeline2Error + this.arrayOfWords[this.usedNums[k]].definition;
        } else {
            /*      Lifeline Has Already Been Used      */
            lifeline2Error = "The LifeLine \"Show Description\" Has Been Used Once And Will Be Not Available For The Rest Of The Game.\n";
        }
        return lifeline2Error;
    }

    /*
    --------------------------------------------------------------------
        Lifeline3: Skips One Word While Getting Full Points For Word
    --------------------------------------------------------------------
    */
    lifeLine3(wordArray, hiddenArr) {
        var lifeline3Error;
        /*      Skips Word With Points      */
        if (this.usedSkips == 0) {
            lifeline3Error = "Using The \"Skip\" Lifeline Now.\n";
            for (var increment = 0; increment < wordArray.length; increment++) {
                if (hiddenArr[increment] == "_") {
                    hiddenArr[increment] = wordArray[increment];
                    this.userPoints += 2;
                }
            }
            this.usedSkips++;
        } else {
            /*      Lifeline Has Already Been Used      */
            lifeline3Error = "The LifeLine \"Skip\" Has Been Used Once And Will Not Be Available For The Rest Of The Game.\n";
        }
        return lifeline3Error;
    }

    /*
    ---------------------------------------------------------
        Advanced Feature 2: Starting The Duration Of Game
    ---------------------------------------------------------
    */
    timeElapsed(startingTime) {
        var currentDate, currentTime, timeDifference, amountOfHoursElapsed, amountofMinsElapsed, amountOfSecsElapsed;

        this.timeString = this.timeString || ""; //Sets timeString to "" if undefined
        currentDate = new Date();
        currentTime = currentDate.getTime() / 1000; //Gets Time In Seconds
        timeDifference = currentTime - startingTime;

        /*      Calculating Hours, Minutes And Seconds      */
        amountOfHoursElapsed = Math.floor(timeDifference / (60 * 60));
        amountofMinsElapsed = Math.floor((timeDifference - amountOfHoursElapsed * 60 * 60) / 60);
        amountOfSecsElapsed = Math.floor(timeDifference - amountofMinsElapsed * 60 - amountOfHoursElapsed * 60 * 60);
        this.timeString += amountOfHoursElapsed + ":" + amountofMinsElapsed + ":" + amountOfSecsElapsed;
        return this.timeString;
    }

    /*
    ---------------------------------------------
        Advanced Feature 3: Solve Entire Word
    ---------------------------------------------
    */
    solveEntireWord(wordArray, hiddenArr) {
        var userWordArr;
        var entireWordCorrect = true;
        userWordArr = this.userInput.split('');

        /*      Checks If All Values Are The Same     */
        for (var eachLetter = 0; eachLetter < this.userInput.length; eachLetter++) {
            // One Value Is Different OR Length Of Answer Is Not The Same
            if (userWordArr[eachLetter] != wordArray[eachLetter] || userWordArr.length != wordArray.length) {
                entireWordCorrect = false;
                return "Wrong! That Is Not The Correct Word!";
            }
        }

        /*      If Entire Word Correct, Change All Values     */
        if (entireWordCorrect) {
            //Adds Points For Unsolved Letters Only
            for (var eachLetter = 0; eachLetter < this.userInput.length; eachLetter++) {
                if (hiddenArr[eachLetter] == "_") {
                    hiddenArr[eachLetter] = wordArray[eachLetter];
                    this.userPoints += 2;
                }
            }
            this.userPoints += 5;
            return "Correct! You Managed To Solve The Whole Word! Awarding 5 Points!";
        }
    }

    /*
    ---------------------------------------------------------------------------
        Advanced Feature 4: Shows All Previous Responses And Its TimeStamps
    ---------------------------------------------------------------------------
    */
    allResponses(usedAlphabets) {
        var returnsTimeStamps;
        returnsTimeStamps = "Used Values:\tTime Elapsed:\n"
        for (var i = 0; i < usedAlphabets.length; i++) {
            returnsTimeStamps += usedAlphabets[i] + "\t\t" + this.timeStamps[i] + "\n";
        }
        return returnsTimeStamps;
    }
}

module.exports = WordCollection;