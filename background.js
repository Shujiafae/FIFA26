// Store all players from the JSON file
var playersData = [];

fetch('FIFA20.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    playersData = data;
  });

var input = document.getElementById('player-input');
var dropdown = document.getElementById('dropdown');
var playerBox = document.getElementById('player-box');

input.addEventListener('input', function () {
  var value = input.value.toLowerCase();
  dropdown.innerHTML = '';

  if (value === '') {
    return;
  }

  var matchesCount = 0;
  var i;

  // Manually search for up to 5 matching players
  for (i = 0; i < playersData.length; i++) {
    var nameLower = playersData[i].Name.toLowerCase();

    // Basic substring check instead of .includes()
    if (nameLower.indexOf(value) !== -1) {
      var option = document.createElement('div');
      option.className = 'dropdown-item';
      option.textContent = playersData[i].Name;

      // Capture the name for the click handler
      (function(playerName) {
        option.addEventListener('click', function () {
          showPlayer(playerName);
          dropdown.innerHTML = '';
        });
      })(playersData[i].Name);

      dropdown.appendChild(option);

      matchesCount++;
      if (matchesCount === 5) {
        break; // stop after 5 matches
      }
    }
  }
});

function showPlayer(playerName) {
}