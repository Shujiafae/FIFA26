var playerName = localStorage.getItem("selectedPlayerName");

var nameElem = document.getElementById("player-name");
var details = document.getElementById("player-details");
var backBtn = document.getElementById("back-btn");

backBtn.addEventListener("click", function () {
  window.location.href = "website.html";
});

if (!playerName) {
  nameElem.textContent = "No player selected";
  details.innerHTML = "<p>Go back and select a player.</p>";
} else {
  nameElem.textContent = playerName;

  fetch("FIFA20.json")
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      var player = null;

      for (var i = 0; i < data.length; i++) {
        if (data[i].Name === playerName) {
          player = data[i];
          break;
        }
      }

      if (!player) {
        details.innerHTML = "<p>Player not found.</p>";
        return;
      }

      details.innerHTML =
        "<p><b>Overall:</b> " + player.Overall + "</p>" +
        "<p><b>Playstyle:</b> " + player.Playstyle + "</p>";

      startGame(player.Overall);
    });
}

function startGame(correct) {
  var tries = 3;

  var input = document.getElementById("guess-input");
  var button = document.getElementById("guess-btn");
  var msg = document.getElementById("game-msg");

  msg.textContent = "Tries left: " + tries;

  button.addEventListener("click", function () {
    if (tries <= 0) {
      msg.textContent = "Game over. Correct was " + correct;
      return;
    }

    var guess = Number(input.value);

    if (input.value === "" || isNaN(guess)) {
      msg.textContent = "Enter a valid number. Tries left: " + tries;
      return;
    }

    if (guess < 0 || guess > 99) {
      msg.textContent = "Guess must be 0–99. Tries left: " + tries;
      return;
    }

    if (guess === correct) {
      msg.textContent = "Correct! You win.";
      tries = 0;
    } else {
      tries--;
      if (tries === 0) {
        msg.textContent = "Wrong. Game over. Correct was " + correct;
      } else if (guess < correct) {
        msg.textContent = "Too low. Tries left: " + tries;
      } else {
        msg.textContent = "Too high. Tries left: " + tries;
      }
    }
  });
}
