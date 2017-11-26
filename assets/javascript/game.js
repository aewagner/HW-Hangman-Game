const hangmanGame = {

        wordBank: {
            "rick": {
                picture: "rick.jpg"
            },
            "morty": {
                picture: "morty.png"
            },
            "beth": {
                picture: "beth.png"
            },
            "bird person": {
                picture: "birdperson.png"
            },
            "jerry": {
                picture: "jerry.png"
            },
            "mr poopybutthole": {
                picture: "mrpoopybutthole.png"
            },
            "pickle rick": {
                picture: "picklerick.jpg"
            },
            "plumbus": {
                picture: "plumbus.jpg"
            },
            "portal gun": {
                picture: "portalgun.png"
            },
            "summer": {
                picture: "summer.jpg"
            }
        },

        wordInPlay: null,
        lettersInPlay: [],
        matchedLetters: [],
        guessedLetters: [],
        guessesLeft: 0,
        totalGuesses: 0,
        letterGuessed: null,
        wins: 0,





        gameSetUp: function() {

            let objKeys = Object.keys(this.wordBank);
            console.log(objKeys);
            console.log(objKeys[0]);

            this.wordInPlay = objKeys[Math.floor(Math.random() * objKeys.length) + 1];
            console.log(objKeys);
            console.log(this.wordInPlay);
          

            for (let i = 0; i < this.wordInPlay.length; i++) {
                this.lettersInPlay.push(this.wordInPlay[i]);
            }

            console.log(this.lettersInPlay);

            this.renderWord();
            this.processUpdateTotalGuesses();


        },
        // This function is run whenever the user guesses a letter..
        updatePage: function(letter) {
            // If the user has no guesses left, restart the game.
            if (this.guessesLeft === 0) {
                this.restartGame();
            }
            // Otherwise...
            else {
                // Check for and handle incorrect guesses.
                this.updateGuessedLetters(letter);

                // Check for and handle correct guesses.
                this.updateMatchedLetters(letter);

                // Rebuild the view of the word. Guessed letters are revealed, unguessed letters have a "_".
                this.renderWord();

                // If the user wins, restart the game.
                if (this.updateWins() === true) {
                    this.restartGame();
                }
            }

        },
        // This function sets the initial guesses the user gets.
        processUpdateTotalGuesses: function() {
            // The user will get more guesses the longer the word is.
            this.totalGuesses = this.lettersInPlay.length + 5;
            this.guessesLeft = this.totalGuesses;

            // Render the guesses left to the page.
            document.querySelector("#guesses-remaining").innerHTML = this.guessesLeft;
        },

        updateGuessedLetters: function(letter) {

            for (var i = 0; i < this.lettersInPlay.length; i++) {
                if ((this.guessedLetters.indexOf(letter) === -1) && (this.lettersInPlay.indexOf(letter)) === -1) {
                this.guessedLetters.push(letter);
                this.guessesLeft--;
                document.querySelector("#guesses-remaining").innerHTML = this.guessesLeft;
                document.querySelector("#guessed-letters").innerHTML =
                    this.guessedLetters.join(", ");
            }
        }

    },

    updateMatchedLetters: function(letter) {

        for (var i = 0; i < this.lettersInPlay.length; i++) {
            if ((letter === this.lettersInPlay[i]) && (this.matchedLetters.indexOf(letter) === -1)) {
                this.matchedLetters.push(letter);
            }

            if (this.lettersInPlay[i] === " ") {
                this.matchedLetters.push(this.lettersInPlay[i]);
            }

            // else {
            // 	guessedLetters.push(letter);
            // }
        }

    },

    renderWord: function() {
        let wordView = "";

        for (var i = 0; i < this.lettersInPlay.length; i++) {
            // If the current letter has been guessed, display that letter.
            if (this.matchedLetters.indexOf(this.lettersInPlay[i]) !== -1) {
                wordView += this.lettersInPlay[i];
            } else {
                wordView += " _ ";
            }

        }
        console.log(wordView);
        // Update the page with the new string we built.
        document.querySelector("#current-word").innerHTML = wordView;
    },
    // Function that "restarts" the game by resetting all of the variables.
    restartGame: function() {
        document.querySelector("#guessed-letters").innerHTML = "";
        this.wordInPlay = null;
        this.lettersInPlay = [];
        this.matchedLetters = [];
        this.guessedLetters = [];
        this.guessesLeft = 0;
        this.totalGuesses = 0;
        this.letterGuessed = null;
        this.gameSetUp();
        this.renderWord();
    },

    // Function that checks to see if the user has won.
    updateWins: function() {
        var win;

        // this won't work for words with double or triple letters
        // var lettersInPlayClone = this.lettersInPlay.slice(); //clones the array
        // this.matchedLetters.sort().join('') == lettersInPlayClone.sort().join('')

        // If you haven't correctly guessed a letter in the word yet, we set win to false.
        if (this.matchedLetters.length === 0) {
            win = false;
        }
        // Otherwise, we set win to true.
        else {
            win = true;
        }

        // If a letter appears in the lettersInPlay array, but not in the matchedLetters array, set win to false.
        // In English, if you haven't yet guessed all the letters in the word, you don't win yet.
        for (var i = 0; i < this.lettersInPlay.length; i++) {
            if (this.matchedLetters.indexOf(this.lettersInPlay[i]) === -1) {
                win = false;
            }
        }

        // If win is true...
        if (win) {

        	

            // Increment wins.
            this.wins = this.wins + 1;
            let wordIndex = this.wordInPlay;
            console.log(wordIndex);

            // Update wins on the page.
            document.querySelector("#wins").innerHTML = this.wins;


            // Update the image of the band on the page.
            // document.querySelector("#band-div").innerHTML =
            //     "<img class='band-image' src='assets/images/" +
            //     this.wordBank[wordIndex].picture + ">";
            // $("#band-div").html("<img class='band-image' src='assets/images/" + this.wordBank[wordIndex].picture + ">");



                 console.log(this.wordBank[wordIndex].picture);


            // return true, which will trigger the restart of our game in the updatePage function.
            return true;
        }
        // If win is false, return false to the updatePage function. The game goes on!
        return false;
    }


};

hangmanGame.gameSetUp();
// When a key is pressed..
document.onkeyup = function(event) {
    // Capture pressed key and make it lowercase.
    hangmanGame.letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    // Pass the guessed letter into our updatePage function to run the game logic.
    hangmanGame.updatePage(hangmanGame.letterGuessed);


};