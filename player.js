document.addEventListener("DOMContentLoaded", function() {
  var playerName = localStorage.getItem("selectedPlayerName");

  var nameElem = document.getElementById("player-name");
  var details = document.getElementById("player-details");
  var backBtn = document.getElementById("back-btn");

  backBtn.addEventListener("click", function () {
    window.location.href = "website.html";
  });

  if (!playerName) {
    nameElem.textContent = "No player picked";
    details.innerHTML = "<p>go back and choose someone</p>";
  } else {
    nameElem.textContent = playerName;

    var data = window.playersData || [];
    var player; 

    for (var i = 0; i < data.length; i++) {
      if (data[i].Name === playerName) {
        player = data[i];
      }
    }

    if (!player) {
      details.innerHTML = "<p>Player data not found</p>";
      return;
    }

    details.innerHTML = `
      <p>Overall: ??? (guess this!)</p>
    `;
    //start game I guess
    startGame(player.Overall);

    function startGame(correct) {
      var tries = 3;
      var min = 0;
      var max = 99;
      var score = 100;
      var hintUsed = false;
      var done = false;

      var input = document.getElementById("guess-input");
      var button = document.getElementById("guess-btn");
      var hint = document.getElementById("hint-btn");
      var msg = document.getElementById("game-msg");
      var timerElem = document.getElementById("timer");

      msg.textContent = "range is 0 to 99 | tries: 3";
      timerElem.textContent = "YOU HAVE ONE MINUTE TO GUESS THE CORRECT RATING";

      var timeLeft = 60;
      var timer = setInterval(function () {
        if (done) {
          clearInterval(timer);
          return;
        }
        timeLeft--;
        timerElem.textContent = "time left: " + timeLeft + "s";
        if (timeLeft <= 0) {
          done = true;
          msg.textContent = "Unfortunately, you ran out of time. answer was " + correct;
          clearInterval(timer);
        }
      }, 1000);

      hint.addEventListener("click", function () {
        if (hintUsed || tries <= 0 || done) return;
        hintUsed = true;
        score -= 15;
        msg.textContent = correct >= 75 ?
          "Hint maybe: overall is 75+" :
          "Hint maybe: overall is less than 75";
      });

      button.addEventListener("click", function () {
        if (done) return;
        var guess = Number(input.value);

        if (input.value === "" || isNaN(guess)) {
          msg.textContent = "put a number";
          return;
        }
        if (guess < min || guess > max) {
          msg.textContent = "nah stay between " + min + " and " + max;
          return;
        }

        tries--;
        score -= 20;

        if (guess === correct) {
          done = true;
          msg.textContent = "you got it. score " + score;
          clearInterval(timer);
          return;
        }

        if (guess < correct) min = guess + 1;
        else max = guess - 1;

        var diff = Math.abs(guess - correct);
        var temp = diff <= 3 ? "very hot" : diff <= 7 ? "warm-ish" : "cold";

        if (tries <= 0) {
          done = true;
          msg.textContent = "no tries left. it was " + correct;
          clearInterval(timer);
        } else {
          msg.textContent = temp + " | range " + min + "-" + max + " | tries " + tries;
        }
      });
    }
  }
});
